"use server";
import { revalidatePath } from "next/cache";
import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function deleteCourse(courseId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const supabase = await createClerkSupabaseClient();
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId);
  if (error) throw error;
  revalidatePath("/dashboard"); 
}


export async function updateCourse(courseId: string, formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const supabase = await createClerkSupabaseClient();

  const updates = {
    name: formData.get("name") as string,
    number: formData.get("number") as string,
    units: parseInt(formData.get("units") as string),
    instructors: formData.get("instructors") as string,
    target_grade: formData.get("target_grade") as string || null,
    drop_policy_notes: formData.get("drop_policy_notes") as string || null,
    extension_policy_notes: formData.get("extension_policy_notes") as string || null,
  };

  const { error } = await supabase
    .from("courses")
    .update(updates)
    .eq("id", courseId)
    .eq("user_id", userId);

  if (error) throw error;

  revalidatePath("/courses");
  revalidatePath(`/courses/${courseId}`);
}

//get permissions for adding course based on user plan 
export async function getCourseAddPermissions() {
  const { userId, has } = await auth();
  if (!userId) throw new Error("User not found");
  const supabase = await createClerkSupabaseClient();
  let limit = 0;
  if(has({plan: "pro_plan"}) ) {
    limit = 5;
  } else if(has({plan: "pro_plus_plan"}) ) {
    limit = 10;
  }
  const { count, error } = await supabase.from("courses").select("*", { count: "exact", head: true }).eq("user_id", userId);
  if (error) throw error;
  return (count ?? 0) < limit;
}