import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Happy to see you again! 👋</h1>

        <SignIn
          appearance={{
            baseTheme: dark,
            elements: {
              rootBox: { width: "100%" },
            },
          }}
        />
      </div>
    </div>
  );
}