import { getProgressData } from "../queries";
import PieDonutClient from "./progressChartClient";

export default async function PieDonut({ courseId }: { courseId: string }) {
  const data = await getProgressData(courseId);
  return <PieDonutClient data={data}/>;
}
