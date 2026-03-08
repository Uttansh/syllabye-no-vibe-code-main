import Stats from "../../../features/dashboard/components/stats";
import SevenDayCalendarWrapper from "../../../features/dashboard/components/SevenDayCalendarWrapper";
import DashboardProgressChart from "../../../features/dashboard/components/dashboardProgressChart";
import { getDashboardData } from "../../../features/dashboard/queries";

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
      <div className="grid grid-rows-2 gap-4 w-full lg:h-full flex-1 min-h-0">
        {/* Row 1 — Full Width Calendar */}
        <div className="w-full min-w-0">
          <SevenDayCalendarWrapper assignments={calendarAssignments} />
        </div>

        {/* Row 2 — Progress Chart (full width, courses moved to sidebar) */}
        {/* <div className="min-w-0 min-h-0">
          <DashboardProgressChart data={progressData} />
        </div> */}
      </div>
    </div>
  );
}
