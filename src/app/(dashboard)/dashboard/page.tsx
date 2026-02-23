import Stats from "../../../features/dashboard/components/stats";
import TableUpcomingAssignments from "../../../features/dashboard/components/assignmentTable";
import TableCourses from "../../../features/dashboard/components/coursesTable";
import AssignmentsPerDayChart from "../../../features/dashboard/components/assignmentsPerDayChart";
import DashboardProgressChart from "../../../features/dashboard/components/dashboardProgressChart";
import { getDashboardData } from "../../../features/dashboard/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Bug, MessageCircle, Plus } from "lucide-react";
import { dark } from "@clerk/themes";

export default async function DashboardPage() {
  const {
    stats,
    progressData,
    courses,
    todayAssignments,
    chartLabels,
    chartCounts,
  } = await getDashboardData();

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 lg:h-screen xl:overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-3 flex-row items-center justify-between">
        <h2 className="text-2xl font-semibold">Dashboard</h2>

        <div className="flex flex-col gap-2 flex-row items-center gap-4">
        {/* button to report a problem */}
        <Link href="/feedback" className="w-full sm:w-auto">
            <Button
                className="
                group
                w-full sm:w-auto
                text-base sm:text-lg
                px-2 py-2 rounded-lg
                bg-red-500/10 border text-red-500 border-red-500
                hover:bg-red-500/20
                "
            >
                <span className="mr-2">Report a problem</span>
                <Bug size={25} className="transition-transform duration-400 group-hover:-rotate-90 -ml-2" />
            </Button>
        </Link>
        {/* button for user feedback form */}
        <Link href="/feedback" className="w-full sm:w-auto">
            <Button
                className="
                group
                w-full sm:w-auto
                text-base sm:text-lg
                px-2 py-2 rounded-lg
                bg-green-500/10 border text-green-500 border-green-500
                hover:bg-green-500/20
                "
            >
                <span className="mr-2">Give feedback</span>
                <MessageCircle size={25} className="transition-transform duration-400 group-hover:-rotate-90 -ml-2" />
            </Button>
        </Link>
        {/* button for adding a course */}
        <Link href="/courses/new" className="w-full sm:w-auto">
            <Button
                className="
                group
                w-full sm:w-auto
                text-base sm:text-lg
                px-2 py-2 rounded-lg
                bg-orange-500/10 border text-orange-500 border-orange-500
                hover:bg-orange-500/20
                "
            >
                <span className="mr-2">Add Course</span>
                <Plus size={25} className="transition-transform duration-400 group-hover:rotate-90 -ml-2" />
            </Button>
        </Link>
        
        <Button className="p-1 rounded-full bg-white/10 border text-white border-white hover:bg-white/20">
        {/* dark mode menu for user  */}
          <UserButton appearance={{
            baseTheme: dark
          }}/>
        </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full">
        <Stats stats={stats} />
      </div>
      

      {/* Main content:
          - Mobile: normal flow (page scroll)
          - Desktop: take remaining height and allow inner sections to scroll
      */}
      <div className="flex flex-col gap-4 lg:flex-1 lg:min-h-0">
        {/* Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full xl:flex-1 xl:min-h-0">
          {/* On desktop: these should stretch and their internals handle scrolling.
              On mobile: remove forced h-full so they size naturally.
          */}
          <div className="min-w-0 flex flex-col lg:min-h-0">
            <TableCourses courses={courses} />
          </div>

          <div className="min-w-0 flex flex-col lg:min-h-0">
            <TableUpcomingAssignments assignments={todayAssignments} />
          </div>
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
          <div className="lg:col-span-3 min-w-0">
            <AssignmentsPerDayChart labels={chartLabels} counts={chartCounts} />
          </div>
          <div className="lg:col-span-1 min-w-0">
            <DashboardProgressChart data={progressData} />
          </div>
        </div>
      </div>
    </div>
  );
}