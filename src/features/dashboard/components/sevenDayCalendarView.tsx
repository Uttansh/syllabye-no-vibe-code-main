import { Card } from "@/components/ui/card";
import Link from "next/link";
import { format } from "date-fns";
import { DueTimeCell } from "@/components/local-date";
export type SevenDayAssignment = {
  id: string;
  name: string;
  due_date: string;
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
    <Card className="flex flex-col h-full w-full pt-4 pb-4 border rounded-xl min-h-0">
      {/* <h3 className="text-2xl font-semibold mb-1 shrink-0 px-4">Upcoming Due Dates</h3> */}
      <div className="flex-1 min-h-0 overflow-x-auto">
        <div className="grid grid-cols-7 h-full min-w-[560px] gap-0">
          {days.map((day, i) => (
            <div
              key={day.label}
              className={`flex flex-col min-w-0 h-full pl-2 pr-2 ${i > 0 ? "border-l border-dashed border-border" : ""}`}
            >
              <div className="text-sm font-medium text-center shrink-0 pb-1 mb-2">
                {day.label}
              </div>
              <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto mx-2">
                {day.assignments.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center ">
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
                      className={`block text-xs px-2 py-1.5 rounded border transition-opacity hover:opacity-90 shrink-0 ${
                        assignment.completed
                          ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-400"
                          : "bg-red-500/20 border-red-500 text-red-700 dark:text-red-400"
                      }`}
                    >
                      <span className="block truncate" title={assignment.name}>
                        {assignment.name}
                      </span>
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
