import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon, Plus } from "lucide-react"
import { markAssignmentComplete, deleteAssignment, markAssignmentIncomplete } from "../../assignments/actions";
import { DueDateCell, DueTimeCell } from "@/components/local-date";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area" 
interface TableCourseAssignmentsProps {
  assignments: {
    id: string;
    name: string;
    dueDate: string;
    completed: boolean;
  }[];
  courseId: string;
}

export default function TableCourseAssignments({ assignments, courseId }: TableCourseAssignmentsProps) {
  
  return (
    <div className="flex flex-col h-full min-h-0">   
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden shadow-none border-2 border-border rounded-md">
        <CardContent className="px-0 py-0 m-0 h-full flex flex-col">
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b-2">
            <h3 className="text-2xl font-semibold">All Course Assignments</h3>
            <Link href={`/assignments/add/${courseId}`}>
              <Button size="sm" className="-mr-2 text-md bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/30">
                Add <Plus size={16} />
              </Button>
            </Link>
          </div>
          <ScrollArea className="h-full flex-1 min-h-0">
          <table className="table-fixed w-full caption-bottom text-sm">
            {/* <thead className="bg-card border-b">
              <tr className="h-14">
                <th className="px-6 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 shadow-[0_2px_0_0_hsl(var(--border))]">Assignment</th>
                <th className="px-6 w-24 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 shadow-[0_2px_0_0_hsl(var(--border))]">Status</th>
                <th className="px-6 w-28 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 shadow-[0_2px_0_0_hsl(var(--border))]">Due Date</th>
                <th className="px-6 w-20 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 shadow-[0_2px_0_0_hsl(var(--border))]">Time</th>
                <th className="text-right px-6 w-14 align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 shadow-[0_2px_0_0_hsl(var(--border))]">Actions</th>
              </tr>
            </thead> */}
            <tbody className="[&_tr:last-child]:border-0">
              {assignments.length === 0 ? (
                <TableRow className="h-14">
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No assignments found for this course
                  </TableCell>
                </TableRow>
              ) : (
                assignments.map((assignment: any, index: number) => {
                  const markCompleteWithId = markAssignmentComplete.bind(null, assignment.id);
                  const markIncompleteWithId = markAssignmentIncomplete.bind(null, assignment.id);
                  const deleteAssignmentWithId = deleteAssignment.bind(null, assignment.id);
                  
                  return (
                    <TableRow key={index} className="h-14">
                      <TableCell className="font-medium px-6 min-w-0 w-60">
                        <div className="truncate max-w-3xs" title={assignment.name}>
                          {assignment.name}
                        </div>
                      </TableCell>
                      <TableCell className="px-6">
                        {assignment.completed ? (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400 rounded-sm">
                            Completed
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400 rounded-sm">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="px-6">
                        <DueDateCell date={assignment.dueDate} />
                      </TableCell>
                      <TableCell className="px-6">
                        <DueTimeCell date={assignment.dueDate} />
                      </TableCell>
                      <TableCell className="text-right px-6 w-14">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
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
                              <Link href={`/assignments/${assignment.id}/edit`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <form action={deleteAssignmentWithId}>
                              <button type="submit" className="w-full">
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                >
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}