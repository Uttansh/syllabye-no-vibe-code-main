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
    <div className="h-full flex flex-col gap-4 min-h-0 overflow-hidden ">
      <div className="grid grid-rows-2 gap-4 w-full lg:h-full flex-1 min-h-0">
        {/* Row 1 — Assignments (left) + Categories (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-w-0 min-h-0">
          <div className="min-w-0 min-h-0 flex flex-col">
            <TableCourseAssignments assignments={assignments} courseId={courseId} />
          </div>
          <div className="min-w-0 min-h-0 flex flex-col">
            <TableCourseCategories categories={categories} courseId={courseId} />
          </div>
        </div>

        {/* Row 2 — Drop and Extension Policy */}
        <div className="min-w-0 min-h-0 flex flex-col grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PolicyCard dropPolicyNotes={course.drop_policy_notes} extensionPolicyNotes={course.extension_policy_notes} />
        </div>
      </div>
    </div>
  );
}