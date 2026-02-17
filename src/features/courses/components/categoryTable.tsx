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
import { getCategoriesByCourse } from "../queries";
import { MoreHorizontalIcon } from "lucide-react"
import { deleteCategory } from "../../categories/actions";

interface TableCourseCategoriesProps {
  courseId: string;
}

export default async function TableCourseCategories({ courseId }: TableCourseCategoriesProps) {
  const categories = await getCategoriesByCourse(courseId);
  
  return (
    <div className="flex flex-col h-full min-h-0">   
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden">
        <CardContent className="px-0 py-0 m-0 h-full overflow-y-auto">
          <Table>
            <TableHeader className="px-4 sticky top-0 bg-card z-10">
              <TableRow className="h-14">
                <TableHead className="px-6">Grading Category</TableHead>
                <TableHead className="px-6">Weight</TableHead>
                {/* <TableHead className="px-6">Type</TableHead> */}
                <TableHead className="px-6">Drops</TableHead>
                <TableHead className="px-6">Extensions</TableHead>
                <TableHead className="text-right px-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow className="h-14">
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No categories found for this course
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category: any, index: number) => {
                  const deleteCategoryWithId = deleteCategory.bind(null, category.id);
                  
                  return (
                    <TableRow key={index} className="h-14">
                      <TableCell className="font-medium px-6">
                        <div className="truncate max-w-xs" title={category.name}>
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell className="px-6">
                        <Badge variant="outline">{category.weight}%</Badge>
                      </TableCell>
                      {/* <TableCell className="px-6">
                        {category.isExam ? (
                          <Badge className="bg-purple-500/20 border-purple-500 text-purple-500 rounded-sm">
                            Exam
                          </Badge>
                        ) : (
                          <Badge className="bg-neutral-300/10 border-neutral-500 text-neutral-500 rounded-sm">Regular</Badge>
                        )}
                      </TableCell> */}
                      <TableCell className="px-6">
                        {category.dropsAllowed > 0 ? (
                          <span className="text-sm">
                            {category.dropsAllowed - category.dropsUsed}/{category.dropsAllowed}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell className="px-6">
                        {category.extensionsAllowed > 0 ? (
                          <span className="text-sm">
                            {category.extensionsAllowed - category.extensionsUsed}/{category.extensionsAllowed}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">None</span>
                        )}
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <form action={deleteCategoryWithId}>
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