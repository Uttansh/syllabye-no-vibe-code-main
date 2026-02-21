import PieDonutClient from "./progressChartClient";

interface PieDonutProps {
  progressData: { category: string; amount: number; fill: string }[];
}

export default function PieDonut({ progressData }: PieDonutProps) {
  return <PieDonutClient data={progressData}/>;
}
