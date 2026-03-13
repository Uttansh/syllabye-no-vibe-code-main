"use client";

import { BookOpen, Calculator, ClipboardList, TrendingUp } from "lucide-react";

interface SemesterAnalyticsProps {
  data: {
    totalAssignments: number;
    completedAssignments: number;
    totalCourses: number;
    totalUnits: number;
  };
}

export default function SemesterAnalytics({ data }: SemesterAnalyticsProps) {
  const {
    totalAssignments,
    completedAssignments,
    totalCourses,
    totalUnits,
  } = data;

  const remainingAssignments = totalAssignments - completedAssignments;
  const completionPercent =
    totalAssignments > 0
      ? Math.round((completedAssignments / totalAssignments) * 100)
      : 0;

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset =
    circumference - (completionPercent / 100) * circumference;

  const metrics = [
    {
      label: "Courses",
      value: totalCourses,
      icon: BookOpen,
    },
    {
      label: "Units",
      value: totalUnits,
      icon: Calculator,
    },
    {
      label: "Remaining",
      value: remainingAssignments,
      icon: ClipboardList,
    },
  ];

  return (
    <div className="flex flex-col h-full w-full p-4 md:p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
        Semester Analytics
      </h3>

      <div className="flex flex-1 flex-col sm:flex-row gap-6 items-center justify-center min-h-0">
        {/* Completion ring */}
        <div className="flex-shrink-0 relative">
          <svg
            className="h-32 w-32 -rotate-90"
            viewBox="0 0 100 100"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-green-500 dark:text-green-600 transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {completionPercent}%
            </span>
            <span className="text-xs text-muted-foreground">complete</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg border border-border bg-background/50 px-4 py-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  {label}
                </p>
                <p className="text-lg font-semibold text-foreground tabular-nums">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-4 text-center sm:text-left">
        {completedAssignments} of {totalAssignments} assignments completed
      </p>
    </div>
  );
}
