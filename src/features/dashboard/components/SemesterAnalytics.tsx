"use client";

interface SemesterAnalyticsProps {
  data: {
    totalAssignments: number;
    completedAssignments: number;
    totalCourses: number;
    totalUnits: number;
  };
}

export default function SemesterAnalytics({ data }: SemesterAnalyticsProps) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b-2">
        <h3 className="text-2xl font-semibold">Semester Analytics</h3>
      </div>
      <div className="flex flex-1 items-center justify-center min-h-0">
        <p className="text-muted-foreground">Coming Soon</p>
      </div>
    </div>
  );
}
