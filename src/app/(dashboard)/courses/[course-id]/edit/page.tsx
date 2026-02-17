import { getCourseById } from "../../../../../features/courses/queries";
import { EditCourseForm } from "@/features/courses/components/editForm";

export default async function EditCoursePage(
  props: { params: Promise<{ "course-id": string }> }
) {
  const params = await props.params;
  const courseId = params["course-id"];
  const course = await getCourseById(courseId);

  return (
    <div className="min-h-svh w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl mt-10 mb-10 px-4">
        <EditCourseForm course={course} />
      </div>
    </div>
  );
}