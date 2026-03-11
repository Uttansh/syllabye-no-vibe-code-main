import Stats from "../../../features/dashboard/components/stats";
import SevenDayCalendarWrapper from "../../../features/dashboard/components/SevenDayCalendarWrapper";
import DashboardProgressChart from "../../../features/dashboard/components/dashboardProgressChart";
import UpcomingAssignmentsTableWithCheckbox from "../../../features/dashboard/components/UpcomingAssignmentsTableWithCheckbox";
import { getDashboardData, getUpcomingAssignments } from "../../../features/dashboard/queries";
import Link from "next/link";

export default async function DashboardPage() {
  const [
    { stats, progressData, calendarAssignments },
    upcomingAssignments,
  ] = await Promise.all([
    getDashboardData(),
    getUpcomingAssignments(),
  ]);

  return (
    <div className="h-full flex flex-col min-h-0 overflow-hidden">
      {/* Stats */}
      {/* <div className="w-full">
        <Stats stats={stats} />
      </div> */}

      {/* Main content - Calendar + Progress */}
      <div className="grid grid-rows-2 grid-cols-4 gap-2 w-full lg:h-full flex-1 min-h-0">
        {/* Row 1 — Full Width Calendar */}
        <div className="w-full min-w-0 col-span-4">
          <SevenDayCalendarWrapper assignments={calendarAssignments} />
        </div>

        {/* Row 2 — Upcoming Assignments + Completion (stack below xl/1280px) */}
        <div className="min-w-0 min-h-0 col-span-4 xl:col-span-2 rounded-md border-2 border-border bg-neutral-100 dark:bg-neutral-900 flex flex-col">
          <UpcomingAssignmentsTableWithCheckbox assignments={upcomingAssignments} />
        </div>
        <div className="min-w-0 min-h-0 h-70 xl:h-auto border-2 border-border col-span-4 xl:col-span-2 flex flex-col items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-900">
          {/* <DashboardProgressChart data={progressData} /> */}
          <h2 className="text-lg font-semibold">Semester Analytics</h2>
          <p className="text-sm text-muted-foreground">Coming soon</p>
          <h2 className="mt-10 text-lg font-semibold">Syllabus File Imports</h2>
          <p className="text-sm text-muted-foreground">Coming soon</p>
        </div>
      </div>
    </div>
  );
}
