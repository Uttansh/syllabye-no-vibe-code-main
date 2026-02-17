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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAssignmentsByCourse } from "../queries";
import { MoreHorizontalIcon } from "lucide-react"
import { markAssignmentComplete, deleteAssignment, markAssignmentIncomplete } from "../../assignments/actions";
import { DueDateCell, DueTimeCell } from "@/components/local-date";
import Link from "next/link";

interface TableCourseAssignmentsProps {
  courseId: string;
}

export default async function TableCourseAssignments({ courseId }: TableCourseAssignmentsProps) {
  const assignments = await getAssignmentsByCourse(courseId);
  
  return (
    <div className="flex flex-col h-full min-h-0">   
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden">
        <CardContent className="px-0 py-0 m-0 h-full overflow-y-auto">
          <Table>
            <TableHeader className="px-4 sticky top-0 bg-card z-10">
              <TableRow className="h-14">
                <TableHead className="px-6">Assignment</TableHead>
                <TableHead className="px-6">Status</TableHead>
                <TableHead className="px-6">Due Date</TableHead>
                <TableHead className="px-6">Time</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
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
                      <TableCell className="font-medium px-6">
                        <div className="truncate max-w-3xs" title={assignment.name}>
                          {assignment.name}
                        </div>
                      </TableCell>
                      <TableCell className="px-6">
                        {assignment.completed ? (
                          <Badge className="bg-green-500/20 border-green-500 text-green-500 rounded-sm">
                            Completed
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500/20 border-yellow-500 text-yellow-500 rounded-sm">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="px-6">
                        <DueDateCell date={assignment.dueDate} />
                      </TableCell>
                      <TableCell className="px-6">
                        <DueTimeCell date={assignment.dueDate} />
                      </TableCell>
                      <TableCell className="text-right px-6">
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}