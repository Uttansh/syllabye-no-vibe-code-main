import { getCourseDashboardData } from "../../../../features/courses/queries";
import { notFound } from "next/navigation";
import TableCourseAssignments from "../../../../features/courses/components/assignmentTable";
import TableCourseCategories from "../../../../features/courses/components/categoryTable";
import PolicyCard from "@/features/courses/components/policyCard";

export default async function CourseDashboardPage(
  props: { params: Promise<{ "course-id": string }> }
) {
  const params = await props.params;
  const courseId = params["course-id"];

  let data;
  try {
    data = await getCourseDashboardData(courseId);
  } catch {
    notFound();
  }

  const { course, assignments, categories } = data;

  return (
    <div className="h-full flex flex-col gap-4 min-h-0 overflow-hidden">
      
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-3 gap-2 w-full h-full flex-1 min-h-0">

  {/* LEFT — Assignments */}
  <div className="xl:row-span-3 min-w-0 min-h-0 flex flex-col">
    <TableCourseAssignments
      assignments={assignments}
      courseId={courseId}
      courseName={course.name}
      courseCode={course.number}
    />
  </div>

  {/* Categories */}
  <div className="min-w-0 min-h-0 flex flex-col xl:row-span-1">
    <TableCourseCategories
      categories={categories}
      courseId={courseId}
    />
  </div>

  {/* Grade Calculator */}
  <div className="min-w-0 min-h-0 flex flex-col hidden xl:row-span-1 xl:flex">
    <div className="w-full flex-1 min-h-0 flex flex-col text-center items-center justify-center pt-4 px-4 border-2 border-border bg-neutral-100 dark:bg-neutral-900 rounded-md overflow-hidden">
      <div className="mb-2 flex-shrink-0">
        <h2 className="text-lg font-semibold">Grade Calculator</h2>
        <p className="text-sm text-muted-foreground">Coming soon</p>
      </div>
    </div>
  </div>

  {/* Policies */}
  <div className="min-w-0 min-h-0 flex flex-col xl:row-span-1">
    <PolicyCard
      dropPolicyNotes={course.drop_policy_notes}
      extensionPolicyNotes={course.extension_policy_notes}
    />
  </div>

</div>
    </div>
  );
}