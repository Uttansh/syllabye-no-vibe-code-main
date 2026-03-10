import { Card } from "@/components/ui/card";
import Link from "next/link";
import { format, isToday } from "date-fns";
import { DueTimeCell } from "@/components/local-date";
import { Badge, CheckCircle, XCircle } from "lucide-react";
export type SevenDayAssignment = {
  id: string;
  name: string;
  due_date: string | null;
  completed: boolean;
  courseName?: string;
  courseNumber?: string;
};

export type SevenDayItem = {
  date: Date;
  label: string;
  assignments: SevenDayAssignment[];
};

export default function SevenDayCalendarView({
  days,
}: {
  days: SevenDayItem[];
}) {
  return (

    <Card className="flex flex-col h-full w-full pt-4 pb-4 border-2 border-border rounded-md min-h-0 shadow-none">
      {/* <h3 className="text-2xl font-semibold mb-1 shrink-0 px-4">Upcoming Due Dates</h3> */}
      <div className="flex-1 min-h-0 overflow-x-auto">
        <div className="grid grid-cols-7 h-full min-w-7xl gap-0">
          {days.map((day, i) => (
            <div
              key={day.label}
              className={`flex flex-col min-w-[80px] h-full pl-2 pr-2 ${i > 0 ? "border-l border-dashed border-border" : ""}`}
            >
              {i === 0 ? (
                <div className="mx-2 text-md font-medium text-center mb-2 bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-400 rounded-sm px-2 py-1">
                {day.label}
                </div>
              ) : (
                <div className="text-md font-medium text-center shrink-0 py-1 mb-2">
                  {day.label}
                </div>
              )}
              
              <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto mx-2">
                {day.assignments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    No assignments
                  </p>
                ) : (
                  day.assignments.map((assignment) => (
                    <Link
                      key={assignment.id}
                      href={`/assignments/${assignment.id}/edit`}
                      title={
                        assignment.courseName || assignment.courseNumber
                          ? `${assignment.name} (${[assignment.courseNumber, assignment.courseName].filter(Boolean).join(" ")})`
                          : assignment.name
                      }
                      className={`block text-sm px-2 py-1.5 rounded-sm transition-opacity hover:opacity-90 shrink-0 ${
                        assignment.completed
                          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400"
                          : "bg-rose-100 dark:bg-rose-500/20 text-rose-800 dark:text-rose-400"
                      }`}
                    >
                      <div className="flex flex-row justify-between">
                      <span className="block truncate text-md" title={assignment.name}>
                        {assignment.name}
                      </span>
                      { assignment.completed && <CheckCircle className="size-3 text-emerald-600 mt-1" />}
                      </div>
                      <div className="flex flex-row justify-between">
                      {assignment.due_date && (
                        <span className="opacity-80 mt-0.5">
                          <DueTimeCell date={assignment.due_date}/>
                        </span>
                      )}
                      {assignment.courseNumber && 
                        <span className="opacity-80 mt-0.5">
                          {assignment.courseNumber}
                        </span>
                      }
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
