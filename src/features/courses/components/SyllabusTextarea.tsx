"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SYLLABUS_MAX_LENGTH } from "@/features/courses/constants";
import { cn } from "@/lib/utils";

const placeholder =
  "Add as much detail as possible for the best results. Please also mention your location for timezone purposes. Paste your syllabus here...";

export function SyllabusTextarea({ className }: { className?: string }) {
  const [length, setLength] = useState(0);
  const atLimit = length >= SYLLABUS_MAX_LENGTH;

  return (
    <div className="relative">
      <Textarea
        name="syllabus"
        required
        rows={20}
        maxLength={SYLLABUS_MAX_LENGTH}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 pb-14 border border-neutral-200 dark:border-neutral-800 max-w-2xl h-120 resize-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          className
        )}
        onChange={(e) => setLength(e.target.value.length)}
      />
      <div
        className="absolute bottom-2 right-3 text-xs text-muted-foreground tabular-nums"
        aria-live="polite"
      >
        <span className={atLimit ? "text-destructive font-medium" : undefined}>
          {length.toLocaleString()}
        </span>
        {" / "}
        {SYLLABUS_MAX_LENGTH.toLocaleString()}
      </div>
    </div>
  );
}
