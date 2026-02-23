import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function getAssignmentById(assignmentId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const supabase = await createClerkSupabaseClient();

  const { data: assignment, error } = await supabase
  .from("assignments")
  .select(`
      id,
      name,
      due_date,
      points_possible,
      points_earned,
      category_id,
      course_id,
      categories ( id, name ),
      courses!inner( id, user_id )
  `)
  .eq("id", assignmentId)
  .eq("courses.user_id", userId)
  .single();


  if (error) throw error;

  const categoryData = Array.isArray(assignment.categories) 
      ? assignment.categories[0] 
      : assignment.categories;

  return {
    id: assignment.id,
    courseId: assignment.course_id,
    categoryId: assignment.category_id,
    name: assignment.name,
    dueDate: assignment.due_date,
    category: categoryData?.name || null,
    pointsPossible: assignment.points_possible,
    pointsEarned: assignment.points_earned,
  };
}
