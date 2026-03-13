"use server";

import { auth } from "@clerk/nextjs/server";
import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { rateLimit } from "@/lib/rate-limit";
import type { ParsedCanvasEvent } from "./parse-ics";

const CANVAS_SYNC_ENDPOINT = "canvas-sync";
const SYNC_RATE_WINDOW_MINUTES = 5;
const SYNC_RATE_MAX_REQUESTS = 10;
const SYNC_THROTTLE_MINUTES = 1;

function isValidCanvasIcsUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:") return false;
    const host = u.hostname.toLowerCase();
    return (
      host.endsWith(".instructure.com") ||
      host === "instructure.com" ||
      host.startsWith("canvas.")
    );
  } catch {
    return false;
  }
}

export async function saveCanvasIcsUrl(
  icsUrl: string,
  timezone?: string | null
): Promise<{ error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  const trimmed = icsUrl.trim();
  if (!trimmed) return { error: "URL is required" };
  if (!isValidCanvasIcsUrl(trimmed)) {
    return { error: "Please use a valid Canvas calendar feed URL (https://*.instructure.com)" };
  }

  const supabase = await createClerkSupabaseClient();

  const { error } = await supabase
    .from("user_canvas_sync")
    .upsert(
      {
        user_id: userId,
        canvas_ics_url: trimmed,
        canvas_timezone: timezone?.trim() || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) return { error: error.message };
  revalidatePath("/dashboard");
  return {};
}

export async function syncCanvasNow(options?: { skipThrottle?: boolean }): Promise<{ error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Not authenticated" };

  await rateLimit(CANVAS_SYNC_ENDPOINT, SYNC_RATE_MAX_REQUESTS, SYNC_RATE_WINDOW_MINUTES);

  const supabase = await createClerkSupabaseClient();

  const { data: syncConfig, error: configError } = await supabase
    .from("user_canvas_sync")
    .select("canvas_ics_url, canvas_timezone, last_synced_at")
    .eq("user_id", userId)
    .single();

  if (configError || !syncConfig?.canvas_ics_url) {
    return { error: "No Canvas ICS URL configured" };
  }

  // Throttle: skip if recently synced (for on-load; manual sync passes skipThrottle)
  if (!options?.skipThrottle) {
    const lastSynced = syncConfig.last_synced_at
      ? new Date(syncConfig.last_synced_at).getTime()
      : 0;
    const throttleMs = SYNC_THROTTLE_MINUTES * 60 * 1000;
    if (Date.now() - lastSynced < throttleMs) {
      return {}; // Skip, recently synced
    }
  }

  let events: ParsedCanvasEvent[];
  try {
    const { fetchAndParseIcs } = await import("./parse-ics");
    events = await fetchAndParseIcs(syncConfig.canvas_ics_url);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    const cause = err instanceof Error && err.cause instanceof Error ? err.cause.message : "";
    console.error("Canvas ICS fetch error:", err);
    return {
      error: msg || cause || "Failed to fetch calendar. Check the URL and try again.",
    };
  }

  // Delete existing Canvas events for this user, then insert fresh (full replace)
  await supabase.from("canvas_import_pending").delete().eq("user_id", userId);

  for (const event of events) {
    if (!event.summary?.trim()) continue;

    await supabase.from("canvas_import_pending").insert({
      user_id: userId,
      canvas_uid: event.uid,
      name: event.summary.trim(),
      due_date: event.dueDate?.toISOString() ?? null,
      canvas_course_id: event.canvasCourseId,
      canvas_course_name: event.canvasCourseName,
      canvas_url: event.url,
      raw_event: {
        summary: event.summary,
        url: event.url,
        start_date: event.startDate?.toISOString() ?? null,
        canvas_course_number: event.canvasCourseNumber ?? null,
        has_time: event.hasTime,
      },
    });
  }

  await supabase
    .from("user_canvas_sync")
    .update({
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  revalidatePath("/dashboard");
  return {};
}

export async function getCanvasSyncConfig(): Promise<{
  canvasIcsUrl: string | null;
  canvasTimezone: string | null;
  lastSyncedAt: string | null;
} | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const supabase = await createClerkSupabaseClient();
  const { data } = await supabase
    .from("user_canvas_sync")
    .select("canvas_ics_url, canvas_timezone, last_synced_at")
    .eq("user_id", userId)
    .single();

  if (!data) return { canvasIcsUrl: null, canvasTimezone: null, lastSyncedAt: null };
  return {
    canvasIcsUrl: data.canvas_ics_url,
    canvasTimezone: data.canvas_timezone ?? null,
    lastSyncedAt: data.last_synced_at,
  };
}

/**
 * Check if we should run a background sync (has URL, not synced in last 5 min).
 */
export async function shouldSyncOnLoad(): Promise<boolean> {
  const config = await getCanvasSyncConfig();
  if (!config?.canvasIcsUrl) return false;

  if (!config.lastSyncedAt) return true;
  const last = new Date(config.lastSyncedAt).getTime();
  return Date.now() - last >= SYNC_THROTTLE_MINUTES * 60 * 1000;
}
