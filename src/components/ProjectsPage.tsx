import React, { useState } from "react"
import { 
  Calendar, 
  Users, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Archive, 
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Target,
  BarChart3,
  Package,
  Bell,
  FileText,
  MapPin,
  DollarSign
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useNavigation, Project } from "./NavigationProvider"

const mockProjects: Project[] = [
  {
    id: "1",
    code: "PRJ-001",
    name: "Downtown Office Complex",
    description: "45-story mixed-use development with retail and office spaces",
    startDate: "2024-01-15",
    endDate: "2025-12-30",
    progress: 65,
    phase: "In Progress",
    manager: { name: "Sarah Chua", avatar: "" },
    teamSize: 24,
    budget: "₱45.2M",
    location: "Downtown District"
  },
  {
    id: "2",
    code: "PRJ-002",
    name: "Riverside Bridge Construction",
    description: "Cable-stayed bridge spanning 800m across the river",
    startDate: "2024-03-01",
    endDate: "2025-08-15",
    progress: 42,
    phase: "In Progress",
    manager: { name: "Mike Rodriguez", avatar: "" },
    teamSize: 18,
    budget: "₱28.7M",
    location: "Riverside"
  },
  {
    id: "3",
    code: "PRJ-003",
    name: "Airport Terminal Expansion",
    description: "New terminal wing with 12 additional gates and baggage handling",
    startDate: "2024-02-10",
    endDate: "2025-10-20",
    progress: 28,
    phase: "In Progress",
    manager: { name: "Emily delos Reyes", avatar: "" },
    teamSize: 32,
    budget: "₱67.8M",
    location: "International Airport"
  },
  {
    id: "4",
    code: "PRJ-004",
    name: "Residential Tower Phase 1",
    description: "35-floor luxury residential building with amenities",
    startDate: "2023-11-01",
    endDate: "2024-11-30",
    progress: 89,
    phase: "In Progress",
    manager: { name: "Lara David", avatar: "" },
    teamSize: 16,
    budget: "₱32.1M",
    location: "Uptown"
  },
  {
    id: "5",
    code: "PRJ-005",
    name: "Metro Station Upgrade",
    description: "Platform extension and accessibility improvements",
    startDate: "2024-01-05",
    endDate: "2024-06-15",
    progress: 15,
    phase: "Planning",
    manager: { name: "Lisa Wang", avatar: "" },
    teamSize: 8,
    budget: "₱12.4M",
    location: "Central Station"
  }
]

const getPhaseColor = (phase: Project['phase']) => {
  switch (phase) {
    case "Planning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "In Progress": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "On Hold": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function ProjectsPage() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const { navigateToProject, navigateToAddProject } = useNavigation()

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const handleProjectClick = (project: Project) => {
    navigateToProject(project)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">Projects</h1>
          <p className="text-muted-foreground">
            Manage and monitor all construction projects
          </p>
        </div>
        <Button 
          onClick={navigateToAddProject}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Projects Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 new this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">80% of active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱186.2M</div>
            <p className="text-xs text-muted-foreground">Across all active projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Monitor progress and manage all construction projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Code</TableHead>
                <TableHead>Project Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProjects.map((project) => (
                <React.Fragment key={project.id}>
                  <TableRow className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-mono">{project.code}</TableCell>
                    <TableCell onClick={() => handleProjectClick(project)}>
                      <div>
                        <div className="font-medium text-orange-600 hover:text-orange-700 cursor-pointer">
                          {project.name}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {project.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(project.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          to {new Date(project.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPhaseColor(project.phase)}>
                        {project.phase}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.manager.avatar} />
                          <AvatarFallback>
                            {project.manager.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{project.manager.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{project.teamSize}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleProjectClick(project)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProjectExpansion(project.id)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem key="view" onClick={() => handleProjectClick(project)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem key="edit">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem key="archive">
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {/* Expandable Project Details */}
                  {expandedProject === project.id && (
                    <TableRow key={`${project.id}-expanded`}>
                      <TableCell colSpan={8} className="p-0">
                        <Collapsible open={true}>
                          <CollapsibleContent>
                            <div className="border-t bg-muted/30 p-6">
                              <Tabs defaultValue="metadata" className="w-full">
                                <TabsList className="grid w-full grid-cols-6">
                                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                                  <TabsTrigger value="tasks">Tasks & Milestones</TabsTrigger>
                                  <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
                                  <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                                  <TabsTrigger value="resources">Resources</TabsTrigger>
                                  <TabsTrigger value="notifications">Updates</TabsTrigger>
                                </TabsList>
                                
                                <TabsContent value="metadata" className="space-y-4">
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-base">Project Information</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Project Code:</span>
                                          <span className="font-mono">{project.code}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Budget:</span>
                                          <span>{project.budget}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Location:</span>
                                          <span>{project.location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Team Size:</span>
                                          <span>{project.teamSize} members</span>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="text-base">Timeline</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Start Date:</span>
                                          <span>{new Date(project.startDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">End Date:</span>
                                          <span>{new Date(project.endDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Duration:</span>
                                          <span>
                                            {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Current Phase:</span>
                                          <Badge className={getPhaseColor(project.phase)}>
                                            {project.phase}
                                          </Badge>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  <div className="flex justify-center">
                                    <Button 
                                      onClick={() => handleProjectClick(project)}
                                      className="bg-orange-500 hover:bg-orange-600"
                                    >
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Full Project Details
                                    </Button>
                                  </div>
                                </TabsContent>
                                
                                {/* Other tab content remains the same but simplified */}
                                <TabsContent value="tasks" className="text-center py-8">
                                  <Button onClick={() => handleProjectClick(project)} variant="outline">
                                    View Full Tasks & Kanban Board
                                  </Button>
                                </TabsContent>
                                
                                <TabsContent value="progress" className="text-center py-8">
                                  <Button onClick={() => handleProjectClick(project)} variant="outline">
                                    View Detailed Progress Tracking
                                  </Button>
                                </TabsContent>
                                
                                <TabsContent value="scheduling" className="text-center py-8">
                                  <Button onClick={() => handleProjectClick(project)} variant="outline">
                                    View Gantt Chart & Timeline
                                  </Button>
                                </TabsContent>
                                
                                <TabsContent value="resources" className="text-center py-8">
                                  <Button onClick={() => handleProjectClick(project)} variant="outline">
                                    View Team & Resources
                                  </Button>
                                </TabsContent>
                                
                                <TabsContent value="notifications" className="text-center py-8">
                                  <Button onClick={() => handleProjectClick(project)} variant="outline">
                                    View Activity Log & Updates
                                  </Button>
                                </TabsContent>
                              </Tabs>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}