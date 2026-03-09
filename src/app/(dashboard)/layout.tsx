import { getCourses } from "@/features/dashboard/queries";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courses = await getCourses();

  return (
    <div className="grid grid-cols-[0_1fr] xl:grid-cols-[1fr_5fr] gap-4 h-screen bg-neutral-50 dark:bg-neutral-800">
      <DashboardSidebar courses={courses} />
      <main className="min-w-0 pt-16 xl:pt-4 h-full overflow-hidden p-4 pl-0">
        {children}
      </main>
    </div>
  );
}
