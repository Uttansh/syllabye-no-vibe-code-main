import Stats from "../../../features/dashboard/components/stats";
import SevenDayCalendarWrapper from "../../../features/dashboard/components/SevenDayCalendarWrapper";
import DashboardProgressChart from "../../../features/dashboard/components/dashboardProgressChart";
import { getDashboardData } from "../../../features/dashboard/queries";
import Link from "next/link";

export default async function DashboardPage() {
  const {
    stats,
    progressData,
    calendarAssignments,
  } = await getDashboardData();

  return (
    <div className="h-full flex flex-col gap-4 min-h-0 overflow-hidden">
      {/* Stats */}
      {/* <div className="w-full">
        <Stats stats={stats} />
      </div> */}

      {/* Main content - Calendar + Progress */}
      <div className="grid grid-rows-2 grid-cols-4 gap-4 w-full lg:h-full flex-1 min-h-0">
        {/* Row 1 — Full Width Calendar */}
        <div className="w-full min-w-0 col-span-4">
          <SevenDayCalendarWrapper assignments={calendarAssignments} />
        </div>

        {/* Row 2 — Progress Chart (full width, courses moved to sidebar) */}
        <div className="min-w-0 min-h-0 col-span-4 md:col-span-2 rounded-md border-2 border-border bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center">
          {/* <DashboardProgressChart data={progressData} /> */}
          <Link target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdYlEqWw5wbMnqG9637jAtqtJPoDH-IkLoTFO-mTUKUVZmJjA/viewform?usp=header" className="text-sm text-muted-foreground text-center hover:underline hover:cursor-pointer">What should go here? Suggestions welcome!</Link>
        </div>
        <div className="min-w-0 min-h-0 h-60 sm:h-auto col-span-4 md:col-span-2 rounded-md border-2 border-border bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center">
          {/* <DashboardProgressChart data={progressData} /> */}
          <Link target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdYlEqWw5wbMnqG9637jAtqtJPoDH-IkLoTFO-mTUKUVZmJjA/viewform?usp=header" className="text-sm text-muted-foreground text-center hover:underline hover:cursor-pointer">What should go here? Suggestions welcome!</Link>
        </div>
      </div>
    </div>
  );
}
