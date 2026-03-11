"use client";

import { useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { markAssignmentComplete } from "../../assignments/actions";

export default function MarkCompleteCheckbox({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Checkbox
      disabled={isPending}
      onCheckedChange={(checked) => {
        if (checked) {
          startTransition(() => {
            markAssignmentComplete(assignmentId);
          });
        }
      }}
    />
  );
}
