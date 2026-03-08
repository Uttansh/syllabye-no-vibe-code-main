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
import { deleteCategory } from "../../categories/actions";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area"

interface TableCourseCategoriesProps {
  categories: {
    id: string;
    name: string;
    weight: number;
    isExam: boolean;
    isMandatory: boolean;
    dropsAllowed: number;
    dropsUsed: number;
    extensionsAllowed: number;
    extensionsUsed: number;
  }[];
  courseId: string;
}

export default function TableCourseCategories({ categories, courseId }: TableCourseCategoriesProps) {
  
  return (
    <div className="flex flex-col h-full min-h-0">   
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden shadow-none border-2 border-border rounded-md">
        <CardContent className="px-0 py-0 m-0 h-full flex flex-col">
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b-2">
            <h3 className="text-2xl font-semibold">Grading Categories</h3>
            <Link href={`/categories/add/${courseId}`}>
              <Button size="sm" className="-mr-2 text-md bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/30">
                Add <Plus size={16} />
              </Button>
            </Link>
          </div>
          <ScrollArea className="h-full flex-1 min-h-0">
          <table className="table-fixed w-full caption-bottom text-sm">
            {/* <thead className="bg-card [&_tr]:border-b">
              <tr className="h-14 border-b-2">
                <th className="px-6 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 border-b-2 border-border">Grading Category</th>
                <th className="px-6 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 border-b-2 border-border">Weight</th>
                <th className="px-6 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 border-b-2 border-border">Drops</th>
                <th className="px-6 text-left align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 border-b-2 border-border">Extensions</th>
                <th className="text-right px-6 w-14 align-middle font-medium whitespace-nowrap sticky top-0 bg-card z-10 border-b-2 border-border">Actions</th>
              </tr>
            </thead> */}
            <tbody className="[&_tr:last-child]:border-0">
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
                        <div className="truncate" title={category.name}>
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell className="px-6">
                        <Badge className="bg-neutral-100 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300">{category.weight}%</Badge>
                      </TableCell>
                      {/* <TableCell className="px-6">
                        {category.isExam ? (
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-400 rounded-sm">
                            Exam
                          </Badge>
                        ) : (
                          <Badge className="bg-neutral-100 text-neutral-700 dark:bg-neutral-500/20 dark:text-neutral-400 rounded-sm">Regular</Badge>
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
                      <TableCell className="text-right px-6 w-14">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontalIcon />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                          <Link href={`/categories/${category.id}/edit`}>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                            </Link>
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
            </tbody>
          </table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}