import { Button } from "@/components/ui/button"
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
import { MoreHorizontalIcon, TriangleAlert } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { deleteCourse } from "../../courses/actions";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
interface Course {
  id: string;
  name: string;
  number: string;
  assignmentsLeft: number;
  hasDueSoon: boolean;
  units: number;
}

export default function TableCourses({ courses }: { courses: Course[] }) {
  return (
    <div className="flex flex-col h-full min-h-0">   
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden">
        <CardContent className="px-0 py-0 m-0 h-full">
          <ScrollArea className="h-full">
            <Table>
            <TableHeader className="px-4 sticky top-0 bg-card z-10">
              <TableRow className="h-14">
                <TableHead className="px-6">Courses</TableHead>
                <TableHead className="px-6">Course #</TableHead>
                <TableHead className="px-6">Assignments Left</TableHead>
                <TableHead className="px-6">Units</TableHead>
                <TableHead className="px-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 ? (
                <TableRow className="h-14">
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No courses found
                  </TableCell>
                </TableRow>
              ) : (
                courses.map((course) => {
                  const deleteCourseWithId = deleteCourse.bind(null, course.id);
                  
                  return (
                    <TableRow key={course.id} className="h-14">
                      <TableCell className="font-medium px-6">
                        <div className="flex items-center gap-2">
                          <Link href={`/courses/${course.id}`}>
                            <div className="truncate max-w-3xs hover:underline" title={course.name}>
                              {course.name}
                            </div>
                          </Link>
                          {course.hasDueSoon && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <TriangleAlert className="size-4 text-yellow-500 shrink-0" />
                              </TooltipTrigger>
                              <TooltipContent>
                                Assignment due within 24 hours
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="px-6">{course.number}</TableCell>
                      <TableCell className="px-6">{course.assignmentsLeft}</TableCell>
                      <TableCell className="px-6">{course.units}</TableCell>
                      <TableCell className="text-right px-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                          <Link href={`/courses/${course.id}`}>
                            <DropdownMenuItem>
                                View Details
                            </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem asChild>
                              <Link href={`/courses/${course.id}/edit`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <form action={deleteCourseWithId}>
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
