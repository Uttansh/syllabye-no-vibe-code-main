"use server";
import { revalidatePath } from "next/cache";
import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function markAssignmentComplete(assignmentId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase
    .from("assignments")
    .update({ completed: true, completed_at: new Date().toISOString() })
    .eq("id", assignmentId);
  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function markAssignmentIncomplete(assignmentId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase
    .from("assignments")
    .update({ completed: false })
    .eq("id", assignmentId);
  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function deleteAssignment(assignmentId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase
    .from("assignments")
    .delete()
    .eq("id", assignmentId);
  if (error) throw error;
  revalidatePath("/dashboard");
}

export async function updateAssignment(id: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const supabase = await createClerkSupabaseClient();

  const name = String(formData.get("name") ?? "").trim();
  const due_date = String(formData.get("due_date") ?? "");
  const points_possible_str = String(formData.get("points_possible") ?? "").trim();
  const points_earned_str = String(formData.get("points_earned") ?? "").trim();
  const category_id = String(formData.get("category_id") ?? "").trim();
  const completed = formData.get("completed") === "true";

  if (!name || !due_date) throw new Error("Name and due date are required");
  if (!/^\d{4}-\d{2}-\d{2}\s/.test(due_date)) throw new Error("Invalid due date format");

  const points_possible =
    points_possible_str === "" ? null : Number(points_possible_str);
  const points_earned =
    points_earned_str === "" ? null : Number(points_earned_str);

  if (points_possible !== null && !Number.isFinite(points_possible)) throw new Error("Invalid points_possible");
  if (points_earned !== null && !Number.isFinite(points_earned)) throw new Error("Invalid points_earned");

  const updatePayload: {
    name: string;
    due_date: string;
    points_possible: number | null;
    points_earned: number | null;
    category_id: string;
    completed: boolean;
    completed_at: string | null;
  } = {
    name,
    due_date,
    points_possible,
    points_earned,
    category_id,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
  };

  const { error } = await supabase
    .from("assignments")
    .update(updatePayload)
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/dashboard");
  revalidatePath("/courses/[courseId]");
}

export async function createAssignment(courseId: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const supabase = await createClerkSupabaseClient();

  const name = String(formData.get("name") ?? "").trim();
  const due_date = String(formData.get("due_date") ?? "");
  const points_possible_str = String(formData.get("points_possible") ?? "").trim();
  const category_id = String(formData.get("category_id") ?? "").trim();

  if (!name || !due_date) throw new Error("Name and due date are required");
  if (!category_id) throw new Error("Category is required");
  if (!/^\d{4}-\d{2}-\d{2}\s/.test(due_date)) throw new Error("Invalid due date format");

  const points_possible = points_possible_str === "" ? null : parseFloat(points_possible_str);

  const { error } = await supabase.from("assignments").insert({
      course_id: courseId,
      category_id,
      name,
      due_date,
      points_possible,
      points_earned: null,
      completed: false,
      used_extension: false,
      used_drop: false,
      user_id: userId,
  });

  if (error) throw error;

  revalidatePath("/dashboard");
  revalidatePath(`/courses/${courseId}`);
}
