"use client";

export function LocalDate({ iso }: { iso: string }) {
  return (
    <span suppressHydrationWarning>
      {new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  );
}