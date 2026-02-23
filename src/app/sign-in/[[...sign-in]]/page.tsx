import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Hellooo! 👋</h1>

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