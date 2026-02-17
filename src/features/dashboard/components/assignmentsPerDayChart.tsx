"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const chartConfig = {
  assignments: {
    label: "Assignments",
    color: "white",
  },
} satisfies ChartConfig;

export default function AssignmentsPerDayChart({
  labels,
  counts,
}: {
  labels: string[];
  counts: number[];
}) {
  const data = labels.map((label, i) => ({
    day: label,
    assignments: counts[i] ?? 0,
  }));

  return (
    <div>
      
      <Card className="pb-4 w-full pt-4 px-4 border rounded-xl">
        <h3 className="text-2xl font-semibold">Assignments (next 2 weeks)</h3>
        <ChartContainer className="h-[240px] w-full" config={chartConfig}>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis className="mt-4" dataKey="day" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar fill="red" dataKey="assignments" radius={[4, 4, 4, 4]} />
          </BarChart>
        </ChartContainer>
      </Card>
    </div>
  );
}
