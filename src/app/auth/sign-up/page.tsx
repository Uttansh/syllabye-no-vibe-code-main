import { SignUpForm } from "@/components/sign-up-form";
import { redirectIfAuthenticated } from "@/lib/supabase/redirectIfAuthenticated";

export default async function Page() {
  await redirectIfAuthenticated("/dashboard");
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}