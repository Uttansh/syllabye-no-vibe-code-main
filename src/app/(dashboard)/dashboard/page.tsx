import Stats from "../../../features/dashboard/components/stats";
import TableUpcomingAssignments from "../../../features/dashboard/components/assignmentTable";
import TableCourses from "../../../features/dashboard/components/coursesTable";
import AssignmentsPerDayChart from "../../../features/dashboard/components/assignmentsPerDayChart";
import DashboardProgressChart from "../../../features/dashboard/components/dashboardProgressChart";
import { getDashboardData } from "../../../features/dashboard/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
    const { stats, progressData, courses, todayAssignments, chartLabels, chartCounts } = await getDashboardData();
    return (
        <div className="h-screen flex flex-col gap-4 p-4 overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <div className="flex gap-4">
                    <Link href="/courses/new">
                        <Button className="text-lg p-3 rounded-lg bg-orange-500/10 border text-orange-500 border-orange-500 hover:bg-orange-500/20">
                            Add Course <Plus size={20} />
                        </Button>
                    </Link>
                    <LogoutButton />
                </div>
            </div>

            {/* Stats row */}
            <div className="flex-shrink-0 w-full">
                <Stats stats={stats} />
            </div>

            {/* Row 1: Assignment bar chart (3 cols) + Progress (1 col) */}
            <div className="grid grid-cols-4 gap-4 w-full flex-shrink-0">
                <div className="col-span-3 min-w-0">
                    <AssignmentsPerDayChart labels={chartLabels} counts={chartCounts} />
                </div>
                <div className="col-span-1 min-w-0">
                    <DashboardProgressChart data={progressData} />
                </div>
            </div>

            {/* Row 2: Courses + Upcoming assignments (1-1 cols) */}
            <div className="grid grid-cols-2 gap-4 w-full flex-1 min-h-0">
                <div className="min-w-0 min-h-0 h-full flex flex-col">
                    <TableCourses courses={courses} />
                </div>
                <div className="min-w-0 min-h-0 h-full flex flex-col">
                    <TableUpcomingAssignments assignments={todayAssignments} />
                </div>
            </div>
        </div>
    );
}
