"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function CreateCourseButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 dark:bg-neutral-900 bg-neutral-50"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-row items-center justify-center bg-green-100 dark:bg-green-500/20 gap-2 rounded-lg py-2 px-4"> 
          <Loader2 className="text-lg animate-spin text-green-800 dark:text-green-400" aria-hidden />
          <p className="text-lg font-medium text-green-800 dark:text-green-400">
            Analyzing your syllabus...
          </p>
          </div>
          <p className="text-sm text-muted-foreground">
            This may take a minute or two.
          </p>
        </div>
      ) : (
        <Button
        type="submit"
        disabled={pending}
        className="flex-1 text-md bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30"
      >
        Create Course
      </Button>
      )}
    </>
  );
}
