import React, { useState } from "react"
import { 
  Settings, 
  Activity, 
  Database, 
  Shield, 
  Calendar, 
  Download, 
  Play, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Server, 
  HardDrive, 
  Wifi, 
  Globe, 
  FileText, 
  Filter, 
  Search, 
  MoreHorizontal,
  ChevronRight,
  Home,
  Users,
  Zap,
  AlertCircle,
  X,
  CheckCircle2,
  XCircle,
  Timer,
  User,
  Archive,
  RotateCcw,
  Code,
  Cpu,
  CloudDownload,
  PlayCircle,
  StopCircle,
  Edit,
  Trash2,
  Plus,
  Eye,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Gauge,
  Monitor,
  Bug,
  Wrench,
  ChevronDown,
  Building
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Progress } from "./ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Separator } from "./ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"

interface MaintenanceTask {
  id: string
  task: string
  scheduledDate: string
  duration: string
  responsibleAdmin: string
  status: "Scheduled" | "In Progress" | "Completed" | "Failed"
  description: string
  priority: "High" | "Medium" | "Low"
}

interface BackupRecord {
  id: string
  date: string
  type: "Full" | "Incremental" | "Manual"
  size: string
  triggeredBy: string
  status: "Success" | "Failed" | "In Progress"
  downloadUrl?: string
}

interface AuditLog {
  id: string
  user: string
  action: string
  timestamp: string
  details: string
  ipAddress: string
  category: "Settings" | "Backup" | "Security" | "System" | "User"
}

interface AutomationJob {
  id: string
  name: string
  description: string
  schedule: string
  lastRun: string
  status: "Success" | "Failed" | "Running" | "Disabled"
  impact: string
  nextRun: string
}

const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: "1",
    task: "Database Optimization",
    scheduledDate: "Aug 28, 2025",
    duration: "1 hr",
    responsibleAdmin: "Maria Santos",
    status: "Scheduled",
    description: "Quarterly database index optimization and cleanup",
    priority: "High"
  },
  {
    id: "2", 
    task: "SSL Certificate Renewal",
    scheduledDate: "Sep 15, 2025",
    duration: "30 min",
    responsibleAdmin: "John dela Cruz",
    status: "Scheduled",
    description: "Renew SSL certificates for all domains",
    priority: "High"
  },
  {
    id: "3",
    task: "Server Patches",
    scheduledDate: "Aug 25, 2025",
    duration: "2 hrs",
    responsibleAdmin: "Carlos Ramirez",
    status: "Completed",
    description: "Apply latest security patches to production servers",
    priority: "Medium"
  },
  {
    id: "4",
    task: "Log Archive Cleanup",
    scheduledDate: "Aug 30, 2025",
    duration: "45 min",
    responsibleAdmin: "Liza Bautista",
    status: "Scheduled",
    description: "Archive and compress old application logs",
    priority: "Low"
  },
  {
    id: "5",
    task: "Performance Monitoring Setup",
    scheduledDate: "Aug 22, 2025",
    duration: "3 hrs",
    responsibleAdmin: "Carlo Mendoza",
    status: "Failed",
    description: "Install and configure APM monitoring tools",
    priority: "Medium"
  }
]

const mockBackupRecords: BackupRecord[] = [
  {
    id: "1",
    date: "Aug 25, 2025, 2:01 AM",
    type: "Full",
    size: "2.3 GB",
    triggeredBy: "Automated System",
    status: "Success",
    downloadUrl: "/backups/full-20250825.zip"
  },
  {
    id: "2",
    date: "Aug 24, 2025, 2:01 AM", 
    type: "Incremental",
    size: "245 MB",
    triggeredBy: "Automated System",
    status: "Success"
  },
  {
    id: "3",
    date: "Aug 23, 2025, 4:30 PM",
    type: "Manual",
    size: "1.8 GB",
    triggeredBy: "John dela Cruz",
    status: "Success"
  },
  {
    id: "4",
    date: "Aug 23, 2025, 2:01 AM",
    type: "Incremental", 
    size: "198 MB",
    triggeredBy: "Automated System",
    status: "Failed"
  },
  {
    id: "5",
    date: "Aug 22, 2025, 2:01 AM",
    type: "Full",
    size: "2.1 GB",
    triggeredBy: "Automated System",
    status: "Success"
  }
]

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    user: "Carlos Ramirez",
    action: "Updated system settings",
    timestamp: "Aug 25, 2025, 3:45 PM",
    details: "Modified backup retention policy from 30 to 90 days",
    ipAddress: "192.168.1.105",
    category: "Settings"
  },
  {
    id: "2",
    user: "Liza Bautista", 
    action: "Restored backup from Aug 10",
    timestamp: "Aug 24, 2025, 10:30 AM",
    details: "Performed point-in-time restore for project data recovery",
    ipAddress: "192.168.1.112",
    category: "Backup"
  },
  {
    id: "3",
    user: "Maria Santos",
    action: "Failed login attempt",
    timestamp: "Aug 24, 2025, 8:15 AM",
    details: "Multiple failed login attempts detected, account temporarily locked",
    ipAddress: "203.129.45.67",
    category: "Security"
  },
  {
    id: "4",
    user: "Carlo Mendoza",
    action: "System diagnostics completed",
    timestamp: "Aug 23, 2025, 11:20 PM",
    details: "Ran comprehensive system health check, all services operational",
    ipAddress: "192.168.1.108",
    category: "System"
  },
  {
    id: "5",
    user: "Ana Villanueva",
    action: "User permissions updated",
    timestamp: "Aug 23, 2025, 2:45 PM",
    details: "Added budget approval permissions for new project manager",
    ipAddress: "192.168.1.115",
    category: "User"
  }
]

const mockAutomationJobs: AutomationJob[] = [
  {
    id: "1",
    name: "Nightly Data Sync",
    description: "Synchronize project data with external systems",
    schedule: "Daily at 1:00 AM",
    lastRun: "Aug 25, 2025, 1:00 AM",
    status: "Success",
    impact: "₱0.00",
    nextRun: "Aug 26, 2025, 1:00 AM"
  },
  {
    id: "2",
    name: "Cleanup Old Logs",
    description: "Remove log files older than 90 days",
    schedule: "Weekly on Sundays",
    lastRun: "Aug 24, 2025, 3:00 AM",
    status: "Failed",
    impact: "₱0.00",
    nextRun: "Aug 31, 2025, 3:00 AM"
  },
  {
    id: "3",
    name: "Database Maintenance",
    description: "Update statistics and rebuild indexes",
    schedule: "Monthly on 1st",
    lastRun: "Aug 1, 2025, 2:00 AM",
    status: "Success", 
    impact: "₱0.00",
    nextRun: "Sep 1, 2025, 2:00 AM"
  },
  {
    id: "4",
    name: "Security Scan",
    description: "Automated vulnerability assessment",
    schedule: "Daily at 11:00 PM",
    lastRun: "Aug 24, 2025, 11:00 PM",
    status: "Success",
    impact: "₱0.00",
    nextRun: "Aug 25, 2025, 11:00 PM"
  },
  {
    id: "5",
    name: "Backup Verification",
    description: "Verify integrity of backup files",
    schedule: "Daily at 6:00 AM",
    lastRun: "Aug 25, 2025, 6:00 AM",
    status: "Running",
    impact: "₱0.00",
    nextRun: "Aug 26, 2025, 6:00 AM"
  }
]

export function SystemMaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "In Progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Completed": 
      case "Success": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Failed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Running": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Disabled": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success":
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Failed": return <XCircle className="h-4 w-4 text-red-500" />
      case "Running":
      case "In Progress": return <Timer className="h-4 w-4 text-orange-500" />
      case "Scheduled": return <Clock className="h-4 w-4 text-blue-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  // Calculate system health metrics
  const uptimePercentage = 99.98
  const activeIntegrations = 5
  const totalIntegrations = 6
  const storageUsed = 85
  const storageTotal = 500

  const filteredAuditLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || log.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center space-x-1">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>Administration</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center space-x-1">
                <Settings className="h-4 w-4" />
                <span>Maintenance</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-orange-800 dark:text-orange-200">System Maintenance</h1>
            <p className="text-muted-foreground">
              Platform-level upkeep, monitoring, and system administration
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bug className="h-4 w-4 mr-2" />
              Run Diagnostics
            </Button>
            <Button variant="outline" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Schedule Backup
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <BookOpen className="h-4 w-4 mr-2" />
              View Changelog
            </Button>
          </div>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="space-y-4">
        <h2 className="text-orange-800 dark:text-orange-200">System Health Overview</h2>
        
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Server Uptime</p>
                  <p className="text-2xl font-bold text-green-600">{uptimePercentage}%</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
                <Server className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Integrations</p>
                  <p className="text-2xl font-bold text-blue-600">{activeIntegrations}</p>
                  <p className="text-xs text-muted-foreground">of {totalIntegrations} total</p>
                </div>
                <Wifi className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Downtime</p>
                  <p className="text-2xl font-bold text-red-600">Aug 15</p>
                  <p className="text-xs text-muted-foreground">2 hours duration</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Storage Usage</p>
                  <p className="text-2xl font-bold text-orange-600">{storageUsed}%</p>
                  <p className="text-xs text-muted-foreground">{storageUsed * storageTotal / 100}GB / {storageTotal}GB</p>
                </div>
                <HardDrive className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Indicators */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">API Connections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Gateway</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Processor</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Service</span>
                <Badge className="bg-red-100 text-red-800">Disconnected</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cloud Storage</span>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Database Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Connection Pool</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Query Performance</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Optimal</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Index Usage</span>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Needs Optimization</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup Status</span>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Up to Date</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Storage Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Application Data:</span>
                  <span>245 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>User Uploads:</span>
                  <span>89 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Database:</span>
                  <span>67 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Backups:</span>
                  <span>24 GB</span>
                </div>
                <Separator />
                <div className="space-y-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Used:</span>
                    <span>{storageUsed * storageTotal / 100} GB</span>
                  </div>
                  <Progress value={storageUsed} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scheduled Maintenance & Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Scheduled Maintenance & Updates</span>
          </CardTitle>
          <CardDescription>Upcoming and completed maintenance tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Task
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Maintenance Task</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Responsible Admin</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMaintenanceTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{task.task}</div>
                        <div className="text-sm text-muted-foreground">{task.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{task.scheduledDate}</TableCell>
                    <TableCell>{task.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {task.responsibleAdmin.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.responsibleAdmin}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Task
                          </DropdownMenuItem>
                          {task.status === "Scheduled" && (
                            <DropdownMenuItem>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Start Now
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Cancel Task
                          </DropdownMenuItem>
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

      {/* Backup & Restore Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Backup & Restore Panel</span>
          </CardTitle>
          <CardDescription>Backup history and restore operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <CloudDownload className="h-4 w-4 mr-2" />
                  Download Latest Backup
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Recurring
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Last backup: Aug 25, 2025, 2:01 AM
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Triggered By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBackupRecords.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell>{backup.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        backup.type === "Full" ? "border-blue-200 text-blue-800" :
                        backup.type === "Incremental" ? "border-green-200 text-green-800" :
                        "border-orange-200 text-orange-800"
                      }>
                        {backup.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {backup.triggeredBy === "Automated System" ? (
                          <Cpu className="h-4 w-4 text-gray-500" />
                        ) : (
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {backup.triggeredBy.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <span className="text-sm">{backup.triggeredBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(backup.status)}
                        <Badge className={getStatusColor(backup.status)}>
                          {backup.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {backup.downloadUrl && backup.status === "Success" && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        {backup.status === "Success" && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Restore
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Security & Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security & Audit Logs</span>
          </CardTitle>
          <CardDescription>Recent administrative actions and security events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Settings">Settings</SelectItem>
                  <SelectItem value="Backup">Backup</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {log.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{log.user}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        log.category === "Security" ? "border-red-200 text-red-800" :
                        log.category === "Backup" ? "border-blue-200 text-blue-800" :
                        log.category === "Settings" ? "border-orange-200 text-orange-800" :
                        log.category === "User" ? "border-green-200 text-green-800" :
                        "border-gray-200 text-gray-800"
                      }>
                        {log.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    <TableCell className="max-w-xs truncate" title={log.details}>
                      {log.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Automation & Scripts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Automation & Scripts</span>
          </CardTitle>
          <CardDescription>Scheduled jobs and automated system tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Job
                </Button>
                <Button variant="outline" size="sm">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Run All
                </Button>
              </div>
              <Alert className="w-auto">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  2 jobs failed in the last 24 hours
                </AlertDescription>
              </Alert>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Last Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAutomationJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{job.name}</div>
                        <div className="text-sm text-muted-foreground">{job.description}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{job.schedule}</TableCell>
                    <TableCell className="text-sm">{job.lastRun}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(job.status)}
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{job.impact}</TableCell>
                    <TableCell className="text-sm">{job.nextRun}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Logs
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Schedule
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {job.status === "Disabled" ? (
                                <>
                                  <PlayCircle className="mr-2 h-4 w-4" />
                                  Enable Job
                                </>
                              ) : (
                                <>
                                  <StopCircle className="mr-2 h-4 w-4" />
                                  Disable Job
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}