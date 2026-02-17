import { getAssignmentById } from "../../../../../features/assignments/queries";
import { EditAssignmentForm } from "@/features/assignments/components/editForm";
import { getCategoriesForCourse } from "@/features/categories/queries";

export default async function EditAssignmentPage(
    props: { params: Promise<{ "assignment-id": string }> }
  ) {
  const params = await props.params;
  const assignmentId = params["assignment-id"];
  const assignment = await getAssignmentById(assignmentId);
  const categories = await getCategoriesForCourse(assignment.courseId);

  return (

    <div className="min-h-svh w-full flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl mt-10  mb-10 px-4">
            <EditAssignmentForm assignment={assignment} categories={categories}/>
        </div>
    </div>

  );
}
