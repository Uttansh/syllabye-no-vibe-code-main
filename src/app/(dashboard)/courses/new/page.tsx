import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeSyllabusAction } from "@/features/courses/createCourseAction";
import { CreateCourseButton } from "@/features/courses/components/CreateCourseButton";
import { SyllabusTextarea } from "@/features/courses/components/SyllabusTextarea";
import { TimezoneInput } from "@/components/timezone-input";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCourseAddPermissions } from "@/features/courses/actions";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function NewCoursePage() {
    const { userId } = await auth();
    if (!userId) redirect("/signin");
    const canAddCourse = await getCourseAddPermissions();
    return (
    canAddCourse ? (
    <div className="min-h-svh flex flex-col justify-center items-center p-6 mx-auto max-w-3xl w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Create a New Course</h1>
      <Card className="w-full">
        <CardContent>
          <form action={analyzeSyllabusAction} className="space-y-4 w-full">
            <TimezoneInput />
            <SyllabusTextarea />
            <div className="flex justify-between gap-4">
            <CreateCourseButton/>
            <Link href="/dashboard" className="flex-1">
              <Button type="button" className="flex-1 bg-red-100 text-md text-red-800 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 w-full">
                Cancel
              </Button>
            </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <p className="text-xs text-muted-foreground mt-2">
        AI results may be inaccurate. Please review the results and make any necessary adjustments.
      </p>
      </div>
    </div>
    ) : (
    <div className="min-h-svh flex flex-col justify-center items-center p-6 mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">You have reached your course limit 😔</h1>
      </div>
      <Link href="/#pricing">
      <Button className="mt-5 text-xl bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30 w-full">Upgrade to add more courses</Button>
      </Link>
    </div>
    )
    );
}