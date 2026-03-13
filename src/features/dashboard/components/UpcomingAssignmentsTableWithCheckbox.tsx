import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DueDateCell, DueTimeCell } from "@/components/local-date";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIcon } from "lucide-react";
import MarkCompleteCheckbox from "./MarkCompleteCheckbox";

interface Assignment {
  id: string;
  name: string;
  dueDate: string | null;
  courseName: string;
  courseNumber: string;
}

export default function UpcomingAssignmentsTableWithCheckbox({
  assignments,
}: {
  assignments: Assignment[];
}) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden border-none rounded-md">
        <CardContent className="px-0 py-0 m-0 h-full">
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b-2">
            <h3 className="text-2xl font-semibold">
              Next 10 Assignments
            </h3>
          </div>
          <ScrollArea className="h-full w-full">
            <div className="min-w-full">
              <Table>              
                <TableBody>
                  {assignments.length === 0 ? (
                    <TableRow className="h-14">
                      <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                      >
                        No upcoming assignments
                      </TableCell>
                    </TableRow>
                  ) : (
                    assignments.map((assignment) => (
                      <TableRow key={assignment.id} className="h-14">
                        {/* Checkbox */}
                        <TableCell className="px-6 w-12">
                          <MarkCompleteCheckbox assignmentId={assignment.id} />
                        </TableCell>

                        {/* Assignment Name */}
                        <TableCell className="px-6 min-w-0">
                          <div className="truncate font-medium max-w-[100px]" title={assignment.name}>
                            {assignment.name}
                          </div>
                        </TableCell>

                        {/* Course Number */}
                        <TableCell className="px-6 whitespace-nowrap">
                          {assignment.courseNumber}
                        </TableCell>

                        {/* Due Date */}
                        <TableCell className="px-6 whitespace-nowrap hidden md:table-cell">
                          <DueDateCell date={assignment.dueDate} />
                        </TableCell>

                        {/* Due Time */}
                        <TableCell className="px-6 whitespace-nowrap hidden md:table-cell">
                          <DueTimeCell date={assignment.dueDate} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}