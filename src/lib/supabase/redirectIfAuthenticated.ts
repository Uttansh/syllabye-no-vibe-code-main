import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function redirectIfAuthenticated(path = "/dashboard") {
  const supabase = await createClient();
  const { data: { user }, } = await supabase.auth.getUser();

  if (user) {
    redirect(path);
  }
}