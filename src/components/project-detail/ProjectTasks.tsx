import { useState } from "react"
import { 
  Plus, 
  MoreHorizontal, 
  Clock, 
  User, 
  Calendar,
  Flag,
  Edit,
  Trash2,
  Filter,
  List,
  LayoutGrid
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { Project } from "../NavigationProvider"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "done"
  assignee: string
  dueDate: string
  priority: "low" | "medium" | "high"
  tags: string[]
}

interface ProjectTasksProps {
  project: Project
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Site Survey and Analysis",
    description: "Complete topographical survey and soil analysis",
    status: "done",
    assignee: "John dela Cruz",
    dueDate: "2024-08-20",
    priority: "high",
    tags: ["Planning", "Survey"]
  },
  {
    id: "2",
    title: "Foundation Excavation",
    description: "Excavate foundation according to architectural plans",
    status: "done",
    assignee: "Mike Rodriguez",
    dueDate: "2024-08-22",
    priority: "high",
    tags: ["Foundation", "Excavation"]
  },
  {
    id: "3",
    title: "Concrete Pouring - Level 1",
    description: "Pour concrete for first floor foundation",
    status: "in-progress",
    assignee: "Sarah Chua",
    dueDate: "2024-08-25",
    priority: "high",
    tags: ["Concrete", "Foundation"]
  },
  {
    id: "4",
    title: "Steel Framework Installation",
    description: "Install main structural steel framework",
    status: "in-progress",
    assignee: "Lara David",
    dueDate: "2024-08-28",
    priority: "medium",
    tags: ["Steel", "Structure"]
  },
  {
    id: "5",
    title: "Electrical Rough-in",
    description: "Install electrical conduits and rough wiring",
    status: "todo",
    assignee: "Lisa Wang",
    dueDate: "2024-09-02",
    priority: "medium",
    tags: ["Electrical", "MEP"]
  },
  {
    id: "6",
    title: "Plumbing Installation",
    description: "Install main plumbing lines and fixtures",
    status: "todo",
    assignee: "Emily Delgado",
    dueDate: "2024-09-05",
    priority: "medium",
    tags: ["Plumbing", "MEP"]
  },
  {
    id: "7",
    title: "HVAC System Setup",
    description: "Install heating, ventilation, and air conditioning",
    status: "todo",
    assignee: "Thomas Larossa",
    dueDate: "2024-09-10",
    priority: "low",
    tags: ["HVAC", "MEP"]
  },
  {
    id: "8",
    title: "Safety Inspection",
    description: "Conduct comprehensive safety compliance review",
    status: "in-progress",
    assignee: "Protacio Alon",
    dueDate: "2024-08-26",
    priority: "high",
    tags: ["Safety", "Inspection"]
  }
]

const statusColumns = [
  { id: "todo", title: "To Do", color: "bg-gray-100 dark:bg-gray-800" },
  { id: "in-progress", title: "In Progress", color: "bg-blue-100 dark:bg-blue-900" },
  { id: "done", title: "Done", color: "bg-green-100 dark:bg-green-900" }
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function ProjectTasks({ project }: ProjectTasksProps) {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban")

  const getTasksByStatus = (status: string) => {
    return mockTasks.filter(task => task.status === status)
  }

  const TaskCard = ({ task }: { task: Task }) => (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-3 w-3" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-3 w-3" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge className={getPriorityColor(task.priority)}>
              <Flag className="h-3 w-3 mr-1" />
              {task.priority}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-xs">
                  {task.assignee.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{task.assignee.split(' ')[0]}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Tasks & Kanban Board</h2>
          <p className="text-muted-foreground">Manage project tasks and track progress</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === "kanban" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("kanban")}
              className="rounded-r-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Task Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getTasksByStatus("todo").length}</div>
              <p className="text-sm text-muted-foreground">To Do</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{getTasksByStatus("in-progress").length}</div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getTasksByStatus("done").length}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{mockTasks.length}</div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      {viewMode === "kanban" && (
        <div className="grid gap-6 md:grid-cols-3">
          {statusColumns.map(column => (
            <div key={column.id} className="space-y-4">
              <div className={`p-4 rounded-lg ${column.color}`}>
                <h3 className="font-medium flex items-center justify-between">
                  {column.title}
                  <Badge variant="secondary">{getTasksByStatus(column.id).length}</Badge>
                </h3>
              </div>
              <div className="space-y-3">
                {getTasksByStatus(column.id).map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
                <Button 
                  variant="dashed" 
                  className="w-full justify-center border-dashed border-2 h-12"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
            <CardDescription>List view of all project tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{task.assignee}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}