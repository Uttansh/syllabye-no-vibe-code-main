import { auth } from "@clerk/nextjs/server";
import { getCourses } from "@/features/dashboard/queries";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import {
  getCanvasSyncConfig,
  shouldSyncOnLoad,
  syncCanvasNow,
} from "@/features/canvas-sync/actions";
import { revalidatePath } from "next/cache";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [courses, { has }, canvasConfig] = await Promise.all([
    getCourses(),
    auth(),
    getCanvasSyncConfig(),
  ]);
  const hasProPlusPlan = has?.({ plan: "pro_plan_plus" }) ?? false;

  if (await shouldSyncOnLoad()) {
    syncCanvasNow()
      .then(() => revalidatePath("/dashboard"))
      .catch((err) => console.error("Canvas sync on load failed:", err));
  }

  return (
    <div className="grid grid-cols-[0_1fr] xl:grid-cols-[280px_1fr] gap-2 h-screen bg-neutral-50 dark:bg-neutral-800">
      <DashboardSidebar
        courses={courses}
        showUpgradeButton={!hasProPlusPlan}
        canvasIcsUrl={canvasConfig?.canvasIcsUrl ?? null}
      />
      <main className="min-w-0 pt-16 xl:pt-2 h-full overflow-hidden p-2 pl-0">
        {children}
      </main>
    </div>
  );
}
