import { useState } from "react"
import { 
  ArrowLeft, 
  Edit, 
  Plus, 
  FileText, 
  Calendar,
  Users,
  FolderOpen,
  Activity,
  Settings,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  Target,
  MapPin,
  DollarSign,
  User
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useNavigation } from "./NavigationProvider"
import { ProjectOverview } from "./project-detail/ProjectOverview"
import { ProjectTasks } from "./project-detail/ProjectTasks"
import { ProjectMilestones } from "./project-detail/ProjectMilestones"
import { ProjectTeam } from "./project-detail/ProjectTeam"
import { ProjectFiles } from "./project-detail/ProjectFiles"
import { ProjectActivity } from "./project-detail/ProjectActivity"
import { ProjectSettings } from "./project-detail/ProjectSettings"

const getPhaseColor = (phase: string) => {
  switch (phase) {
    case "Planning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "On Hold": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function ProjectDetailPage() {
  const { selectedProject, navigateBack } = useNavigation()
  const [activeTab, setActiveTab] = useState("overview")

  if (!selectedProject) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No Project Selected</h3>
              <p className="text-muted-foreground">Please select a project to view details</p>
              <Button onClick={navigateBack} className="mt-4">
                Back to Projects
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const duration = Math.ceil((new Date(selectedProject.endDate).getTime() - new Date(selectedProject.startDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="space-y-6">
      {/* Header/Summary Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-b">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={navigateBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Edit className="h-4 w-4 mr-2" />
                Edit Project
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-orange-800 dark:text-orange-200">{selectedProject.name}</h1>
                  <Badge className="font-mono">{selectedProject.code}</Badge>
                </div>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <Badge className={getPhaseColor(selectedProject.phase)}>
                  {selectedProject.phase}
                </Badge>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedProject.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedProject.budget}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Project Progress</span>
                  <span className="font-medium">{selectedProject.progress}%</span>
                </div>
                <Progress value={selectedProject.progress} className="h-3" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Start Date</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedProject.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">End Date</span>
                      <span className="text-sm font-medium">
                        {new Date(selectedProject.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="text-sm font-medium">{duration} days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedProject.manager.avatar} />
                        <AvatarFallback>
                          {selectedProject.manager.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{selectedProject.manager.name}</p>
                        <p className="text-xs text-muted-foreground">Project Manager</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Team Size</span>
                      <span className="text-sm font-medium">{selectedProject.teamSize} members</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Tasks</span>
            </TabsTrigger>
            <TabsTrigger value="milestones" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Milestones</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Team</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center space-x-2">
              <FolderOpen className="h-4 w-4" />
              <span>Files</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview">
              <ProjectOverview project={selectedProject} />
            </TabsContent>
            <TabsContent value="tasks">
              <ProjectTasks project={selectedProject} />
            </TabsContent>
            <TabsContent value="milestones">
              <ProjectMilestones project={selectedProject} />
            </TabsContent>
            <TabsContent value="team">
              <ProjectTeam project={selectedProject} />
            </TabsContent>
            <TabsContent value="files">
              <ProjectFiles project={selectedProject} />
            </TabsContent>
            <TabsContent value="activity">
              <ProjectActivity project={selectedProject} />
            </TabsContent>
            <TabsContent value="settings">
              <ProjectSettings project={selectedProject} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}