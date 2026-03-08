import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const demoAssignments = [
  {
    name: "Upload your first course syllabus ",
    status: "Completed",
    date: "Yesterday",
    time: "11:59 PM",
    statusColor:
      "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400",
  },
  {
    name: "Let AI extract all your due dates",
    status: "Completed",
    date: "Yesterday",
    time: "11:59 PM",
    statusColor:
      "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400",
  },
  {
    name: "Never miss a deadline again",
    status: "Overdue",
    date: "Yesterday",
    time: "11:59 PM",
    statusColor:
      "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400",
  },
  {
    name: "Get straight A's this semester",
    status: "Pending",
    date: "Today",
    time: "Now",
    statusColor:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400",
  },
]

export default function HeroAssignmentsDemo() {
  return (
    <div className="flex flex-col h-full min-h-0 shadow-neutral-200 dark:shadow-neutral-800">
      <Card className="w-full p-0 flex-1 overflow-hidden border-2 rounded-md shadow-none bg-neutral-100 dark:bg-neutral-800">
        <CardContent className="p-0 flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-6 h-14 border-b-2">
            <h3 className="text-xl font-semibold truncate max-w-md">
              <span className="text-muted-foreground">12345 |</span>{" "}
              Sign up for Syllabye
            </h3>

            <Button
              size="sm"
              className="-mr-3 gap-1 bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/30"
            >
              Add Assignment
              <Plus size={16} />
            </Button>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="h-12">
                <TableHead className="px-6">Assignment</TableHead>
                <TableHead className="px-6 w-28">Status</TableHead>
                <TableHead className="px-6 w-32">Due Date</TableHead>
                <TableHead className="px-6 w-24">Due Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {demoAssignments.map((assignment, index) => (
                <TableRow key={index} className="h-14 hover:bg-neutral-100 dark:hover:bg-neutral-700">

                  {/* NAME */}
                  <TableCell className="px-6">
                    <div
                      className="truncate font-medium"
                      title={assignment.name}
                    >
                      {assignment.name}
                    </div>
                  </TableCell>

                  {/* STATUS */}
                  <TableCell className="px-6">
                    <Badge
                      className={`${assignment.statusColor} rounded-sm`}
                    >
                      {assignment.status}
                    </Badge>
                  </TableCell>

                  {/* DATE */}
                  <TableCell className="px-6 text-muted-foreground">
                    {assignment.date}
                  </TableCell>

                  {/* TIME */}
                  <TableCell className="px-6 text-muted-foreground">
                    {assignment.time}
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>
    </div>
  )
}