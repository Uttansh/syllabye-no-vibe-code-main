import { getCourses } from "@/features/dashboard/queries";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const courses = await getCourses();

  return (
    <div className="grid grid-cols-[0_1fr] md:grid-cols-[1fr_5fr] md:gap-4 h-screen bg-neutral-50 dark:bg-neutral-800">
      <DashboardSidebar courses={courses} />
      <main className="min-w-0 p-4 pt-16 md:pt-4 md:pl-0 h-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
