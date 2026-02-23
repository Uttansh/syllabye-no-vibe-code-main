"use server";

import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

    
export async function deleteCategory(id: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const supabase = await createClerkSupabaseClient();

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw error;

  revalidatePath('/courses/[courseId]');
}

export async function updateCategory(categoryId: string, formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();

    const name = String(formData.get("name") ?? "").trim();
    const weight_str = String(formData.get("weight") ?? "").trim();
    const extensions_allowed = parseInt(String(formData.get("extensions_allowed") ?? "0")) || 0;
    const drops_allowed = parseInt(String(formData.get("drops_allowed") ?? "0")) || 0;

    if (!name) throw new Error("Category name is required");
    const weight = parseFloat(weight_str);
    if (!Number.isFinite(weight) || weight < 0 || weight > 100) {
        throw new Error("Weight must be 0–100");
    }

    const { error } = await supabase
        .from("categories")
        .update({
            name,
            weight,
            extensions_allowed,
            drops_allowed,
        })
        .eq("id", categoryId);

    if (error) throw error;

    revalidatePath('/courses/[courseId]');
}


export async function createCategory(courseId: string, formData: FormData) {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();

    const name = String(formData.get("name") ?? "").trim();
    const weight_str = String(formData.get("weight") ?? "").trim();
    const is_exam = formData.get("is_exam") === "on";
    const is_mandatory = formData.get("is_mandatory") === "on";
    const extensions_allowed = parseInt(String(formData.get("extensions_allowed") ?? "0")) || 0;
    const drops_allowed = parseInt(String(formData.get("drops_allowed") ?? "0")) || 0;

    if (!name) throw new Error("Category name is required");
    const weight = parseFloat(weight_str);
    if (!Number.isFinite(weight) || weight < 0 || weight > 100) {
        throw new Error("Weight must be 0–100");
    }

    const { error } = await supabase.from("categories").insert({
        course_id: courseId,
        name,
        weight,
        is_exam,
        is_mandatory,
        extensions_allowed,
        drops_allowed,
        extensions_used: 0,
        drops_used: 0,
    });

    if (error) throw error;

    revalidatePath(`/courses/${courseId}`);
    redirect(`/courses/${courseId}`);
}

