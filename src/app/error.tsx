"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-svh flex flex-col justify-center items-center p-6 mx-auto gap-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="flex flex-row items-center justify-center bg-rose-100 dark:bg-rose-500/20 gap-2 rounded-lg py-2 px-4">
        <AlertCircle className="text-lg text-rose-800 dark:text-rose-400" />
        <p className="text-lg font-medium text-rose-800 dark:text-rose-400 text-center">
          Oh no! Looks like something went wrong!
        </p>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Please try again or return to your <Link href="/dashboard" className="text-foreground underline">dashboard</Link>.
      </p>
    </div>
  );
}