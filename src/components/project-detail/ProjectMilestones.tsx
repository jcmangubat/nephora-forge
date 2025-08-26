import { useState } from "react"
import { 
  Plus, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Target,
  BarChart3,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { Project } from "../NavigationProvider"

interface Milestone {
  id: string
  name: string
  description: string
  dueDate: string
  status: "pending" | "in-progress" | "completed"
  progress: number
  dependencies: string[]
  assignedTo: string
}

interface ProjectMilestonesProps {
  project: Project
}

const mockMilestones: Milestone[] = [
  {
    id: "1",
    name: "Site Preparation Complete",
    description: "All site preparation work including excavation and utilities",
    dueDate: "2024-08-20",
    status: "completed",
    progress: 100,
    dependencies: [],
    assignedTo: "Juan dela Cruz"
  },
  {
    id: "2",
    name: "Foundation Phase Complete", 
    description: "Foundation work including footings and basement structure",
    dueDate: "2024-08-25",
    status: "in-progress",
    progress: 75,
    dependencies: ["1"],
    assignedTo: "Sarah Chua"
  },
  {
    id: "3",
    name: "Structural Framework Complete",
    description: "Main structural steel and concrete work finished",
    dueDate: "2024-09-15",
    status: "pending",
    progress: 0,
    dependencies: ["2"],
    assignedTo: "Lara David"
  },
  {
    id: "4",
    name: "MEP Rough-in Complete",
    description: "Mechanical, Electrical, and Plumbing rough installation",
    dueDate: "2024-10-01",
    status: "pending",
    progress: 0,
    dependencies: ["3"],
    assignedTo: "Lisa Wang"
  },
  {
    id: "5",
    name: "Interior Finishing Phase",
    description: "All interior finishing work including flooring and fixtures",
    dueDate: "2024-11-15",
    status: "pending",
    progress: 0,
    dependencies: ["4"],
    assignedTo: "Emily delos Reyes"
  },
  {
    id: "6",
    name: "Final Inspection & Handover",
    description: "Final inspections, testing, and project handover",
    dueDate: "2024-12-15",
    status: "pending",
    progress: 0,
    dependencies: ["5"],
    assignedTo: "Mike Rodriguez"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "in-progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "pending": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function ProjectMilestones({ project }: ProjectMilestonesProps) {
  const [viewMode, setViewMode] = useState<"timeline" | "gantt">("timeline")

  const completedMilestones = mockMilestones.filter(m => m.status === "completed").length
  const totalMilestones = mockMilestones.length
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Milestones & Schedule</h2>
          <p className="text-muted-foreground">Track project milestones and timeline</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "timeline" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("timeline")}
              className="rounded-r-none"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Timeline
            </Button>
            <Button
              variant={viewMode === "gantt" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("gantt")}
              className="rounded-l-none"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Gantt
            </Button>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>
      </div>

      {/* Milestone Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedMilestones}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {mockMilestones.filter(m => m.status === "in-progress").length}
              </div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {mockMilestones.filter(m => m.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{overallProgress}%</div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline View */}
      {viewMode === "timeline" && (
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
            <CardDescription>Milestone progress and dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockMilestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      milestone.status === "completed" ? "bg-green-500 border-green-500" :
                      milestone.status === "in-progress" ? "bg-blue-500 border-blue-500" :
                      "bg-gray-200 border-gray-300"
                    }`} />
                    {index < mockMilestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 mt-2" />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{milestone.name}</h4>
                            <p className="text-sm text-muted-foreground">{milestone.description}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="flex items-center justify-between mb-3">
                          <Badge className={getStatusColor(milestone.status)}>
                            {milestone.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {milestone.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                            {milestone.status === "pending" && <Target className="h-3 w-3 mr-1" />}
                            {milestone.status.replace("-", " ")}
                          </Badge>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{milestone.progress}%</span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Assigned to: </span>
                            <span className="font-medium">{milestone.assignedTo}</span>
                          </div>
                          {milestone.dependencies.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                              Depends on: {milestone.dependencies.join(", ")}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gantt Chart View */}
      {viewMode === "gantt" && (
        <Card>
          <CardHeader>
            <CardTitle>Gantt Chart View</CardTitle>
            <CardDescription>Visual project timeline with dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-16">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interactive Gantt Chart</h3>
              <p className="text-muted-foreground mb-4">
                Advanced Gantt chart visualization would be displayed here
              </p>
              <p className="text-sm text-muted-foreground">
                Features would include:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Task dependencies and critical path</li>
                <li>• Resource allocation timeline</li>
                <li>• Progress tracking with baseline comparison</li>
                <li>• Drag-and-drop scheduling</li>
                <li>• Milestone markers and deadlines</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}