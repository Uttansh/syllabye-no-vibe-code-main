"use server";

import Groq from "groq-sdk";
import { redirect } from "next/navigation";
import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { toPostgresTimestamptzString } from "@/lib/date-utils";

// ---------------- SCHEMA ----------------
const ParsedSyllabusSchema = z.object({
  course: z.object({
    name: z.string().min(1),
    number: z.string().nullable(),
    units: z.number().nullable(),
    instructors: z.string().nullable(),
    drop_policy_notes: z.string().nullable(),
    extension_policy_notes: z.string().nullable(),
  }),
  categories: z.array(
    z.object({
      name: z.string().min(1),
      weight: z.number().min(0).max(100),
      is_exam: z.boolean(),
      is_mandatory: z.boolean(),
      extensions_allowed: z.number().nullable(),
      extensions_used: z.number().nullable().default(0),
      drops_allowed: z.number().nullable(),
      drops_used: z.number().nullable().default(0),
    })
  ),
  assignments: z.array(
    z.object({
      name: z.string().min(1),
      category_name: z.string().min(1),
      due_date: z.string().nullable(),
      points_possible: z.number().nullable(),
      points_earned: z.number().nullable().default(null),
      completed: z.boolean().default(false),
      used_extension: z.boolean().default(false),
      used_drop: z.boolean().default(false),
    })
  ),
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

// ---------------- ACTION ----------------
export async function analyzeSyllabusAction(formData: FormData) {
  const syllabus = formData.get("syllabus") as string;
  const offset = (formData.get("timezone") as string) || "+00:00";
  if (!syllabus || syllabus.length < 50) {
    throw new Error("Missing or invalid syllabus");
  }

  // ---------------- IMPROVED LLM PROMPT ----------------
  const prompt = `You are a precise course syllabus parser. Extract structured information and return ONLY valid JSON matching this schema:

{
  "course": {
    "name": "string (full course name)",
    "number": "string or null (course number - ONLY numbers and dashes, e.g., '15-213', '10-601')",
    "units": "number or null (credit units as a number)",
    "instructors": "string or null (ONLY first and last names, comma-separated. NO titles like 'Prof', 'Dr', etc. Example: 'John Smith, Jane Doe')",
    "drop_policy_notes": "string or null (general drop policy)",
    "extension_policy_notes": "string or null (general extension policy)"
  },
  "categories": [
    {
      "name": "string (e.g., 'Homework', 'Midterms', 'Final Exam')",
      "weight": "number (percentage 0-100 of final grade)",
      "is_exam": "boolean (true if exam/test/quiz)",
      "is_mandatory": "boolean (true if required to pass course)",
      "extensions_allowed": "number or null (how many extensions for this category, 0 if none)",
      "extensions_used": 0,
      "drops_allowed": "number or null (how many can be dropped, 0 if none)",
      "drops_used": 0
    }
  ],
  "assignments": [
    {
      "name": "string (assignment name)",
      "category_name": "string (MUST exactly match a category name)",
      "due_date": "string or null (YYYY-MM-DD format ONLY. Extract date, ignore any time mentioned - we'll set to 11:59 PM automatically)",
      "points_possible": "number or null (max points)",
      "points_earned": null,
      "completed": false,
      "used_extension": false,
      "used_drop": false
    }
  ]
}

CRITICAL FORMATTING RULES:
1. **Course Number**: Extract ONLY the numeric code with dashes (e.g., "15-213" from "15-213: Introduction to Computer Systems"). NO letters, NO extra text.

2. **Instructors**: Extract ONLY first and last names. Remove ALL titles:
   ✅ CORRECT: "John Smith, Jane Doe"
   ❌ WRONG: "Prof. John Smith, Dr. Jane Doe"
   ❌ WRONG: "Professor Smith"

3. **Due Dates**: Return dates in YYYY-MM-DD format ONLY. Ignore any times mentioned (we default to 11:59 PM in the users timezone):
   ✅ CORRECT: "2024-03-15"
   ❌ WRONG: "2024-03-15T23:59:59Z"
   ❌ WRONG: "March 15, 2024"

4. **Categories**: Extract ALL grading categories. Ensure weights sum to ~100%.

5. **Assignments**: Create individual assignments for each item mentioned. For example:
   - "8 homework assignments" → Create 8 entries: "Homework 1", "Homework 2", etc.
   - "3 exams" → Create 3 entries: "Exam 1", "Exam 2", "Exam 3"
   - If specific names are given, use those

6. **Drop/Extension Policies**: Extract per-category if mentioned (e.g., "drop lowest 2 homework scores" → drops_allowed: 2 for Homework category)

7. **Default Values**:
   - Set extensions_used and drops_used to 0
   - Set completed, used_extension, used_drop to false
   - Use null for unknown/missing values
   - Set extensions_allowed and drops_allowed to 0 if not mentioned
   - Set due_dates to 11:59pm if not mentioned

8. **Return Format**: Return ONLY the raw JSON object. NO markdown code blocks, NO backticks, NO explanations.

SYLLABUS TEXT:
"""
${syllabus}
"""

Return the JSON now:`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: prompt }],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("LLM returned no content");

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    console.error("Invalid JSON from LLM:", content);
    throw new Error("Failed to parse JSON");
  }

  // ---------------- VALIDATE ----------------
  const validated = ParsedSyllabusSchema.parse(parsed);

  // ---------------- POST-PROCESSING ----------------
  if (validated.course.number) {
    validated.course.number = validated.course.number.replace(/[^0-9-]/g, '');
  }

  if (validated.course.instructors) {
    validated.course.instructors = validated.course.instructors
      .replace(/\b(Prof|Professor|Dr|Doctor|Mr|Mrs|Ms)\.?\s*/gi, '')
      .trim();
  }

  validated.assignments.forEach((assignment) => {
    if (assignment.due_date) {
      assignment.due_date = toPostgresTimestamptzString(
        assignment.due_date, "23:59:00", offset
      );
    }
  });

  // ---------------- SAVE TO DATABASE ----------------
  const { userId } = await auth();
  if (!userId) throw new Error("User not authenticated");

  const supabase = await createClerkSupabaseClient();

  // 1. Insert course
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .insert({
      user_id: userId,
      name: validated.course.name,
      number: validated.course.number,
      units: validated.course.units,
      instructors: validated.course.instructors,
      drop_policy_notes: validated.course.drop_policy_notes,
      extension_policy_notes: validated.course.extension_policy_notes,
    })
    .select("id")
    .single();

  if (courseError || !course) {
    console.error("Course insert error:", courseError);
    throw new Error("Failed to create course");
  }

  // 2. Insert categories
  const categoryInserts = validated.categories.map((cat) => ({
    course_id: course.id,
    name: cat.name,
    weight: cat.weight,
    is_exam: cat.is_exam,
    is_mandatory: cat.is_mandatory,
    extensions_allowed: cat.extensions_allowed ?? 0,
    extensions_used: cat.extensions_used ?? 0,
    drops_allowed: cat.drops_allowed ?? 0,
    drops_used: cat.drops_used ?? 0,
  }));

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .insert(categoryInserts)
    .select("id, name");

  if (categoriesError || !categories) {
    console.error("Categories insert error:", categoriesError);
    throw new Error("Failed to create categories");
  }

  // 3. Create a map of category names to IDs
  const categoryMap = new Map(categories.map((c) => [c.name, c.id]));

  // 4. Insert assignments
  const assignmentInserts = validated.assignments.map((assign) => ({
    course_id: course.id,
    category_id: categoryMap.get(assign.category_name),
    user_id: userId,
    name: assign.name,
    due_date: assign.due_date,
    points_possible: assign.points_possible,
    points_earned: assign.points_earned,
    completed: assign.completed,
    used_extension: assign.used_extension,
    used_drop: assign.used_drop,
  }));

  const { error: assignmentsError } = await supabase
    .from("assignments")
    .insert(assignmentInserts);

  if (assignmentsError) {
    console.error("Assignments insert error:", assignmentsError);
    throw new Error("Failed to create assignments");
  }

  revalidatePath("/dashboard");
  redirect(`/courses/${course.id}`);
}
