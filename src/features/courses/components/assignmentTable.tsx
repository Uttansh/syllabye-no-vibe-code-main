import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import {
  markAssignmentComplete,
  deleteAssignment,
  markAssignmentIncomplete,
} from "../../assignments/actions";
import { DueDateCell, DueTimeCell } from "@/components/local-date";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TableCourseAssignmentsProps {
  assignments: {
    id: string;
    name: string;
    dueDate: string | null;
    completed: boolean;
  }[];
  courseId: string;
  courseName: string;
  courseCode: string;
}

export default function TableCourseAssignments({
  assignments,
  courseId,
  courseName,
  courseCode,
}: TableCourseAssignmentsProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden shadow-none border-2 border-border rounded-md">
        <CardContent className="px-0 py-0 m-0 h-full flex flex-col">
          
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b-2">
            <h3 className="text-2xl font-semibold truncate max-w-md">
            <span className="text-muted-foreground">
              {courseCode} | 
            </span>{" "}{courseName}
            </h3>
            

            <Link href={`/assignments/add/${courseId}`}>
              <Button
                size="sm"
                className="-mr-2 text-md bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/30"
              >
                Add Assignment <Plus size={16} />
              </Button>
            </Link>
          </div>

          {/* Table */}
          <ScrollArea className="h-full flex-1 min-h-0">
            <div className="overflow-x-auto">
            <table className="table-fixed w-full text-sm">
              <tbody className="[&_tr:last-child]:border-0">
                {assignments.length === 0 ? (
                  <TableRow className="h-14">
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground"
                    >
                      No assignments found for this course
                    </TableCell>
                  </TableRow>
                ) : (
                  assignments.map((assignment: any, index: number) => {
                    const markCompleteWithId =
                      markAssignmentComplete.bind(null, assignment.id);
                    const markIncompleteWithId =
                      markAssignmentIncomplete.bind(null, assignment.id);
                    const deleteAssignmentWithId =
                      deleteAssignment.bind(null, assignment.id);

                    return (
                      <TableRow key={index} className="h-14 border-b">
                        
                        {/* NAME — takes max space */}
                        <TableCell className="px-6 min-w-0">
                          <div
                            className="truncate"
                            title={assignment.name}
                          >
                            {assignment.name}
                          </div>
                        </TableCell>

                        {/* STATUS */}
                        <TableCell className="px-6 w-28">
                          {assignment.completed ? (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-sm">
                              Completed
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400 rounded-sm">
                              Pending
                            </Badge>
                          )}
                        </TableCell>

                        {/* DATE */}
                        <TableCell className="px-6 w-32">
                          <DueDateCell date={assignment.dueDate} />
                        </TableCell>

                        {/* TIME */}
                        <TableCell className="px-6 w-24">
                          <DueTimeCell date={assignment.dueDate} />
                        </TableCell>

                        {/* ACTIONS — more breathing room */}
                        <TableCell className="text-right pr-6 pl-2 w-20">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-md"
                              >
                                <MoreHorizontalIcon />
                                <span className="sr-only">
                                  Open menu
                                </span>
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              
                              {assignment.completed ? (
                                <form action={markIncompleteWithId}>
                                  <button type="submit" className="w-full">
                                    <DropdownMenuItem>
                                      Mark Incomplete
                                    </DropdownMenuItem>
                                  </button>
                                </form>
                              ) : (
                                <form action={markCompleteWithId}>
                                  <button type="submit" className="w-full">
                                    <DropdownMenuItem>
                                      Mark Complete
                                    </DropdownMenuItem>
                                  </button>
                                </form>
                              )}

                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/assignments/${assignment.id}/edit`}
                                >
                                  Edit
                                </Link>
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              <form action={deleteAssignmentWithId}>
                                <button
                                  type="submit"
                                  className="w-full"
                                >
                                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                                    Delete
                                  </DropdownMenuItem>
                                </button>
                              </form>

                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>

                      </TableRow>
                    );
                  })
                )}
              </tbody>
            </table>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}