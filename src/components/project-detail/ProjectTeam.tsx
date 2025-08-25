import { useState } from "react"
import { 
  Plus, 
  Users, 
  Mail, 
  Phone, 
  MoreHorizontal,
  UserPlus,
  Shield,
  Clock,
  CheckCircle
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Progress } from "../ui/progress"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { Project } from "../NavigationProvider"

interface TeamMember {
  id: string
  name: string
  role: string
  email: string
  phone: string
  department: string
  tasksAssigned: number
  tasksCompleted: number
  utilization: number
  status: "active" | "busy" | "away"
}

interface ProjectTeamProps {
  project: Project
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Project Manager",
    email: "sarah.chen@nephoraforge.com",
    phone: "+1 (555) 123-4567",
    department: "Management",
    tasksAssigned: 8,
    tasksCompleted: 6,
    utilization: 85,
    status: "active"
  },
  {
    id: "2",
    name: "John Smith",
    role: "Site Engineer",
    email: "john.smith@nephoraforge.com", 
    phone: "+1 (555) 234-5678",
    department: "Engineering",
    tasksAssigned: 12,
    tasksCompleted: 9,
    utilization: 92,
    status: "busy"
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    role: "Construction Supervisor",
    email: "mike.rodriguez@nephoraforge.com",
    phone: "+1 (555) 345-6789",
    department: "Construction",
    tasksAssigned: 15,
    tasksCompleted: 12,
    utilization: 88,
    status: "active"
  },
  {
    id: "4",
    name: "Lisa Wang",
    role: "Electrical Engineer",
    email: "lisa.wang@nephoraforge.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    tasksAssigned: 6,
    tasksCompleted: 4,
    utilization: 67,
    status: "active"
  },
  {
    id: "5",
    name: "David Park",
    role: "Steel Worker",
    email: "david.park@nephoraforge.com",
    phone: "+1 (555) 567-8901",
    department: "Construction",
    tasksAssigned: 10,
    tasksCompleted: 8,
    utilization: 80,
    status: "away"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "busy": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "away": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getRoleIcon = (role: string) => {
  if (role.includes("Manager")) return <Shield className="h-4 w-4" />
  if (role.includes("Engineer")) return <Users className="h-4 w-4" />
  return <Users className="h-4 w-4" />
}

export function ProjectTeam({ project }: ProjectTeamProps) {
  const totalMembers = mockTeamMembers.length
  const averageUtilization = Math.round(mockTeamMembers.reduce((sum, member) => sum + member.utilization, 0) / totalMembers)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Team & Resources</h2>
          <p className="text-muted-foreground">Manage team members and resource allocation</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalMembers}</div>
              <p className="text-sm text-muted-foreground">Team Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{averageUtilization}%</div>
              <p className="text-sm text-muted-foreground">Avg Utilization</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {mockTeamMembers.filter(m => m.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {mockTeamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockTeamMembers.map(member => (
          <Card key={member.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(member.role)}
                      <span className="text-sm text-muted-foreground">{member.role}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{member.phone}</span>
                </div>
                
                <div className="pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Task Progress</span>
                    <span className="text-sm font-medium">
                      {member.tasksCompleted}/{member.tasksAssigned}
                    </span>
                  </div>
                  <Progress 
                    value={(member.tasksCompleted / member.tasksAssigned) * 100} 
                    className="h-2" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Utilization</span>
                    <span className="text-sm font-medium">{member.utilization}%</span>
                  </div>
                  <Progress value={member.utilization} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
          <CardDescription>Team members by department and role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-xl font-bold text-blue-600">1</div>
              <p className="text-sm text-muted-foreground">Management</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-xl font-bold text-green-600">2</div>
              <p className="text-sm text-muted-foreground">Engineering</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-xl font-bold text-orange-600">2</div>
              <p className="text-sm text-muted-foreground">Construction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}