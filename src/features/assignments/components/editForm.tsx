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
import { Checkbox } from "@/components/ui/checkbox";
import { updateAssignment } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toPostgresTimestamptzString } from "@/lib/date-utils";

interface EditAssignmentFormProps {
  assignment: {
    id: string;
    name: string;
    dueDate: string;
    categoryId?: string;
    pointsPossible: number | null;
    pointsEarned: number | null;
    completed: boolean;
  };
  categories: Array<{ id: string; name: string }>;
}

function parseInitialDate(iso: string) {
  const d = new Date(iso);
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const timeStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
  return { dateStr, timeStr };
}

export function EditAssignmentForm({ assignment, categories }: EditAssignmentFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    assignment.categoryId || ""
  );

  // Parse the existing dueDate into date and time strings
  const initial = parseInitialDate(assignment.dueDate);
  
  const [selectedDate, setSelectedDate] = useState<string>(initial.dateStr);
  const [selectedTime, setSelectedTime] = useState<string>(initial.timeStr);
  const [completed, setCompleted] = useState<boolean>(assignment.completed);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!selectedDate) {
      setError("Due date is required");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("due_date", toPostgresTimestamptzString(selectedDate, selectedTime));
    formData.set("category_id", selectedCategoryId);
    formData.set("completed", completed ? "true" : "false");

    try {
      await updateAssignment(assignment.id, formData);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update assignment");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
    <h1 className="text-2xl font-bold">Edit Assignment</h1>
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-2 flex-1">
            <Label htmlFor="name" className="text-muted-foreground">Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              name="name"
              defaultValue={assignment.name}
              required
              disabled={isLoading}
            />
          </div>
          

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
            <Label htmlFor="category" className="text-muted-foreground ">Category <span className="text-red-500">*</span></Label>
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
                    <span className="flex items-center gap-2">
                      {category.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="due-date" className="text-muted-foreground">Due Date <span className="text-red-500">*</span></Label>
              <Input
                type="date"
                id="due-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                disabled={isLoading}
                className="text-green"
              />
            </div>

            <div className="flex-1 space-y-2">
              <Label htmlFor="due-time" className="text-muted-foreground">Due Time <span className="text-red-500">*</span></Label>
              <Input
                type="time"
                id="due-time"
                step="1"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            <div className="space-y-2 flex-1">
              <Label htmlFor="points_possible" className="text-muted-foreground">Points Possible</Label>
              <Input
                id="points_possible"
                name="points_possible"
                type="number"
                step="1"
                defaultValue={assignment.pointsPossible ?? ""}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2 flex-1">
              <Label htmlFor="points_earned" className="text-muted-foreground">Points Earned</Label>
              <Input
                id="points_earned"
                name="points_earned"
                type="number"
                step="1"
                defaultValue={assignment.pointsEarned ?? ""}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="completed"
              checked={completed}
              onCheckedChange={(checked) => setCompleted(checked === true)}
              disabled={isLoading}
            />
            <Label htmlFor="completed" className="cursor-pointer text-muted-foreground">
              Mark as complete
            </Label>
          </div>

          <div className="flex gap-4 mt-10">
            <Button type="submit" disabled={isLoading} className="flex-1 text-md bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="flex-1 text-md bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
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