import { createClient } from "@/lib/supabase/server";

export async function getCourseStats(courseId: string) {
    const supabase = await createClient();
    const { data: { user }, } = await supabase.auth.getUser();
    if (!user) throw new Error("User not found");
    
    // Get course details
    const { data: course_data, error: course_error } = await supabase
        .from('courses')
        .select('name, number, units, instructors')
        .eq('id', courseId)
        .eq('user_id', user.id)
        .single();
    
    if (course_error) throw course_error;
    
    // Get assignments for this course
    const { data: assignments_data, error: assignments_error } = await supabase
        .from('assignments')
        .select('completed')
        .eq('course_id', courseId);
    
    if (assignments_error) throw assignments_error;
    
    return {
        courseName: course_data.name,
        courseNumber: course_data.number,
        units: course_data.units,
        instructors: course_data.instructors,
        totalAssignments: assignments_data.length,
        completedAssignments: assignments_data.filter((assignment: any) => assignment.completed).length,
    };
}

// Get a single course by ID
export async function getCourseById(courseId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
  
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .eq('user_id', user.id)  // Security: ensure user owns this course
      .single();
  
    if (error) throw error;
    return data;
  }
  
  // Get all assignments for a specific course
  export async function getAssignmentsByCourse(courseId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
  
    const { data, error } = await supabase
      .from('assignments')
      .select('id, name, due_date, completed, courses!inner(user_id)')
      .eq('courses.id', courseId)
      .eq('courses.user_id', user.id)  // Security: ensure user owns the course
      .order('due_date', { ascending: true });
  
    if (error) throw error;
    return data.map((assignment: any) => ({
      id: assignment.id,
      name: assignment.name,
      dueDate: assignment.due_date,
      completed: assignment.completed,
    }));
  }


export async function getCategoriesByCourse(courseId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not found");

    const { data: categories_data, error: categories_error } = await supabase
        .from('categories')
        .select('id, name, weight, is_exam, is_mandatory, drops_allowed, drops_used, extensions_allowed, extensions_used, courses!inner(user_id)')
        .eq('course_id', courseId)
        .eq('courses.user_id', user.id)
        .order('weight', { ascending: false });

    if (categories_error) throw categories_error;

    return categories_data.map((category: any) => ({
        id: category.id,
        name: category.name,
        weight: category.weight,
        isExam: category.is_exam,
        isMandatory: category.is_mandatory,
        dropsAllowed: category.drops_allowed ?? 0,
        dropsUsed: category.drops_used ?? 0,
        extensionsAllowed: category.extensions_allowed ?? 0,
        extensionsUsed: category.extensions_used ?? 0,
    }));
}

//get progress data for a course
export async function getProgressData(courseId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not found");

    const { data, error } = await supabase
        .from('assignments')
        .select('completed')
        .eq('course_id', courseId)
    if (error) throw error;
    const completedCount = data.filter((assignment: any) => assignment.completed).length;
    const remainingCount = data.length - completedCount;
    return [
        { category: 'completed', amount: completedCount, fill: '#22c55e' },
        { category: 'remaining', amount: remainingCount, fill: '#2c2c2c' },
    ]
};
