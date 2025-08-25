import { 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  FileText, 
  Upload,
  Calendar,
  Target,
  TrendingUp,
  DollarSign,
  Activity
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Project } from "../NavigationProvider"

interface ProjectOverviewProps {
  project: Project
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const upcomingDeadlines = [
    { task: "Complete foundation inspection", due: "2024-08-25", assignee: "John Smith", priority: "high" },
    { task: "Install electrical systems", due: "2024-08-28", assignee: "Lisa Wong", priority: "medium" },
    { task: "Submit environmental report", due: "2024-08-30", assignee: "Mike Chen", priority: "high" }
  ]

  const recentUpdates = [
    { message: "Foundation concrete poured successfully", user: "John Smith", time: "2 hours ago", type: "success" },
    { message: "Weather delay for roofing work", user: "System", time: "4 hours ago", type: "warning" },
    { message: "Safety inspection completed", user: "Sarah Johnson", time: "1 day ago", type: "success" },
    { message: "New team member added to project", user: "Admin", time: "2 days ago", type: "info" }
  ]

  const projectStats = [
    { label: "Tasks Completed", value: "28", total: "45", percentage: 62 },
    { label: "Budget Used", value: `${(parseFloat(project.budget.replace('$', '').replace('M', '')) * 0.67).toFixed(1)}M`, total: project.budget, percentage: 67 },
    { label: "Days Remaining", value: "24", total: "365", percentage: 93 },
    { label: "Team Utilization", value: "89%", total: "100%", percentage: 89 }
  ]

  return (
    <div className="space-y-6">
      {/* Project Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Project Summary</CardTitle>
          <CardDescription>Overview of project goals, status, and key metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Project Goals</h4>
            <p className="text-sm text-muted-foreground">
              Deliver a state-of-the-art construction project that meets all safety, quality, and timeline requirements while staying within budget constraints.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {projectStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-sm font-medium">{stat.value}</span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Progress Tracker */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Tracker</CardTitle>
            <CardDescription>Current status and completion metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{project.progress}%</div>
              <p className="text-muted-foreground">Overall Completion</p>
            </div>
            <Progress value={project.progress} className="h-4" />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-3 border rounded-lg">
                <CheckCircle className="h-6 w-6 mx-auto text-green-500 mb-2" />
                <div className="text-xl font-bold">28</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <Clock className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                <div className="text-xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <AlertTriangle className="h-6 w-6 mx-auto text-red-500 mb-2" />
                <div className="text-xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Next 3 tasks and milestones due</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium">{deadline.task}</p>
                    <Badge 
                      variant={deadline.priority === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {deadline.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(deadline.due).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{deadline.assignee}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest notifications and project changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  update.type === 'success' ? 'bg-green-500' :
                  update.type === 'warning' ? 'bg-yellow-500' :
                  update.type === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{update.message}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                    <span>{update.user}</span>
                    <span>•</span>
                    <span>{update.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used project operations</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button variant="outline" className="justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Create New Task
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
            <Button variant="outline" className="justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
            <Button variant="outline" className="justify-start">
              <Target className="h-4 w-4 mr-2" />
              Create Milestone
            </Button>
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline" className="justify-start">
              <Activity className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}