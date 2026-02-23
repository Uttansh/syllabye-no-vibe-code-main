import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { addDays, startOfDay, format, isSameDay } from "date-fns";
import { redirect } from "next/navigation";

export async function getDashboardData() {
    const { userId } = await auth();
    if (!userId) redirect("/");

    const supabase = await createClerkSupabaseClient();

    const now = new Date();
    const start = startOfDay(now);
    const end = addDays(start, 14);
    const next72Hours = addDays(now, 3);
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const [coursesResult, upcomingResult] = await Promise.all([
        supabase
            .from('courses')
            .select('id, name, number, units, assignments(id, name, due_date, completed)')
            .eq('user_id', userId),
        supabase
            .from('assignments')
            .select('id, name, due_date, courses!inner(user_id, name, number)')
            .eq('courses.user_id', userId)
            .eq('completed', false)
            .gte('due_date', start.toISOString())
            .order('due_date', { ascending: true }),
    ]);

    if (coursesResult.error) throw coursesResult.error;
    if (upcomingResult.error) throw upcomingResult.error;

    const coursesData = coursesResult.data;
    const upcomingData = upcomingResult.data;

    const allAssignments = coursesData.flatMap((c: any) => c.assignments ?? []);
    const totalAssignments = allAssignments.length;
    const completedAssignments = allAssignments.filter((a: any) => a.completed).length;

    const stats = {
        totalAssignments,
        completedAssignments,
        totalCourses: coursesData.length,
        totalUnits: coursesData.reduce((acc: number, c: any) => acc + (c.units || 0), 0),
    };

    const progressData = [
        { category: "completed" as const, amount: completedAssignments, fill: "#22c55e" },
        { category: "remaining" as const, amount: totalAssignments - completedAssignments, fill: "#2c2c2c" },
    ];

    const courses = coursesData.map((course: any) => {
        const incomplete = (course.assignments ?? []).filter((a: any) => !a.completed);
        return {
            id: course.id,
            name: course.name,
            number: course.number,
            assignmentsLeft: incomplete.length,
            hasDueSoon: incomplete.some(
                (a: any) => new Date(a.due_date) >= now && new Date(a.due_date) <= next24Hours
            ),
        };
    });

    const todayAssignments = upcomingData
        .filter((a: any) => {
            const dueDate = new Date(a.due_date);
            return dueDate >= now && dueDate < next72Hours;
        })
        .map((a: any) => ({
            id: a.id,
            name: a.name,
            dueDate: a.due_date,
            courseName: a.courses.name,
            courseNumber: a.courses.number,
        }));

    const days = Array.from({ length: 14 }, (_, i) => addDays(start, i));
    const chartLabels = days.map((d) => {
        if (isSameDay(d, now)) return "Today";
        return format(d, "EEE d");
    });
    const chartCounts = days.map(() => 0);
    for (const row of upcomingData) {
        const due = new Date(row.due_date);
        if (due >= end) continue;
        const dayIndex = days.findIndex((d) => isSameDay(d, due));
        if (dayIndex >= 0) chartCounts[dayIndex] += 1;
    }

    return {
        stats,
        progressData,
        courses,
        todayAssignments,
        chartLabels,
        chartCounts,
    };
}

export async function getDashboardStats() {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();
    
    const { data: assignments_data, error: assignments_error } = await supabase
        .from('assignments')
        .select('completed, courses!inner(user_id)')
        .eq('courses.user_id', userId);
    
    const { data: courses_data, error: courses_error } = await supabase
        .from('courses')
        .select('units')
        .eq('user_id', userId);
    
    if (assignments_error || courses_error) throw assignments_error || courses_error;
    
    return {
        totalAssignments: assignments_data.length,
        completedAssignments: assignments_data.filter((assignment: any) => assignment.completed).length,
        totalCourses: courses_data.length,
        totalUnits: courses_data.reduce((acc: number, course: any) => acc + (course.units || 0), 0),
    };
}

export async function getCourses() {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();
    
    const { data: courses_data, error: courses_error } = await supabase
        .from('courses')
        .select('*, assignments(completed, due_date)')
        .eq('user_id', userId);
    
    if (courses_error) throw courses_error;
    
    const now = new Date();
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    return courses_data.map((course: any) => {
        const incomplete = (course.assignments ?? []).filter((a: any) => !a.completed);
        return {
            id: course.id,
            name: course.name,
            number: course.number,
            assignmentsLeft: incomplete.length,
            hasDueSoon: incomplete.some(
                (a: any) => new Date(a.due_date) >= now && new Date(a.due_date) <= next24Hours
            ),
        };
    });
}

export async function getUpcomingAssignments() {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();
    
    const nowUTC = new Date();
    
    const { data: assignments_data, error: assignments_error } = await supabase
        .from('assignments')
        .select('id, name, due_date, courses!inner(user_id, name, number)')
        .eq('courses.user_id', userId)
        .eq('completed', false)
        .gte('due_date', nowUTC.toISOString())
        .order('due_date', { ascending: true })
        .limit(10);
    
    if (assignments_error) throw assignments_error;
    
    return assignments_data.map((assignment: any) => ({
        id: assignment.id,
        name: assignment.name,
        dueDate: assignment.due_date,
        courseName: assignment.courses.name,
        courseNumber: assignment.courses.number,
    }));
}

export async function getTodayAssignments() {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();
    
    const nowUTC = new Date();
    const next72HoursUTC = addDays(nowUTC, 4);
    
    const { data: assignments_data, error: assignments_error } = await supabase
        .from('assignments')
        .select('id, name, due_date, courses!inner(user_id, name, number)')
        .eq('courses.user_id', userId)
        .eq('completed', false)
        .gte('due_date', nowUTC.toISOString())
        .lt('due_date', next72HoursUTC.toISOString())
        .order('due_date', { ascending: true });
    
    if (assignments_error) throw assignments_error;
    
    return assignments_data.map((assignment: any) => ({
        id: assignment.id,
        name: assignment.name,
        dueDate: assignment.due_date,
        courseName: assignment.courses.name,
        courseNumber: assignment.courses.number,
    }));
}

export async function getAssignmentsPerDayNextTwoWeeks(): Promise<{
    labels: string[];
    counts: number[];
}> {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();

    const now = new Date();
    const start = startOfDay(now);
    const end = addDays(start, 14);

    const { data: assignments_data, error } = await supabase
        .from("assignments")
        .select("due_date, courses!inner(user_id)")
        .eq("courses.user_id", userId)
        .eq("completed", false)
        .gte("due_date", start.toISOString())
        .lt("due_date", end.toISOString());

    if (error) throw error;

    const days = Array.from({ length: 14 }, (_, i) => addDays(start, i));
    const labels = days.map((d) => {
        if (isSameDay(d, now)) return "Today";
        return format(d, "EEE d");
    });
    const counts = days.map(() => 0);

    for (const row of assignments_data ?? []) {
        const due = new Date(row.due_date);
        const dayIndex = days.findIndex((d) => isSameDay(d, due));
        if (dayIndex >= 0) counts[dayIndex] += 1;
    }

    return { labels, counts };
}

export async function getTotalProgressData(): Promise<
    { category: string; amount: number; fill?: string }[]
> {
    const { userId } = await auth();
    if (!userId) throw new Error("User not found");

    const supabase = await createClerkSupabaseClient();

    const { data, error } = await supabase
        .from("assignments")
        .select("completed, courses!inner(user_id)")
        .eq("courses.user_id", userId);

    if (error) throw error;

    const completedCount = (data ?? []).filter((a: { completed: boolean }) => a.completed).length;
    const remainingCount = (data ?? []).length - completedCount;

    return [
        { category: "completed", amount: completedCount, fill: "#22c55e" },
        { category: "remaining", amount: remainingCount, fill: "#2c2c2c" },
    ];
}
