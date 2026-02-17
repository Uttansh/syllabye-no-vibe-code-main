import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeSyllabusAction } from "@/features/courses/createCourseAction";
import { Textarea } from "@/components/ui/textarea";
import { TimezoneInput } from "@/components/timezone-input";
import Link from "next/link";

export default function NewCoursePage() {
    return (
    <div className="min-h-svh flex flex-col justify-center items-center p-6 mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Create a New Course</h1>
      <Card className="w-full min-w-2xl">
        <CardContent>
          <form action={analyzeSyllabusAction} className="space-y-4">
            <TimezoneInput />
            <textarea
                name="syllabus"
                required
                rows={20}
                placeholder="Add as much detail as possible for the best results. Please also mention your location for timezone purposes. Paste your syllabus here..."
                className="w-full rounded-lg bg-gray-100 dark:bg-neutral-900 p-4 border border-neutral-200 dark:border-neutral-800"
            />
            <div className="flex justify-between gap-4">
            <Button type="submit" className="flex-1 bg-green-500/10 border text-green-500 border-green-500 hover:bg-green-500/20">
              Create Course
            </Button>
            <Link href="/dashboard" className="flex-1">
              <Button type="submit" className="bg-red-500/10 border text-red-500 border-red-500 hover:bg-red-500/20 w-full">
                Cancel
              </Button>
            </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
    );
}