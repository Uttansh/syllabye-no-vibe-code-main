"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  completed: { label: "Completed" },
  remaining: { label: "Remaining" },
} satisfies ChartConfig;

export default function PieDonutClient({
  data,
}: {
  data: { category: string; amount: number; fill?: string }[];
}) {
  const completed = data[0]?.amount ?? 0;
  const remaining = data[1]?.amount ?? 0;
  const total = completed + remaining;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col h-full min-h-0">
    
    <div className="w-full flex-1 min-h-0 flex flex-col pt-4 px-4 border border-white/10 bg-card rounded-lg">
    <div className="mb-2 flex-shrink-0">
      <h3 className="text-2xl mb-2 font-semibold flex-shrink-0">Completion rate</h3>
        <p className="text-sm text-muted-foreground">
          You have completed {completed} of {total} assignments.
        </p>
      </div>
      <div className="mt-2 flex-1 min-h-0">
        <ChartContainer className="w-full h-full" config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                innerRadius={70}
                outerRadius={90}
                startAngle={-270}
                endAngle={-630}
            >
                <Label
                    value={`${percent}%`}
                    position="center"
                    className="text-3xl font-bold"
                    fill="#22c55e"
                />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
        </div>
    </div>
    );
}
