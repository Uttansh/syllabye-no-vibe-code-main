import { createClient } from "@/lib/supabase/server";

//get categories for a course
export async function getCategoriesForCourse(courseId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .eq('course_id', courseId)
      .order('name', { ascending: true });
    
    if (error) throw error;
    return data ?? [];
  }