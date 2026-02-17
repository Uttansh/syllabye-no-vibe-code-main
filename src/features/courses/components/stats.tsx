import { Card, CardContent } from "@/components/ui/card";
import { getCourseStats } from "../queries";
import { Book, BookOpen, Check, GraduationCap } from "lucide-react";

export default async function CourseStats({courseId}: {courseId: string}) {
const {courseName, courseNumber, units, instructors, totalAssignments, completedAssignments} = await getCourseStats(courseId);
const data = [
    {
        name: "Course Number",
        stat: courseNumber,
        icon: <Book />,
    },
    {
        name: "Total Assignments",
        stat: totalAssignments, 
        icon: <BookOpen />,
    },
    {
        name: "Completed Assignments",
        stat: completedAssignments,
        icon: <Check />,
    },
    
    {
        name: "Units",
        stat: units,
        icon: <GraduationCap />,
    },
    ];
  return (
    <div className="flex items-center justify-center w-full">
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {data.map((item) => (
          <Card key={item.name} className="p-6 py-4">
            <CardContent className="p-0">
              
              
              <dd className="flex items-baseline justify-between space-x-2.5">
                <span className="text-3xl font-semibold text-foreground">
                  {item.stat}
                </span>
                <div className="text-muted-foreground">
                  {item.icon}
                </div>
                {/* <span
                  className={cn(
                    item.changeType === "positive"
                      ? "text-green-800 dark:text-green-400"
                      : "text-red-800 dark:text-red-400",
                    "text-sm font-medium"
                  )}
                >
                  {item.change}
                </span> */}
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