import { useState } from "react"
import { 
  Activity, 
  User, 
  Clock, 
  FileText, 
  CheckCircle, 
  Upload, 
  UserPlus,
  Edit,
  Filter,
  Calendar
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Input } from "../ui/input"
import { Project } from "../NavigationProvider"

interface ActivityItem {
  id: string
  type: "task" | "file" | "user" | "milestone" | "update"
  title: string
  description: string
  user: string
  timestamp: string
  metadata?: any
}

interface ProjectActivityProps {
  project: Project
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "task",
    title: "Task Completed",
    description: "Foundation concrete pouring completed successfully",
    user: "Juan dela Cruz",
    timestamp: "2024-08-24T14:30:00Z"
  },
  {
    id: "2",
    type: "file",
    title: "File Uploaded",
    description: "Safety inspection report uploaded",
    user: "Sarah Chua",
    timestamp: "2024-08-24T12:15:00Z",
    metadata: { fileName: "Safety_Report_Aug2024.pdf" }
  },
  {
    id: "3",
    type: "user",
    title: "Team Member Added",
    description: "New electrical engineer added to project team",
    user: "Admin",
    timestamp: "2024-08-24T10:45:00Z",
    metadata: { newMember: "Lisa Wang" }
  },
  {
    id: "4",
    type: "milestone",
    title: "Milestone Achieved",
    description: "Site preparation phase completed",
    user: "Mike Rodriguez",
    timestamp: "2024-08-23T16:20:00Z"
  },
  {
    id: "5",
    type: "update",
    title: "Project Updated",
    description: "Project timeline adjusted due to weather conditions",
    user: "Sarah Chua",
    timestamp: "2024-08-23T09:30:00Z"
  },
  {
    id: "6",
    type: "task",
    title: "Task Created",
    description: "New task created: Install electrical systems",
    user: "Lara David",
    timestamp: "2024-08-22T15:10:00Z"
  },
  {
    id: "7",
    type: "file",
    title: "File Updated",
    description: "Architectural plans revised (v2.1)",
    user: "Emily delos Reyes",
    timestamp: "2024-08-22T11:45:00Z",
    metadata: { fileName: "Architectural_Plans_v2.1.pdf" }
  },
  {
    id: "8",
    type: "milestone",
    title: "Milestone Started",
    description: "Foundation phase work initiated",
    user: "Juan dela Cruz",
    timestamp: "2024-08-21T08:00:00Z"
  }
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "task": return <CheckCircle className="h-4 w-4 text-green-500" />
    case "file": return <Upload className="h-4 w-4 text-blue-500" />
    case "user": return <UserPlus className="h-4 w-4 text-purple-500" />
    case "milestone": return <CheckCircle className="h-4 w-4 text-orange-500" />
    case "update": return <Edit className="h-4 w-4 text-yellow-500" />
    default: return <Activity className="h-4 w-4 text-gray-500" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "task": return "border-l-green-500"
    case "file": return "border-l-blue-500"
    case "user": return "border-l-purple-500"
    case "milestone": return "border-l-orange-500"
    case "update": return "border-l-yellow-500"
    default: return "border-l-gray-500"
  }
}

const formatTimeAgo = (timestamp: string) => {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

export function ProjectActivity({ project }: ProjectActivityProps) {
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const activityTypes = [
    { value: "all", label: "All Activity", count: mockActivity.length },
    { value: "task", label: "Tasks", count: mockActivity.filter(a => a.type === "task").length },
    { value: "file", label: "Files", count: mockActivity.filter(a => a.type === "file").length },
    { value: "user", label: "Team", count: mockActivity.filter(a => a.type === "user").length },
    { value: "milestone", label: "Milestones", count: mockActivity.filter(a => a.type === "milestone").length }
  ]

  const filteredActivity = mockActivity.filter(activity => {
    const matchesType = selectedType === "all" || activity.type === selectedType
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Activity Log</h2>
          <p className="text-muted-foreground">Complete audit trail of project activities</p>
        </div>
      </div>

      {/* Activity Statistics */}
      <div className="grid gap-4 md:grid-cols-5">
        {activityTypes.map(type => (
          <Card key={type.value} className={`cursor-pointer transition-colors ${
            selectedType === type.value ? "ring-2 ring-orange-500" : ""
          }`} onClick={() => setSelectedType(type.value)}>
            <CardContent className="pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{type.count}</div>
                <p className="text-sm text-muted-foreground">{type.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter by Date
        </Button>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
          <CardDescription>Recent project activities and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivity.map((activity, index) => (
              <div key={activity.id} className={`flex items-start space-x-4 p-4 border-l-4 ${getActivityColor(activity.type)} bg-muted/30 rounded-r-lg`}>
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  
                  {activity.metadata && (
                    <div className="text-xs text-muted-foreground mb-2">
                      {activity.metadata.fileName && (
                        <Badge variant="outline" className="mr-2">
                          <FileText className="h-3 w-3 mr-1" />
                          {activity.metadata.fileName}
                        </Badge>
                      )}
                      {activity.metadata.newMember && (
                        <Badge variant="outline">
                          <User className="h-3 w-3 mr-1" />
                          {activity.metadata.newMember}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}