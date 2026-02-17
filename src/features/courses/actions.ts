"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

//delete course action
export async function deleteCourse(courseId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", courseId);
  if (error) throw error;
  revalidatePath("/dashboard"); 
}


//update course action
export async function updateCourse(courseId: string, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("User not found");

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
    .eq("user_id", user.id);

  if (error) throw error;

  revalidatePath("/courses");
  revalidatePath(`/courses/${courseId}`);
}