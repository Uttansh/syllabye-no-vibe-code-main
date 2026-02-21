import PieDonutClient from "@/features/courses/components/progressChartClient";

interface DashboardProgressChartProps {
  data: { category: string; amount: number; fill?: string }[];
}

export default function DashboardProgressChart({ data }: DashboardProgressChartProps) {
  return <PieDonutClient data={data} />;
}
