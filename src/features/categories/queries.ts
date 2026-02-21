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

//get a single category by ID
export async function getCategoryById(categoryId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data, error } = await supabase
      .from('categories')
      .select('id, course_id, name, weight, drops_allowed, extensions_allowed, courses!inner(user_id)')
      .eq('id', categoryId)
      .eq('courses.user_id', user.id)
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