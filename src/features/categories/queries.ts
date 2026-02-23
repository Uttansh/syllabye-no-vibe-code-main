import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function getCategoriesForCourse(courseId: string) {
    const supabase = await createClerkSupabaseClient();
    
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .eq('course_id', courseId)
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data ?? [];
  }

export async function getCategoryById(categoryId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createClerkSupabaseClient();

    const { data, error } = await supabase
      .from('categories')
      .select('id, course_id, name, weight, drops_allowed, extensions_allowed, courses!inner(user_id)')
      .eq('id', categoryId)
      .eq('courses.user_id', userId)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      courseId: data.course_id,
      name: data.name,
      weight: data.weight,
      dropsAllowed: data.drops_allowed ?? 0,
      extensionsAllowed: data.extensions_allowed ?? 0,
    };
  }
