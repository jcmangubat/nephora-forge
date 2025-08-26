import React, { useState } from "react"
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  HardHat, 
  Shield, 
  Wrench, 
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Archive,
  Award,
  Briefcase,
  BarChart3,
  PieChart,
  Activity,
  FileText
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

interface PersonnelMember {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  certification: string[]
  status: "Active" | "Inactive" | "On Leave" | "Training"
  assignedProjects: string[]
  currentWorkload: number
  utilization: number
  skills: string[]
  joinDate: string
  lastActive: string
  avatar?: string
  location?: string
  emergencyContact?: string
  contractEndDate?: string
}

const mockPersonnel: PersonnelMember[] = [
  {
    id: "1",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@nephoraforge.com",
    phone: "+1 (555) 234-5678",
    role: "Site Foreman",
    department: "Construction",
    certification: ["OSHA 30", "First Aid", "CPR"],
    status: "Active",
    assignedProjects: ["Downtown Office Complex", "Residential Tower"],
    currentWorkload: 8,
    utilization: 95,
    skills: ["Team Leadership", "Safety Management", "Quality Control"],
    joinDate: "2022-03-15",
    lastActive: "2 hours ago",
    location: "Downtown Site",
    emergencyContact: "Maria Rodriguez - (555) 234-5679",
    contractEndDate: "2025-03-15"
  },
  {
    id: "2",
    name: "Sarah Chua",
    email: "sarah.chua@nephoraforge.com",
    phone: "+1 (555) 345-6789",
    role: "Safety Inspector",
    department: "Safety & Compliance",
    certification: ["CSP", "CHST", "OSHA 510"],
    status: "Active",
    assignedProjects: ["Industrial Warehouse", "Airport Terminal"],
    currentWorkload: 6,
    utilization: 75,
    skills: ["Safety Auditing", "Risk Assessment", "Training"],
    joinDate: "2021-08-20",
    lastActive: "30 minutes ago",
    location: "Airport Site",
    emergencyContact: "David Chen - (555) 345-6790",
    contractEndDate: "2024-12-31"
  },
  {
    id: "3",
    name: "Pete Katigbak",
    email: "pete.katigbak@nephoraforge.com",
    phone: "+1 (555) 456-7890",
    role: "Equipment Operator",
    department: "Operations",
    certification: ["NCCCO Crane", "Heavy Equipment"],
    status: "Active",
    assignedProjects: ["Bridge Construction"],
    currentWorkload: 4,
    utilization: 50,
    skills: ["Crane Operation", "Heavy Machinery", "Maintenance"],
    joinDate: "2023-01-10",
    lastActive: "Yesterday",
    location: "Bridge Site",
    emergencyContact: "Lisa Thompson - (555) 456-7891"
  },
  {
    id: "4",
    name: "Maria Lisa Catotal",
    email: "maria.lisa@nephoraforge.com",
    phone: "+1 (555) 567-8901",
    role: "Project Manager",
    department: "Management",
    certification: ["PMP", "CCM", "LEED AP"],
    status: "Active",
    assignedProjects: ["Bridge Construction", "Highway Expansion"],
    currentWorkload: 10,
    utilization: 125,
    skills: ["Project Planning", "Budget Management", "Stakeholder Relations"],
    joinDate: "2020-06-01",
    lastActive: "1 hour ago",
    location: "Main Office",
    emergencyContact: "John Williams - (555) 567-8902",
    contractEndDate: "2025-06-01"
  },
  {
    id: "5",
    name: "Carlos Martinez",
    email: "carlos.martinez@nephoraforge.com",
    phone: "+1 (555) 678-9012",
    role: "Quality Control Inspector",
    department: "Quality Assurance",
    certification: ["ACI Certified", "ASTM Testing"],
    status: "Training",
    assignedProjects: ["Metro Station Upgrade"],
    currentWorkload: 3,
    utilization: 40,
    skills: ["Material Testing", "Quality Standards", "Documentation"],
    joinDate: "2023-09-05",
    lastActive: "4 hours ago",
    location: "Training Center",
    emergencyContact: "Ana Martinez - (555) 678-9013"
  },
  {
    id: "6",
    name: "Emily delos Reyes",
    email: "emily.dr@nephoraforge.com",
    phone: "+1 (555) 789-0123",
    role: "Electrical Engineer",
    department: "Engineering",
    certification: ["PE License", "NECA Certified"],
    status: "Active",
    assignedProjects: ["Downtown Office Complex"],
    currentWorkload: 7,
    utilization: 88,
    skills: ["Electrical Design", "Code Compliance", "System Integration"],
    joinDate: "2022-11-15",
    lastActive: "3 hours ago",
    location: "Downtown Site",
    emergencyContact: "Mark Johnson - (555) 789-0124"
  }
]

const departments = ["All", "Construction", "Engineering", "Management", "Safety & Compliance", "Quality Assurance", "Operations"]
const roles = ["All", "Site Foreman", "Project Manager", "Safety Inspector", "Equipment Operator", "Quality Control Inspector", "Electrical Engineer"]
const statuses = ["All", "Active", "Inactive", "On Leave", "Training"]

export function PersonnelPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedPerson, setSelectedPerson] = useState<PersonnelMember | null>(null)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const filteredPersonnel = mockPersonnel.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.assignedProjects.some(project => project.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDepartment = departmentFilter === "All" || person.department === departmentFilter
    const matchesRole = roleFilter === "All" || person.role === roleFilter
    const matchesStatus = statusFilter === "All" || person.status === statusFilter

    return matchesSearch && matchesDepartment && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "On Leave": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Training": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return "text-red-600"
    if (utilization < 60) return "text-yellow-600"
    return "text-green-600"
  }

  const getRoleIcon = (role: string) => {
    if (role.includes("Safety")) return Shield
    if (role.includes("Equipment") || role.includes("Operator")) return Wrench
    if (role.includes("Manager")) return Briefcase
    if (role.includes("Engineer")) return Settings
    return HardHat
  }

  // Analytics calculations
  const totalPersonnel = mockPersonnel.length
  const activePersonnel = mockPersonnel.filter(p => p.status === "Active").length
  const averageUtilization = Math.round(mockPersonnel.reduce((sum, p) => sum + p.utilization, 0) / totalPersonnel)
  const overloadedPersonnel = mockPersonnel.filter(p => p.utilization > 100).length
  const underutilizedPersonnel = mockPersonnel.filter(p => p.utilization < 60).length

  const departmentDistribution = departments.slice(1).map(dept => ({
    name: dept,
    count: mockPersonnel.filter(p => p.department === dept).length
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">Personnel Management</h1>
          <p className="text-muted-foreground">
            Manage workforce, assignments, and track personnel performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Personnel
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Personnel</p>
                <p className="text-2xl font-bold">{totalPersonnel}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Personnel</p>
                <p className="text-2xl font-bold text-green-600">{activePersonnel}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Utilization</p>
                <p className={`text-2xl font-bold ${getUtilizationColor(averageUtilization)}`}>
                  {averageUtilization}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overloaded</p>
                <p className="text-2xl font-bold text-red-600">{overloadedPersonnel}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="directory">Personnel Directory</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
          <TabsTrigger value="workload">Workload Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Personnel Directory Tab */}
        <TabsContent value="directory" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search personnel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map(status => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Personnel Table */}
          <Card>
            <CardHeader>
              <CardTitle>Personnel Directory</CardTitle>
              <CardDescription>
                {filteredPersonnel.length} of {totalPersonnel} personnel members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Assigned Projects</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonnel.map((person) => {
                    const RoleIcon = getRoleIcon(person.role)
                    return (
                      <TableRow key={person.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedPerson(person)}>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={person.avatar} />
                              <AvatarFallback>
                                {person.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{person.name}</div>
                              <div className="text-sm text-muted-foreground">{person.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <RoleIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{person.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>{person.department}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {person.assignedProjects.slice(0, 2).map((project, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {project}
                              </Badge>
                            ))}
                            {person.assignedProjects.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{person.assignedProjects.length - 2} more
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1">
                              <Progress value={Math.min(person.utilization, 100)} className="h-2" />
                            </div>
                            <span className={`text-sm font-medium ${getUtilizationColor(person.utilization)}`}>
                              {person.utilization}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(person.status)}>
                            {person.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedPerson(person)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Briefcase className="mr-2 h-4 w-4" />
                                Reassign Tasks
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role Management Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Role Distribution</CardTitle>
                <CardDescription>Personnel count by role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.slice(1).map(role => {
                  const count = mockPersonnel.filter(p => p.role === role).length
                  const percentage = Math.round((count / totalPersonnel) * 100)
                  return (
                    <div key={role} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {React.createElement(getRoleIcon(role), { className: "h-4 w-4 text-muted-foreground" })}
                        <span className="text-sm">{role}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Personnel distribution by department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {departmentDistribution.map(dept => {
                  const percentage = Math.round((dept.count / totalPersonnel) * 100)
                  return (
                    <div key={dept.name} className="flex items-center justify-between">
                      <span className="text-sm">{dept.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{dept.count}</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Workload Tracking Tab */}
        <TabsContent value="workload" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Overloaded Personnel</CardTitle>
                <CardDescription>Personnel with over 100% utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockPersonnel.filter(p => p.utilization > 100).map(person => (
                  <div key={person.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                    <Badge variant="destructive">{person.utilization}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Optimal Load</CardTitle>
                <CardDescription>Personnel with 60-100% utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockPersonnel.filter(p => p.utilization >= 60 && p.utilization <= 100).map(person => (
                  <div key={person.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                    <Badge variant="default">{person.utilization}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-yellow-600">Underutilized</CardTitle>
                <CardDescription>Personnel with under 60% utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockPersonnel.filter(p => p.utilization < 60).map(person => (
                  <div key={person.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                    <Badge variant="secondary">{person.utilization}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Workforce Trends</CardTitle>
                <CardDescription>Key personnel metrics and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">12%</div>
                    <p className="text-sm text-muted-foreground">Productivity Increase</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingDown className="h-8 w-8 mx-auto text-red-500 mb-2" />
                    <div className="text-2xl font-bold">3%</div>
                    <p className="text-sm text-muted-foreground">Turnover Rate</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Award className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-sm text-muted-foreground">Certified Personnel</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                    <div className="text-2xl font-bold">2.3</div>
                    <p className="text-sm text-muted-foreground">Avg Experience (Years)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Actions</CardTitle>
                <CardDescription>Important personnel-related events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium">Certification Expiring</p>
                    <p className="text-sm text-muted-foreground">Sarah Chua's CSP expires in 30 days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Contract Renewal</p>
                    <p className="text-sm text-muted-foreground">3 contracts due for renewal this quarter</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg bg-green-50 dark:bg-green-950/20">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Training Completed</p>
                    <p className="text-sm text-muted-foreground">Carlos Martinez completed safety training</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Personnel Profile Dialog */}
      <Dialog open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Personnel Profile</DialogTitle>
            <DialogDescription>
              Detailed information and current assignments
            </DialogDescription>
          </DialogHeader>
          {selectedPerson && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedPerson.avatar} />
                  <AvatarFallback>
                    {selectedPerson.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedPerson.name}</h3>
                  <p className="text-muted-foreground">{selectedPerson.role}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getStatusColor(selectedPerson.status)}>
                      {selectedPerson.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {selectedPerson.utilization}% Utilization
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedPerson.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedPerson.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{selectedPerson.location}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Work Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Department:</span>
                      <span className="text-sm">{selectedPerson.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Join Date:</span>
                      <span className="text-sm">{new Date(selectedPerson.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Active:</span>
                      <span className="text-sm">{selectedPerson.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPerson.certification.map((cert, index) => (
                    <Badge key={index} variant="outline">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPerson.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Current Projects</h4>
                <div className="space-y-2">
                  {selectedPerson.assignedProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{project}</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}