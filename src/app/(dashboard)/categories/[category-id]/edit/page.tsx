import { getCategoryById } from "@/features/categories/queries";
import { EditCategoryForm } from "@/features/categories/components/editForm";

export default async function EditCategoryPage(
  props: { params: Promise<{ "category-id": string }> }
) {
  const { "category-id": categoryId } = await props.params;
  const category = await getCategoryById(categoryId);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <EditCategoryForm category={category} />
      </div>
    </div>
  );
}
