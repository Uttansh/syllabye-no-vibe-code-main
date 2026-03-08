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
import { deleteCategory } from "../../categories/actions";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export default function TableCourseCategories({
  categories,
  courseId,
}: TableCourseCategoriesProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="w-full p-0 m-0 flex-1 min-h-0 overflow-hidden shadow-none border-2 border-border rounded-md">
        <CardContent className="px-0 py-0 m-0 h-full flex flex-col">

          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b-2">
            <h3 className="text-2xl font-semibold">
              Grading Categories
            </h3>

            <Link href={`/categories/add/${courseId}`}>
              <Button
                size="sm"
                className="-mr-2 text-md bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/30"
              >
                Add Category <Plus size={16} />
              </Button>
            </Link>
          </div>

          {/* Table */}
          <ScrollArea className="h-full flex-1 min-h-0 overflow-visible">
            <table className="table-fixed w-full text-sm">
              <tbody className="[&_tr:last-child]:border-0">
                {categories.length === 0 ? (
                  <TableRow className="h-14">
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground"
                    >
                      No categories found for this course
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category: any, index: number) => {
                    const deleteCategoryWithId =
                      deleteCategory.bind(null, category.id);

                    return (
                      <TableRow key={index} className="h-14 border-b">

                        {/* NAME — Flexible */}
                        <TableCell className="px-6 min-w-0">
                          <div
                            className="truncate"
                            title={category.name}
                          >
                            {category.name}
                          </div>
                        </TableCell>

                        {/* WEIGHT */}
                        <TableCell className="px-6 w-24">
                          <Badge className="bg-neutral-100 text-neutral-800 dark:bg-neutral-500/20 dark:text-neutral-300 rounded-sm">
                            {category.weight}%
                          </Badge>
                        </TableCell>

                        {/* DROPS */}
                        <TableCell className="px-6 w-28">
                          {category.dropsAllowed > 0 ? (
                            <span className="text-sm">
                              {category.dropsAllowed -
                                category.dropsUsed}
                              /
                              {category.dropsAllowed}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              None
                            </span>
                          )}
                        </TableCell>

                        {/* EXTENSIONS */}
                        <TableCell className="px-6 w-28">
                          {category.extensionsAllowed > 0 ? (
                            <span className="text-sm">
                              {category.extensionsAllowed -
                                category.extensionsUsed}
                              /
                              {category.extensionsAllowed}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              None
                            </span>
                          )}
                        </TableCell>

                        {/* ACTIONS — Breathing room */}
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
                              <Link
                                href={`/categories/${category.id}/edit`}
                              >
                                <DropdownMenuItem>
                                  Edit
                                </DropdownMenuItem>
                              </Link>

                              <DropdownMenuSeparator />

                              <form action={deleteCategoryWithId}>
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}