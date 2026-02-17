"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCategory } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddCategoryFormProps {
  courseId: string;
}

export function AddCategoryForm({ courseId }: AddCategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await createCategory(courseId, formData);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Add Grading Category</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-800 px-4 py-3 rounded bg-red-50 border border-red-200">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  disabled={isLoading}
                  placeholder="e.g., Homework"
                />
              </div>

              <div className="space-y-2 flex-1">
                <Label htmlFor="weight">Weight (%) *</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  disabled={isLoading}
                  placeholder="e.g., 25"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="drops_allowed">Drops Allowed</Label>
                <Input
                  id="drops_allowed"
                  name="drops_allowed"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 flex-1">
                <Label htmlFor="extensions_allowed">Extensions Allowed</Label>
                <Input
                  id="extensions_allowed"
                  name="extensions_allowed"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  disabled={isLoading}
                />
              </div>
            </div>

            <hr className="my-6" />
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-500/10 border text-green-500 border-green-500 hover:bg-green-500/20"
              >
                {isLoading ? "Creating..." : "Add Category"}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()}
                disabled={isLoading}
                className="flex-1 bg-red-500/10 border text-red-500 border-red-500 hover:bg-red-500/20"
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
