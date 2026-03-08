import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-row items-center justify-center gap-4 bg-neutral-50 dark:bg-neutral-800"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-row items-center justify-center bg-green-100 dark:bg-green-500/20 gap-2 rounded-lg py-2 px-4">
        <Loader2 className="text-lg animate-spin text-green-800 dark:text-green-400" aria-hidden />
        <p className="text-lg font-medium text-green-800 dark:text-green-400">
          Retrieving your course...
        </p>
      </div>
    </div>
  );
}
