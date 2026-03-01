"use client";

import { useState, useEffect } from "react";
import { addDays, startOfDay, format, isSameDay } from "date-fns";
import SevenDayCalendarView, {
  type SevenDayAssignment,
  type SevenDayItem,
} from "./sevenDayCalendarView";

export default function SevenDayCalendarWrapper({
  assignments,
}: {
  assignments: SevenDayAssignment[];
}) {
  const [days, setDays] = useState<SevenDayItem[] | null>(null);

  useEffect(() => {
    const now = new Date();
    const start = startOfDay(now);
    const sevenDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    const computed: SevenDayItem[] = sevenDays.map((dayDate) => {
      const label = isSameDay(dayDate, now) ? "Today" : format(dayDate, "EEE d");
      const dayAssignments = assignments.filter((a) =>
        isSameDay(new Date(a.due_date), dayDate)
      );
      return { date: dayDate, label, assignments: dayAssignments };
    });
    setDays(computed);
  }, [assignments]);

  if (days === null) {
    return (
      <div className="flex h-full w-full min-h-[120px] items-center justify-center rounded-xl border bg-card p-4">
        <div className="grid min-w-[560px] grid-cols-7 gap-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center border-l border-dashed border-border first:border-l-0"
            >
              <div className="mb-2 h-4 w-12 animate-pulse rounded bg-muted" />
              <p className="text-xs text-muted-foreground">Loading...</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <SevenDayCalendarView days={days} />;
}
