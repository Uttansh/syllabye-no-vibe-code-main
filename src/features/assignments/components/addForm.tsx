"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAssignment } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toPostgresTimestamptzString } from "@/lib/date-utils";

interface AddAssignmentFormProps {
  courseId: string;
  categories: Array<{ id: string; name: string }>;
}

function todayDateStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function AddAssignmentForm({ courseId, categories }: AddAssignmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<string>(todayDateStr());
  const [selectedTime, setSelectedTime] = useState<string>("23:59:59");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!selectedDate) {
      setError("Due date is required");
      setIsLoading(false);
      return;
    }

    if (!selectedCategoryId) {
      setError("Category is required");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("due_date", toPostgresTimestamptzString(selectedDate, selectedTime));
    formData.set("category_id", selectedCategoryId);

    try {
      await createAssignment(courseId, formData);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create assignment");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Add Assignment</h1>
    <Card className="border-2 border-border rounded-md shadow-none">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-800 px-4 py-3 rounded bg-red-50 border-2 border-red-200">
              {error}
            </div>
          )}
        <div className="flex gap-4">
          <div className="space-y-2 flex-1">
            <Label htmlFor="name" className="text-muted-foreground">Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              required
              disabled={isLoading}
              placeholder="e.g., Homework 3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-muted-foreground">Category <span className="text-red-500">*</span></Label>
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
              disabled={isLoading}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>

          <FieldGroup className="flex-row gap-4">
            <Field className="flex-1">
              <FieldLabel htmlFor="due-date" className="text-muted-foreground">Due Date <span className="text-red-500">*</span></FieldLabel>
              <Input
                type="date"
                id="due-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                disabled={isLoading}
              />
            </Field>

            <Field className="w-32 flex-1">
              <FieldLabel htmlFor="due-time" className="text-muted-foreground">Due Time <span className="text-red-500">*</span></FieldLabel>
              <Input
                type="time"
                id="due-time"
                step="1"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                disabled={isLoading}
              />
            </Field>
          </FieldGroup>

          <div className="space-y-2 flex-1">
            <Label htmlFor="points_possible" className="text-muted-foreground">Points Possible</Label>
            <Input
              id="points_possible"
              name="points_possible"
              type="number"
              step="0.01"
              placeholder="e.g., 100"
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30"
            >
              {isLoading ? "Creating..." : "Add Assignment"}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1 bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
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