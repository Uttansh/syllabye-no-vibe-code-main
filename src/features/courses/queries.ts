import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function getCourseStats(courseId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();
    
    const { data: course_data, error: course_error } = await supabase
        .from('courses')
        .select('name, number, units, instructors')
        .eq('id', courseId)
        .eq('user_id', userId)
        .single();
    
    if (course_error) throw course_error;
    
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

export async function getCourseById(courseId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createClerkSupabaseClient();
  
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .eq('user_id', userId)
      .single();
  
    if (error) throw error;
    return data;
  }
  
  export async function getAssignmentsByCourse(courseId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createClerkSupabaseClient();
  
    const { data, error } = await supabase
      .from('assignments')
      .select('id, name, due_date, completed, courses!inner(user_id)')
      .eq('courses.id', courseId)
      .eq('courses.user_id', userId)
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
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();

    const { data: categories_data, error: categories_error } = await supabase
        .from('categories')
        .select('id, name, weight, is_exam, is_mandatory, drops_allowed, drops_used, extensions_allowed, extensions_used, courses!inner(user_id)')
        .eq('course_id', courseId)
        .eq('courses.user_id', userId)
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

export async function getProgressData(courseId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();

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
}

export async function getCourseDashboardData(courseId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const supabase = await createClerkSupabaseClient();

    const [courseResult, assignmentsResult, categoriesResult] = await Promise.all([
        supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .eq('user_id', userId)
            .single(),
        supabase
            .from('assignments')
            .select('id, name, due_date, completed')
            .eq('course_id', courseId)
            .order('due_date', { ascending: true }),
        supabase
            .from('categories')
            .select('id, name, weight, is_exam, is_mandatory, drops_allowed, drops_used, extensions_allowed, extensions_used')
            .eq('course_id', courseId)
            .order('weight', { ascending: false }),
    ]);

    if (courseResult.error) throw courseResult.error;
    if (assignmentsResult.error) throw assignmentsResult.error;
    if (categoriesResult.error) throw categoriesResult.error;

    const course = courseResult.data;
    const rawAssignments = assignmentsResult.data;

    const completedCount = rawAssignments.filter((a: any) => a.completed).length;

    const assignments = rawAssignments.map((a: any) => ({
        id: a.id,
        name: a.name,
        dueDate: a.due_date,
        completed: a.completed,
    }));

    const categories = categoriesResult.data.map((c: any) => ({
        id: c.id,
        name: c.name,
        weight: c.weight,
        isExam: c.is_exam,
        isMandatory: c.is_mandatory,
        dropsAllowed: c.drops_allowed ?? 0,
        dropsUsed: c.drops_used ?? 0,
        extensionsAllowed: c.extensions_allowed ?? 0,
        extensionsUsed: c.extensions_used ?? 0,
    }));

    const progressData = [
        { category: 'completed', amount: completedCount, fill: '#22c55e' },
        { category: 'remaining', amount: rawAssignments.length - completedCount, fill: '#2c2c2c' },
    ];

    return {
        course,
        assignments,
        categories,
        stats: {
            courseNumber: course.number,
            units: course.units,
            totalAssignments: rawAssignments.length,
            completedAssignments: completedCount,
        },
        progressData,
    };
}
