"use client";

import { Badge } from "@/components/ui/badge";

/**
 * Renders a due date using the browser's local timezone.
 * Shows "Today" badge if the date is today in the user's timezone.
 * Otherwise shows the weekday and month/day.
 */
export function DueDateCell({ date }: { date: string }) {
  const d = new Date(date);
  const now = new Date();

  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  if (isToday) {
    return (
      <Badge className="bg-red-500/20 border-red-500 text-red-500 rounded-sm">
        Today
      </Badge>
    );
  }

  return (
    <>
      {d.toLocaleDateString("en-US", { weekday: "short" })}
      {", "}
      {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
    </>
  );
}

/**
 * Renders a time using the browser's local timezone.
 */
export function DueTimeCell({ date }: { date: string }) {
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
