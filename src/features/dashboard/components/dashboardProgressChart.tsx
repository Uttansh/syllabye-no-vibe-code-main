import { getTotalProgressData } from "../queries";
import PieDonutClient from "@/features/courses/components/progressChartClient";

export default async function DashboardProgressChart() {
  const data = await getTotalProgressData();
  return <PieDonutClient data={data} />;
}
