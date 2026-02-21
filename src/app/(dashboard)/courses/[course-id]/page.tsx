import { getCourseDashboardData } from "../../../../features/courses/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseStats from "../../../../features/courses/components/stats";
import TableCourseAssignments from "../../../../features/courses/components/assignmentTable";
import { Button } from "@/components/ui/button";    
import { LogoutButton } from "@/components/logout-button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Plus } from "lucide-react";
import TableCourseCategories from "../../../../features/courses/components/categoryTable";
import PieDonut from "@/features/courses/components/progressChart";
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

  const { course, assignments, categories, stats, progressData } = data;

  return (
    <div className="min-h-screen lg:h-screen p-4 flex flex-col gap-4 lg:overflow-hidden overflow-auto">
        <div className="flex-shrink-0 flex justify-between items-center gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-2xl font-semibold" href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <p className="text-2xl font-semibold">/</p>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-2xl font-semibold truncate max-w-2xl">{course.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb> 
            <div className="flex gap-4">
            <Link href={`/categories/add/${courseId}`}>
            <Button className="text-lg px-3 rounded-lg text-white bg-white/10 hover:bg-white/20 border border-white">Add Category <Plus size={20} /></Button>
            </Link>
            <Link href={`/assignments/add/${courseId}`}>
            <Button className="text-lg px-3 rounded-lg text-white bg-white/10 hover:bg-white/20 border border-white">Add Assignment <Plus size={20} /></Button>
            </Link>
            <LogoutButton />
            </div>
        </div>
        <div className="flex-shrink-0">
            <CourseStats stats={stats} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4 flex-1 min-h-0">
            <div className="min-w-0 min-h-0 flex flex-col lg:col-span-1">
                <PolicyCard dropPolicyNotes={course.drop_policy_notes} extensionPolicyNotes={course.extension_policy_notes} />
            </div>
            <div className="min-w-0 min-h-0 flex flex-col lg:col-span-1">
                <PieDonut progressData={progressData} />
            </div>
            <div className="min-w-0 min-h-0 flex flex-col lg:col-span-2 lg:row-span-2">
                <TableCourseAssignments assignments={assignments} />
            </div>
            <div className="min-w-0 min-h-0 flex flex-col lg:col-span-2">
                <TableCourseCategories categories={categories} />
            </div>
        </div>
    </div>
);
}