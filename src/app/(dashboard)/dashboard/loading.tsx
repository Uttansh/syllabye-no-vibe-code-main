import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-row items-center justify-center gap-4 bg-background"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-row items-center justify-center bg-green-500/10 gap-2 border border-green-500 rounded-lg py-2 px-4">
        <Loader2 className="text-lg animate-spin text-green-500" aria-hidden />
        <p className="text-lg font-medium text-green-500">
          Retrieving your dashboard...
        </p>
      </div>
    </div>
  );
}
