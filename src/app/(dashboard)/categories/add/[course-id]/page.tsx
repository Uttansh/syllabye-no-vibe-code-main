import { AddCategoryForm } from "@/features/categories/components/addForm";

export default async function AddCategoryPage(
  props: { params: Promise<{ "course-id": string }> }
) {
  const { "course-id": courseId } = await props.params;

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <AddCategoryForm courseId={courseId} />
      </div>
    </div>
  );
}
