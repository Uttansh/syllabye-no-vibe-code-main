import Stats from "../../../features/dashboard/components/stats";
import TableUpcomingAssignments from "../../../features/dashboard/components/assignmentTable";
import TableCourses from "../../../features/dashboard/components/coursesTable";
import SevenDayCalendarView from "../../../features/dashboard/components/sevenDayCalendarView";
import DashboardProgressChart from "../../../features/dashboard/components/dashboardProgressChart";
import { getDashboardData } from "../../../features/dashboard/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Bug, MessageCircle, Plus } from "lucide-react";
import { dark } from "@clerk/themes";
import Image from "next/image";

export default async function DashboardPage() {
  const {
    stats,
    progressData,
    courses,
    todayAssignments,
    sevenDayAssignments,
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
                px-2 py-2 rounded-md
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
                px-2 py-2 rounded-md
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
                px-2 py-2 rounded-md
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
      

      {/* Main content - 2 row grid */}
<div className="grid grid-rows-2 gap-4 w-full lg:h-full">

{/* Row 1 — Full Width Calendar */}
<div className="w-full min-w-0">
  <SevenDayCalendarView days={sevenDayAssignments} />
</div>

{/* Row 2 — 3/4 Courses + 1/4 Progress */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
  
  {/* Courses */}
  <div className="lg:col-span-3 min-w-0 min-h-0">
    <TableCourses courses={courses} />
  </div>

  {/* Progress Chart */}
  <div className="lg:col-span-1 min-w-0 min-h-0">
    <DashboardProgressChart data={progressData} />
  </div>

</div>
</div>
    </div>
  );
}