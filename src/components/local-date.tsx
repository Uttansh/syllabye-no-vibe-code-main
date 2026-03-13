"use client";

import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

/**
 * Renders a due date using the browser's local timezone.
 * Shows "Today" badge if the date is today in the user's timezone.
 * Otherwise shows the weekday and month/day.
 */

export function DueDateCell({ date }: { date: string | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!date) return <span className="text-muted-foreground">N/A</span>;

  if (!mounted) {
    return (
      <span className="inline-block w-24 h-4 animate-pulse bg-muted rounded" />
    );
  }

  const d = new Date(date);
  const now = new Date();

  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  if (isToday) {
    return (
      <Badge className="bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400 rounded-sm">
        Today
      </Badge>
    );
  }

  return (
    <>
      {d.toLocaleDateString("en-US", { weekday: "short" })}
      {", "}
      {d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}
    </>
  );
}


export function DueTimeCell({ date }: { date: string | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!date) return <span className="text-muted-foreground">N/A</span>;

  if (!mounted) {
    return <span className="inline-block w-12 h-4 animate-pulse bg-muted rounded" />;
    // Or: return <span aria-hidden>--:--</span>;
  }

  const d = new Date(date);
  return (
    <>
      {d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })}
    </>
  );
}

/**
 * Renders a time or time interval in the user's local timezone.
 * If both start and end are provided and on the same day, shows "2:00 PM - 3:00 PM".
 * Otherwise shows just the end time (or start if no end).
 */
export function DueTimeIntervalCell({
  startDate,
  endDate,
}: {
  startDate: string | null;
  endDate: string | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const date = endDate ?? startDate;
  if (!date) return <span className="text-muted-foreground">N/A</span>;

  if (!mounted) {
    return <span className="inline-block w-24 h-4 animate-pulse bg-muted rounded" />;
  }

  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  if (start && end && start.getTime() !== end.getTime()) {
    const sameDay =
      start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear();
    if (sameDay) {
      return <>{formatTime(start)} – {formatTime(end)}</>;
    }
  }

  return <>{formatTime(end ?? start!)}</>;
}
