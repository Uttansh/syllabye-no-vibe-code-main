"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateCourse } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditCourseFormProps {
  course: {
    id: string;
    name: string;
    number: string;
    units: number;
    instructors: string;
    targetGrade: string | null;
    dropPolicyNotes: string | null;
    extensionPolicyNotes: string | null;
  };
}

export function EditCourseForm({ course }: EditCourseFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await updateCourse(course.id, formData);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update course");
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mt-10 mb-10 px-4">
    <h1 className="text-2xl font-semibold mb-2">Edit Course</h1>
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Course Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={course.name}
              required
              disabled={isLoading}
              placeholder="e.g., Introduction to Computer Science"
            />
          </div>

          <div className="flex flex-row gap-2">
            <div className="space-y-2 flex-1">
              <Label htmlFor="number">Course Number *</Label>
              <Input
                id="number"
                name="number"
                defaultValue={course.number}
                required
                disabled={isLoading}
                placeholder="e.g., CS 101"
              />
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="units">Units *</Label>
              <Input
                id="units"
                name="units"
                type="number"
                min="0"
                max="20"
                step="1"
                defaultValue={course.units}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructors">Instructors *</Label>
            <Input
              id="instructors"
              name="instructors"
              defaultValue={course.instructors}
              required
              disabled={isLoading}
              placeholder="e.g., Dr. Smith, Prof. Johnson"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_grade">Target Grade</Label>
            <Input
              id="target_grade"
              name="target_grade"
              defaultValue={course.targetGrade ?? ""}
              disabled={isLoading}
              placeholder="e.g., A, B+, 90%"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drop_policy_notes">Drop Policy Notes</Label>
            <Textarea
              id="drop_policy_notes"
              name="drop_policy_notes"
              defaultValue={course.dropPolicyNotes ?? ""}
              disabled={isLoading}
              placeholder="Any important information about dropping assignments in this course..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="extension_policy_notes">Extension Policy Notes</Label>
            <Textarea
              id="extension_policy_notes"
              name="extension_policy_notes"
              defaultValue={course.extensionPolicyNotes ?? ""}
              disabled={isLoading}
              placeholder="Policy for requesting assignment extensions..."
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1 bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}