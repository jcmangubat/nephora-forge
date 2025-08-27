import React, { useState } from "react"
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  AlertTriangle, 
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  TrendingUp,
  TrendingDown,
  Settings,
  Eye,
  Edit,
  Archive,
  FileText,
  Bell,
  BookOpen,
  Clipboard,
  Award,
  Target,
  Activity,
  AlertCircle,
  CheckSquare,
  Upload,
  RefreshCw,
  UserCheck,
  HardHat,
  Flag,
  Camera,
  TestTube,
  Shield,
  Hammer,
  Building,
  FileCheck,
  ClipboardCheck,
  Zap,
  Construction,
  Scale,
  DollarSign,
  Truck,
  PieChart,
  LineChart,
  Mail,
  Share,
  CalendarDays,
  Phone,
  UserPlus,
  UserMinus,
  Lock,
  Unlock,
  Key,
  BarChart3,
  TrendingDown as Down,
  UserX,
  CreditCard,
  Notification,
  ShieldCheck,
  LogIn,
  LogOut,
  PhoneCall,
  MessageSquare,
  Globe,
  Crown,
  Star,
  Briefcase,
  GraduationCap,
  PersonStanding
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
import { Textarea } from "./ui/textarea"
import { Separator } from "./ui/separator"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Checkbox } from "./ui/checkbox"
import { Switch } from "./ui/switch"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  status: "Active" | "Inactive" | "On Leave" | "Suspended" | "Archived"
  assignedProjects: string[]
  joinDate: string
  lastActive: string
  location: string
  monthlyCost: number
  certifications: Certification[]
  permissions: string[]
  isOnline: boolean
  mfaEnabled: boolean
  profileImage?: string
  timezone: string
  notificationPreferences: NotificationPrefs
  performanceMetrics: PerformanceMetrics
}

interface Certification {
  name: string
  issuer: string
  expiryDate: string
  status: "Valid" | "Expired" | "Expiring Soon"
}

interface NotificationPrefs {
  email: boolean
  sms: boolean
  inApp: boolean
  projectUpdates: boolean
  safetyAlerts: boolean
  qualityReports: boolean
}

interface PerformanceMetrics {
  tasksCompleted: number
  inspectionsCompleted: number
  milestonesAchieved: number
  safetyScore: number
  qualityScore: number
}

interface Role {
  name: string
  permissions: string[]
  monthlyCost: number
  description: string
  userCount: number
}

interface ActivityLog {
  id: string
  user: string
  action: string
  timestamp: string
  details: string
  category: "Login" | "Update" | "Approval" | "System" | "Security"
}

interface PendingInvite {
  id: string
  email: string
  role: string
  invitedBy: string
  inviteDate: string
  status: "Pending" | "Accepted" | "Expired"
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John dela Cruz",
    email: "juan.delacruz@nephoraforge.com",
    phone: "0917-222-3344",
    role: "Project Manager",
    department: "Engineering",
    status: "Active",
    assignedProjects: ["Makati SkyTower", "Cebu Coastal Road Expansion"],
    joinDate: "2022-03-15",
    lastActive: "2 hours ago",
    location: "Makati Office",
    monthlyCost: 1500,
    isOnline: true,
    mfaEnabled: true,
    timezone: "Asia/Manila",
    certifications: [
      { name: "PMP Certification", issuer: "PMI", expiryDate: "2025-06-15", status: "Valid" },
      { name: "Construction Management", issuer: "PCAB", expiryDate: "2024-12-31", status: "Valid" }
    ],
    permissions: ["full_access", "project_management", "user_management", "financial_reports"],
    notificationPreferences: {
      email: true,
      sms: true,
      inApp: true,
      projectUpdates: true,
      safetyAlerts: true,
      qualityReports: true
    },
    performanceMetrics: {
      tasksCompleted: 125,
      inspectionsCompleted: 0,
      milestonesAchieved: 15,
      safetyScore: 95,
      qualityScore: 92
    }
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@nephoraforge.com",
    phone: "0918-555-7890",
    role: "Site Engineer",
    department: "Engineering",
    status: "Active",
    assignedProjects: ["Taguig Business Park"],
    joinDate: "2021-08-20",
    lastActive: "30 minutes ago",
    location: "Taguig Site",
    monthlyCost: 1000,
    isOnline: true,
    mfaEnabled: false,
    timezone: "Asia/Manila",
    certifications: [
      { name: "Safety Training Certificate", issuer: "DOLE", expiryDate: "2026-09-15", status: "Valid" },
      { name: "Engineering License", issuer: "PRC", expiryDate: "2025-03-31", status: "Expiring Soon" }
    ],
    permissions: ["project_access", "engineering_tools", "safety_reports"],
    notificationPreferences: {
      email: true,
      sms: false,
      inApp: true,
      projectUpdates: true,
      safetyAlerts: true,
      qualityReports: false
    },
    performanceMetrics: {
      tasksCompleted: 89,
      inspectionsCompleted: 12,
      milestonesAchieved: 8,
      safetyScore: 98,
      qualityScore: 88
    }
  },
  {
    id: "3",
    name: "Carlos Ramirez",
    email: "jose.ramirez@nephoraforge.com",
    phone: "0921-333-1010",
    role: "Quality Inspector",
    department: "Quality",
    status: "Suspended",
    assignedProjects: ["Clark Airport Modernization"],
    joinDate: "2023-01-10",
    lastActive: "August 1, 2025",
    location: "Clark Site",
    monthlyCost: 800,
    isOnline: false,
    mfaEnabled: true,
    timezone: "Asia/Manila",
    certifications: [
      { name: "Quality Control Certification", issuer: "ISO", expiryDate: "2023-12-15", status: "Expired" },
      { name: "Material Testing", issuer: "ASTM", expiryDate: "2024-06-30", status: "Expired" }
    ],
    permissions: ["quality_control", "compliance_reports"],
    notificationPreferences: {
      email: false,
      sms: false,
      inApp: false,
      projectUpdates: false,
      safetyAlerts: false,
      qualityReports: true
    },
    performanceMetrics: {
      tasksCompleted: 45,
      inspectionsCompleted: 28,
      milestonesAchieved: 3,
      safetyScore: 85,
      qualityScore: 94
    }
  },
  {
    id: "4",
    name: "Liza Bautista",
    email: "liza.bautista@nephoraforge.com",
    phone: "0917-444-9876",
    role: "Safety Officer",
    department: "Safety",
    status: "Active",
    assignedProjects: ["Cebu Coastal Road Expansion"],
    joinDate: "2020-06-01",
    lastActive: "1 hour ago",
    location: "Cebu Site",
    monthlyCost: 1200,
    isOnline: true,
    mfaEnabled: true,
    timezone: "Asia/Manila",
    certifications: [
      { name: "First Aid Certification", issuer: "Red Cross", expiryDate: "2027-01-30", status: "Valid" },
      { name: "Safety Officer License", issuer: "DOLE", expiryDate: "2025-08-15", status: "Valid" }
    ],
    permissions: ["safety_compliance", "incident_reports", "training_management"],
    notificationPreferences: {
      email: true,
      sms: true,
      inApp: true,
      projectUpdates: false,
      safetyAlerts: true,
      qualityReports: false
    },
    performanceMetrics: {
      tasksCompleted: 156,
      inspectionsCompleted: 67,
      milestonesAchieved: 12,
      safetyScore: 99,
      qualityScore: 85
    }
  },
  {
    id: "5",
    name: "Pete Katigbak",
    email: "ricardo.bautista@nephoraforge.com",
    phone: "0919-777-2341",
    role: "Equipment Operator",
    department: "Operations",
    status: "On Leave",
    assignedProjects: ["NLEX Extension"],
    joinDate: "2023-02-14",
    lastActive: "3 days ago",
    location: "Bulacan Site",
    monthlyCost: 750,
    isOnline: false,
    mfaEnabled: false,
    timezone: "Asia/Manila",
    certifications: [
      { name: "Heavy Equipment License", issuer: "TESDA", expiryDate: "2025-11-20", status: "Valid" },
      { name: "Crane Operator Certification", issuer: "NCCCO", expiryDate: "2024-09-30", status: "Expiring Soon" }
    ],
    permissions: ["equipment_management", "maintenance_logs"],
    notificationPreferences: {
      email: false,
      sms: true,
      inApp: true,
      projectUpdates: true,
      safetyAlerts: true,
      qualityReports: false
    },
    performanceMetrics: {
      tasksCompleted: 78,
      inspectionsCompleted: 5,
      milestonesAchieved: 6,
      safetyScore: 92,
      qualityScore: 87
    }
  },
  {
    id: "6",
    name: "Grace Morales",
    email: "grace.morales@nephoraforge.com",
    phone: "0922-888-4567",
    role: "Site Foreman",
    department: "Operations",
    status: "Active",
    assignedProjects: ["BGC Residential Tower", "Alabang Commercial Complex"],
    joinDate: "2021-11-05",
    lastActive: "45 minutes ago",
    location: "BGC Site",
    monthlyCost: 1100,
    isOnline: true,
    mfaEnabled: true,
    timezone: "Asia/Manila",
    certifications: [
      { name: "Construction Supervisor License", issuer: "PCAB", expiryDate: "2025-04-15", status: "Valid" },
      { name: "DOLE Safety Training", issuer: "DOLE", expiryDate: "2024-12-31", status: "Valid" }
    ],
    permissions: ["site_management", "personnel_oversight", "progress_reports"],
    notificationPreferences: {
      email: true,
      sms: true,
      inApp: true,
      projectUpdates: true,
      safetyAlerts: true,
      qualityReports: true
    },
    performanceMetrics: {
      tasksCompleted: 203,
      inspectionsCompleted: 34,
      milestonesAchieved: 18,
      safetyScore: 96,
      qualityScore: 91
    }
  }
]

const mockRoles: Role[] = [
  {
    name: "Administrator",
    permissions: ["full_access", "user_management", "system_configuration", "billing_management"],
    monthlyCost: 2000,
    description: "Complete system access and administrative privileges",
    userCount: 3
  },
  {
    name: "Project Manager",
    permissions: ["project_management", "team_oversight", "financial_reports", "resource_allocation"],
    monthlyCost: 1500,
    description: "Manage projects, teams, and budgets",
    userCount: 8
  },
  {
    name: "Site Engineer",
    permissions: ["engineering_tools", "technical_reports", "project_access", "quality_control"],
    monthlyCost: 1000,
    description: "Technical engineering and site supervision",
    userCount: 12
  },
  {
    name: "Site Foreman",
    permissions: ["site_management", "personnel_oversight", "progress_reports", "safety_compliance"],
    monthlyCost: 1100,
    description: "On-site operations and team coordination",
    userCount: 6
  },
  {
    name: "Safety Officer",
    permissions: ["safety_compliance", "incident_reports", "training_management", "audit_logs"],
    monthlyCost: 1200,
    description: "Safety oversight and compliance management",
    userCount: 4
  },
  {
    name: "Quality Inspector",
    permissions: ["quality_control", "compliance_reports", "material_testing", "inspection_logs"],
    monthlyCost: 800,
    description: "Quality assurance and material inspection",
    userCount: 7
  },
  {
    name: "Equipment Operator",
    permissions: ["equipment_management", "maintenance_logs", "operational_reports"],
    monthlyCost: 750,
    description: "Equipment operation and maintenance",
    userCount: 15
  }
]

const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    user: "John dela Cruz",
    action: "Logged in",
    timestamp: "Aug 26, 2025, 9:15 AM",
    details: "Successful login from IP 192.168.1.100",
    category: "Login"
  },
  {
    id: "2",
    user: "Maria Santos",
    action: "Updated Equipment Inventory",
    timestamp: "Aug 25, 2025, 4:30 PM",
    details: "Modified heavy machinery status for Taguig Business Park",
    category: "Update"
  },
  {
    id: "3",
    user: "Liza Bautista", 
    action: "Approved Safety Checklist",
    timestamp: "Aug 20, 2025, 3:00 PM",
    details: "Approved weekly safety inspection for Cebu site",
    category: "Approval"
  },
  {
    id: "4",
    user: "Grace Morales",
    action: "Updated Project Milestone",
    timestamp: "Aug 24, 2025, 10:45 AM",
    details: "Marked foundation milestone as completed for BGC Tower",
    category: "Update"
  },
  {
    id: "5",
    user: "Carlos Ramirez",
    action: "Failed Login Attempt",
    timestamp: "Aug 1, 2025, 8:30 AM",
    details: "Multiple failed login attempts before suspension",
    category: "Security"
  }
]

const mockPendingInvites: PendingInvite[] = [
  {
    id: "1",
    email: "ana.villanueva@email.com",
    role: "Site Foreman",
    invitedBy: "John dela Cruz",
    inviteDate: "Aug 20, 2025",
    status: "Pending"
  },
  {
    id: "2",
    email: "roberto.santos@email.com",
    role: "Quality Inspector",
    invitedBy: "Admin User",
    inviteDate: "Aug 18, 2025",
    status: "Pending"
  },
  {
    id: "3",
    email: "elena.reyes@email.com",
    role: "Safety Officer",
    invitedBy: "Liza Bautista",
    inviteDate: "Aug 15, 2025",
    status: "Expired"
  }
]

export function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showInviteUser, setShowInviteUser] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Calculate summary metrics
  const totalUsers = mockUsers.length
  const activeUsers = mockUsers.filter(u => u.status === "Active").length
  const totalMonthlyCost = mockUsers.reduce((sum, user) => sum + user.monthlyCost, 0)
  const usersWithExpiredCerts = mockUsers.filter(u => 
    u.certifications.some(cert => cert.status === "Expired")
  ).length
  const onlineUsers = mockUsers.filter(u => u.isOnline).length
  const mfaEnabledUsers = mockUsers.filter(u => u.mfaEnabled).length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "On Leave": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Suspended": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Archived": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Accepted": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Expired": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Valid": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Expiring Soon": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" 
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, permissions, and access control
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowInviteUser(true)}
          >
            <Mail className="h-4 w-4 mr-2" />
            Invite User
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600" 
            onClick={() => setShowAddUser(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Summary Dashboard */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Cost</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalMonthlyCost)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold text-green-600">{onlineUsers}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">MFA Enabled</p>
                <p className="text-2xl font-bold text-purple-600">{mfaEnabledUsers}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cert. Issues</p>
                <p className="text-2xl font-bold text-red-600">{usersWithExpiredCerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="directory">Directory</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="invites">Invites</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* User Directory Tab */}
        <TabsContent value="directory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Searchable and filterable list of all system users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Projects</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedUser(user)}>
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={user.profileImage} />
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              {user.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span>{user.role}</span>
                            {user.mfaEnabled && <ShieldCheck className="h-4 w-4 text-green-500" />}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {user.assignedProjects.slice(0, 2).map((project, index) => (
                              <div key={index} className="truncate max-w-32">{project}</div>
                            ))}
                            {user.assignedProjects.length > 2 && (
                              <div className="text-muted-foreground">+{user.assignedProjects.length - 2} more</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{user.phone}</div>
                            <div className="text-muted-foreground">{user.location}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{formatCurrency(user.monthlyCost)}</div>
                          <div className="text-xs text-muted-foreground">per month</div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              {user.status === "Active" ? (
                                <DropdownMenuItem>
                                  <UserX className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions Management</CardTitle>
              <CardDescription>Manage predefined roles and create custom permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">System Roles</h3>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Custom Role
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {mockRoles.map((role, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center space-x-2">
                            <Crown className="h-5 w-5 text-orange-500" />
                            <span>{role.name}</span>
                          </CardTitle>
                          <Badge variant="outline">{role.userCount} users</Badge>
                        </div>
                        <CardDescription className="text-sm">{role.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Monthly Cost:</span>
                          <span className="font-medium text-orange-600">{formatCurrency(role.monthlyCost)}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Permissions:</span>
                          <div className="mt-2 space-y-1">
                            {role.permissions.slice(0, 3).map((permission, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span className="text-xs capitalize">{permission.replace('_', ' ')}</span>
                              </div>
                            ))}
                            {role.permissions.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{role.permissions.length - 3} more permissions
                              </div>
                            )}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Assignments Matrix</CardTitle>
              <CardDescription>User-to-project mapping and resource allocation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Assigned Projects</TableHead>
                      <TableHead>Workload</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.filter(u => u.status === "Active").map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {user.assignedProjects.map((project, index) => (
                              <Badge key={index} variant="outline" className="mr-1 mb-1">
                                {project}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{user.assignedProjects.length} project{user.assignedProjects.length !== 1 ? 's' : ''}</div>
                            <Progress value={user.assignedProjects.length * 25} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">Tasks: {user.performanceMetrics.tasksCompleted}</div>
                            <div className="text-sm">Quality: {user.performanceMetrics.qualityScore}%</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Reassign
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments & Teams Tab */}
        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>Team structure and hierarchy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Engineering", "Safety", "Quality", "Operations", "Finance"].map(dept => {
                  const deptUsers = mockUsers.filter(u => u.department === dept)
                  const activeUsers = deptUsers.filter(u => u.status === "Active").length
                  
                  return (
                    <div key={dept} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Building className="h-5 w-5 text-orange-500" />
                          <span className="font-medium">{dept}</span>
                        </div>
                        <Badge variant="outline">{deptUsers.length} members</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Active:</span>
                          <span className="font-medium">{activeUsers}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Cost:</span>
                          <span className="font-medium">
                            {formatCurrency(deptUsers.reduce((sum, user) => sum + user.monthlyCost, 0))}
                          </span>
                        </div>
                        <Progress value={(activeUsers / deptUsers.length) * 100} className="h-2" />
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Leads & Hierarchy</CardTitle>
                <CardDescription>Organizational structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Crown className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">Engineering Department</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <PersonStanding className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">John dela Cruz - Project Manager</span>
                      </div>
                      <div className="ml-4 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          <span className="text-sm text-muted-foreground">Maria Santos - Site Engineer</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Safety Department</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex items-center space-x-2">
                        <PersonStanding className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Liza Bautista - Safety Officer</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Hammer className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Operations Department</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      <div className="flex items-center space-x-2">
                        <PersonStanding className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Grace Morales - Site Foreman</span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          <span className="text-sm text-muted-foreground">Pete Katigbak - Equipment Operator</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Logs</CardTitle>
              <CardDescription>Track user actions, logins, and system changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="Login">Login Events</SelectItem>
                      <SelectItem value="Update">Updates</SelectItem>
                      <SelectItem value="Approval">Approvals</SelectItem>
                      <SelectItem value="Security">Security Events</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActivityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{log.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{log.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            log.category === "Security" ? "border-red-200 text-red-800" :
                            log.category === "Approval" ? "border-green-200 text-green-800" :
                            log.category === "Login" ? "border-blue-200 text-blue-800" :
                            "border-gray-200 text-gray-800"
                          }>
                            {log.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>Multi-factor authentication and access control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-4 border rounded-lg">
                    <Shield className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">{mfaEnabledUsers}</div>
                    <p className="text-sm text-muted-foreground">MFA Enabled</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Lock className="h-8 w-8 mx-auto text-red-500 mb-2" />
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-sm text-muted-foreground">Locked Accounts</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Recent Security Events</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-red-50 dark:bg-red-950/20">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Failed Login Attempts</p>
                        <p className="text-xs text-muted-foreground">Carlos Ramirez - 5 attempts</p>
                      </div>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Shield className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">MFA Setup</p>
                        <p className="text-xs text-muted-foreground">Grace Morales enabled 2FA</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Security Settings</CardTitle>
                <CardDescription>Password policies and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require MFA for new users</span>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-lock after failed attempts</span>
                    <Switch checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password expiry (90 days)</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session timeout (8 hours)</span>
                    <Switch checked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Access Control</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>IP Whitelist:</span>
                      <span className="font-medium">5 addresses</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Failed Login Threshold:</span>
                      <span className="font-medium">5 attempts</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Password Reset Requests:</span>
                      <span className="font-medium">3 this week</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Invitations Tab */}
        <TabsContent value="invites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Invitations & Onboarding</CardTitle>
              <CardDescription>Manage pending invites and new user onboarding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Pending Invitations</h3>
                  <Button 
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => setShowInviteUser(true)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Invited By</TableHead>
                      <TableHead>Date Sent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPendingInvites.map((invite) => (
                      <TableRow key={invite.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{invite.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>{invite.role}</TableCell>
                        <TableCell>{invite.invitedBy}</TableCell>
                        <TableCell>{invite.inviteDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invite.status)}>
                            {invite.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Resend
                            </Button>
                            <Button variant="outline" size="sm">
                              <UserX className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Onboarding Progress</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Ana Villanueva</p>
                          <p className="text-sm text-muted-foreground">Site Foreman</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">60% Complete</div>
                        <Progress value={60} className="w-24 h-2 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Cost Allocation</CardTitle>
                <CardDescription>Monthly licensing costs and billing breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <DollarSign className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalMonthlyCost)}</div>
                  <p className="text-sm text-muted-foreground">Total Monthly Cost</p>
                  <p className="text-xs text-muted-foreground mt-1">{activeUsers} Active Users</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Cost by Role</h4>
                  {mockRoles.map((role, index) => {
                    const roleUsers = mockUsers.filter(u => u.role === role.name)
                    const roleCost = roleUsers.reduce((sum, user) => sum + user.monthlyCost, 0)
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{role.name}</p>
                          <p className="text-sm text-muted-foreground">{roleUsers.length} user{roleUsers.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(roleCost)}</p>
                          <p className="text-xs text-muted-foreground">per month</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role Upgrade Requests</CardTitle>
                <CardDescription>Pending role changes and cost impacts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="border rounded-lg p-3 bg-yellow-50 dark:bg-yellow-950/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Ana Villanueva</p>
                          <p className="text-sm text-muted-foreground">Current: Site Foreman</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Requested: Project Manager</p>
                        <p className="text-xs text-muted-foreground">Cost Impact: +{formatCurrency(400)}/month</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          <UserX className="h-4 w-4 mr-2" />
                          Deny
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium">Billing History</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>January 2025:</span>
                      <span className="font-medium">{formatCurrency(51000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>February 2025:</span>
                      <span className="font-medium">{formatCurrency(52500)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>March 2025:</span>
                      <span className="font-medium">{formatCurrency(52500)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-sm font-medium">
                      <span>Average Monthly:</span>
                      <span>{formatCurrency(52000)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Profile Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>User Profile - {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              Complete user information and system access details
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedUser.profileImage} />
                    <AvatarFallback className="text-lg">
                      {selectedUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedUser.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <Badge className={getStatusColor(selectedUser.status)}>
                      {selectedUser.status}
                    </Badge>
                    {selectedUser.mfaEnabled && <ShieldCheck className="h-5 w-5 text-green-500" />}
                  </div>
                  <p className="text-muted-foreground">{selectedUser.role} • {selectedUser.department}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{selectedUser.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{selectedUser.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-orange-600">
                    {formatCurrency(selectedUser.monthlyCost)}
                  </div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Join Date:</span>
                      <span className="text-sm">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Last Active:</span>
                      <span className="text-sm">{selectedUser.lastActive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm">{selectedUser.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Timezone:</span>
                      <span className="text-sm">{selectedUser.timezone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tasks Completed:</span>
                      <span className="text-sm font-medium">{selectedUser.performanceMetrics.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Inspections:</span>
                      <span className="text-sm font-medium">{selectedUser.performanceMetrics.inspectionsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Safety Score:</span>
                      <span className="text-sm font-medium">{selectedUser.performanceMetrics.safetyScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Quality Score:</span>
                      <span className="text-sm font-medium">{selectedUser.performanceMetrics.qualityScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Assigned Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.assignedProjects.map((project, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Certifications & Training</h4>
                <div className="space-y-2">
                  {selectedUser.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(cert.status)}>
                          {cert.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline">
                  <Key className="h-4 w-4 mr-2" />
                  Reset Password
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Permissions
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Invite User Dialog */}
      <Dialog open={showInviteUser} onOpenChange={setShowInviteUser}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>
              Send an invitation to join NephoraForge construction management system
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input id="invite-email" type="email" placeholder="user@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {mockRoles.map(role => (
                    <SelectItem key={role.name} value={role.name}>
                      {role.name} - {formatCurrency(role.monthlyCost)}/month
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-message">Personal Message (Optional)</Label>
              <Textarea id="invite-message" placeholder="Welcome to the team..." />
            </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Mail className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
              <Button variant="outline" onClick={() => setShowInviteUser(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}