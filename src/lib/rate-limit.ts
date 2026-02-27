import { createClerkSupabaseClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function rateLimit(
  endpoint: string,
  maxRequests: number,
  windowMinutes: number
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const supabase = await createClerkSupabaseClient();

  const now = new Date();
  const windowStart = new Date(
    Math.floor(now.getTime() / (windowMinutes * 60 * 1000)) *
      (windowMinutes * 60 * 1000)
  );

  // Try to get existing window row
  const { data, error } = await supabase
    .from("rate_limits")
    .select("*")
    .eq("user_id", userId)
    .eq("endpoint", endpoint)
    .eq("window_start", windowStart.toISOString())
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    // First request in window
    const { error: insertError } = await supabase.from("rate_limits").insert({
      user_id: userId,
      endpoint,
      window_start: windowStart.toISOString(),
      request_count: 1,
    });

    if (insertError) throw insertError;
    return;
  }

  if (data.request_count >= maxRequests) {
    throw new Error("Rate limit exceeded. Please try again shortly.");
  }

  // Increment counter
  const { error: updateError } = await supabase
    .from("rate_limits")
    .update({ request_count: data.request_count + 1 })
    .eq("id", data.id);

  if (updateError) throw updateError;
}
