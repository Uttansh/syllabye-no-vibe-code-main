import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Calculator, Clipboard, ClipboardCheck } from "lucide-react";

interface StatsProps {
    stats: {
        totalAssignments: number;
        completedAssignments: number;
        totalCourses: number;
        totalUnits: number;
    };
}

export default function Stats({ stats }: StatsProps) {
const { totalAssignments, completedAssignments, totalCourses, totalUnits } = stats;
const data = [
    {
        name: "Total Courses",
        stat: totalCourses,
        icon: <BookOpen />,
    },
    {
        name: "Total Assignments",
        stat: totalAssignments,
        icon: <Clipboard />,
    },
    {
        name: "Completed Assignments",
        stat: completedAssignments,
        icon: <ClipboardCheck />,
    },
    
    {
        name: "Total Units",
        stat: totalUnits,
        icon: <Calculator />,
    },
    ];
  return (
    <div className="flex items-center justify-center w-full">
      <dl className="grid grid-cols-1 gap-4 grid-cols-2 lg:grid-cols-4 w-full">
        {data.map((item) => (
          <Card key={item.name} className="p-6 py-4">
            <CardContent className="p-0">
              <dd className="flex items-baseline space-x-2.5 justify-between">
                <span className="text-3xl font-semibold text-foreground">
                  {item.stat}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.icon}
                </span>
              </dd>
              <dt className="text-sm font-medium text-muted-foreground">
                {item.name}
              </dt>
            </CardContent>
          </Card>
        ))}
      </dl>
    </div>
  );
}
