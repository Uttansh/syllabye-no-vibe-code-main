import Stats from "../../../features/dashboard/components/stats";
import TableUpcomingAssignments from "../../../features/dashboard/components/assignmentTable";
import TableCourses from "../../../features/dashboard/components/coursesTable";
import AssignmentsPerDayChart from "../../../features/dashboard/components/assignmentsPerDayChart";
import DashboardProgressChart from "../../../features/dashboard/components/dashboardProgressChart";
import { getAssignmentsPerDayNextTwoWeeks } from "../../../features/dashboard/queries";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/logout-button";
import { redirectIfNotAuthenticated } from "@/lib/supabase/redirectIfNotAuthenticated";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
    await redirectIfNotAuthenticated("/auth/login");
    const { labels, counts } = await getAssignmentsPerDayNextTwoWeeks();
    return (
        <div className="h-screen flex flex-col gap-6 p-6 overflow-hidden">
            {/* Header */}
            <div className="flex-shrink-0 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <div className="flex gap-4">
                    <Link href="/courses/new">
                        <Button className="text-lg p-3 rounded-lg bg-white/10 border text-white border-white hover:bg-white/20">
                            Add Course <Plus size={20} />
                        </Button>
                    </Link>
                    <LogoutButton />
                </div>
            </div>

            {/* Stats row */}
            <div className="flex-shrink-0 w-full">
                <Stats />
            </div>

            {/* Row 1: Assignment bar chart (3 cols) + Progress (1 col) */}
            <div className="grid grid-cols-4 gap-6 w-full flex-shrink-0">
                <div className="col-span-3 min-w-0">
                    <AssignmentsPerDayChart labels={labels} counts={counts} />
                </div>
                <div className="col-span-1 min-w-0">
                    <DashboardProgressChart />
                </div>
            </div>

            {/* Row 2: Courses + Upcoming assignments (1-1 cols) */}
            <div className="grid grid-cols-2 gap-6 w-full flex-1 min-h-0">
                <div className="min-w-0 min-h-0 h-full flex flex-col">
                    <TableCourses />
                </div>
                <div className="min-w-0 min-h-0 h-full flex flex-col">
                    <TableUpcomingAssignments />
                </div>
            </div>
        </div>
    );
}