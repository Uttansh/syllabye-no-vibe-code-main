"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateCategory } from "../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditCategoryFormProps {
  category: {
    id: string;
    courseId: string;
    name: string;
    weight: number;
    dropsAllowed: number;
    extensionsAllowed: number;
  };
}

export function EditCategoryForm({ category }: EditCategoryFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await updateCategory(category.id, formData);
      router.back();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update category");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Edit Grading Category</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-800 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="name" className="text-muted-foreground">Name <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={category.name}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 flex-1">
                <Label htmlFor="weight" className="text-muted-foreground">Weight (%) <span className="text-red-500">*</span></Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  defaultValue={category.weight}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="drops_allowed" className="text-muted-foreground">Drops Allowed</Label>
                <Input
                  id="drops_allowed"
                  name="drops_allowed"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={category.dropsAllowed}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 flex-1">
                <Label htmlFor="extensions_allowed" className="text-muted-foreground">Extensions Allowed</Label>
                <Input
                  id="extensions_allowed"
                  name="extensions_allowed"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={category.extensionsAllowed}
                  disabled={isLoading}
                />
              </div>
            </div>

            <hr className="my-6" />
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30"
              >
                {isLoading ? "Saving..." : "Save Changes"}
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
