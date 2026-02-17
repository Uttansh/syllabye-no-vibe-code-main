import { getCategoriesByCourse } from "@/features/courses/queries";
import { AddAssignmentForm } from "@/features/assignments/components/addForm";

export default async function AddAssignmentPage(
  props: { params: Promise<{ "course-id": string }> }
) {
  const { "course-id": courseId } = await props.params;
  const categories = await getCategoriesByCourse(courseId);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <AddAssignmentForm courseId={courseId} categories={categories} />
      </div>
    </div>
  );
}