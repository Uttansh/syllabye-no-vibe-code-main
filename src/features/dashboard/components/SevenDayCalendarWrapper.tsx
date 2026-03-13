"use client";

import { useState, useEffect } from "react";
import { addDays, startOfDay, format, isSameDay } from "date-fns";
import SevenDayCalendarView, {
  type SevenDayAssignment,
  type SevenDayItem,
} from "./sevenDayCalendarView";

export default function SevenDayCalendarWrapper({
  syllabusAssignments,
  canvasAssignments,
  hasCanvasUrl,
}: {
  syllabusAssignments: SevenDayAssignment[];
  canvasAssignments: SevenDayAssignment[];
  hasCanvasUrl: boolean;
}) {
  const [showSyllabus, setShowSyllabus] = useState(true);
  const [showCanvas, setShowCanvas] = useState(true);
  const [days, setDays] = useState<SevenDayItem[] | null>(null);

  const assignments = [
    ...(showSyllabus ? syllabusAssignments : []),
    ...(showCanvas ? canvasAssignments : []),
  ];

  useEffect(() => {
    const now = new Date();
    const start = startOfDay(now);
    const sevenDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    const computed: SevenDayItem[] = sevenDays.map((dayDate) => {
      const label = isSameDay(dayDate, now) ? "Today" : format(dayDate, "EEE d");
      const dayAssignments = assignments.filter((a) => {
        if (!a.due_date) return false;
        if (a.hasTime === false) {
          const dueDateStr = a.due_date.slice(0, 10);
          const dayStr = format(dayDate, "yyyy-MM-dd");
          return dueDateStr === dayStr;
        }
        return isSameDay(new Date(a.due_date), dayDate);
      });
      return { date: dayDate, label, assignments: dayAssignments };
    });
    setDays(computed);
  }, [assignments]);

  if (days === null) {
    return (
      <div className="flex h-full w-full min-h-[120px] items-center justify-center rounded-md border bg-card p-4">
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

  const viewButtons = (
    <>
      <button
        type="button"
        onClick={() => setShowSyllabus((s) => !s)}
        className="px-3 py-1.5 text-sm font-medium rounded-md border-2 border-border bg-white dark:bg-neutral-800 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
      >
        {showSyllabus ? "Hide syllabus events" : "Show syllabus events"}
      </button>
      {hasCanvasUrl && (
        <button
          type="button"
          onClick={() => setShowCanvas((s) => !s)}
          className="px-3 py-1.5 text-sm font-medium rounded-md border-2 border-border bg-white dark:bg-neutral-800 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          {showCanvas ? "Hide canvas events" : "Show canvas events"}
        </button>
      )}
    </>
  );

  return (
    <div className="relative flex flex-col h-full">
      {/* Mobile (hamburger view): buttons in line with Syllabye heading, top-right */}
      <div className="fixed top-4 right-4 z-30 flex items-center gap-2 xl:hidden">
        {viewButtons}
      </div>
      <div className="flex-1 min-h-0">
        <SevenDayCalendarView days={days} />
      </div>
      {/* Desktop (sidebar view): buttons at bottom right overlaying calendar */}
      <div className="hidden xl:flex absolute bottom-2 right-2 gap-2">
        {viewButtons}
      </div>
    </div>
  );
}
