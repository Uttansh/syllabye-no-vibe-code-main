"use client";

import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

/**
 * Renders a due date using the browser's local timezone.
 * Shows "Today" badge if the date is today in the user's timezone.
 * Otherwise shows the weekday and month/day.
 */

export function DueDateCell({ date }: { date: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <Badge className="bg-red-500/20 border-red-500 text-red-500 rounded-sm">
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


export function DueTimeCell({ date }: { date: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
