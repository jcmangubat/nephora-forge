import React, { useState } from "react"
import { 
  BarChart3, 
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
  Users,
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
  CalendarDays
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
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  Area,
  AreaChart
} from "recharts"

interface ProjectMetrics {
  id: string
  name: string
  progress: number
  budgetUsed: number
  budgetTotal: number
  timeElapsed: number
  timeTotal: number
  milestonesCompleted: number
  milestonesTotal: number
  status: "On Track" | "At Risk" | "Delayed" | "Completed"
  teamSize: number
  safetyScore: number
  qualityScore: number
}

interface PersonnelUtilization {
  id: string
  name: string
  role: string
  utilization: number
  hoursWorked: number
  hoursCapacity: number
  projects: string[]
  status: "Optimal" | "Overloaded" | "Underutilized"
}

interface FinancialData {
  month: string
  budgeted: number
  actual: number
  forecast: number
  variance: number
}

interface SafetyMetrics {
  date: string
  incidents: number
  nearMisses: number
  inspections: number
  complianceScore: number
}

interface QualityMetrics {
  date: string
  ncrs: number
  resolved: number
  pending: number
  qualityScore: number
}

const mockProjectMetrics: ProjectMetrics[] = [
  {
    id: "1",
    name: "Makati CBD Office Complex",
    progress: 75,
    budgetUsed: 750000000,
    budgetTotal: 1000000000,
    timeElapsed: 18,
    timeTotal: 24,
    milestonesCompleted: 15,
    milestonesTotal: 20,
    status: "On Track",
    teamSize: 45,
    safetyScore: 95,
    qualityScore: 88
  },
  {
    id: "2",
    name: "Skyway Bridge Extension",
    progress: 60,
    budgetUsed: 425000000,
    budgetTotal: 600000000,
    timeElapsed: 15,
    timeTotal: 20,
    milestonesCompleted: 8,
    milestonesTotal: 15,
    status: "At Risk",
    teamSize: 32,
    safetyScore: 92,
    qualityScore: 85
  },
  {
    id: "3",
    name: "BGC Residential Tower",
    progress: 45,
    budgetUsed: 600000000,
    budgetTotal: 1250000000,
    timeElapsed: 12,
    timeTotal: 30,
    milestonesCompleted: 9,
    milestonesTotal: 25,
    status: "On Track",
    teamSize: 28,
    safetyScore: 98,
    qualityScore: 92
  },
  {
    id: "4",
    name: "NAIA Terminal Expansion",
    progress: 90,
    budgetUsed: 1400000000,
    budgetTotal: 1500000000,
    timeElapsed: 22,
    timeTotal: 24,
    milestonesCompleted: 18,
    milestonesTotal: 20,
    status: "On Track",
    teamSize: 55,
    safetyScore: 96,
    qualityScore: 94
  }
]

const mockPersonnelUtilization: PersonnelUtilization[] = [
  {
    id: "1",
    name: "John dela Cruz",
    role: "Site Foreman",
    utilization: 95,
    hoursWorked: 38,
    hoursCapacity: 40,
    projects: ["Makati CBD Office Complex", "BGC Residential Tower"],
    status: "Optimal"
  },
  {
    id: "2",
    name: "Maria Santos",
    role: "Safety Inspector",
    utilization: 125,
    hoursWorked: 50,
    hoursCapacity: 40,
    projects: ["Skyway Bridge Extension", "NAIA Terminal Expansion", "Makati CBD Office Complex"],
    status: "Overloaded"
  },
  {
    id: "3",
    name: "Pete Katigbak",
    role: "Equipment Operator",
    utilization: 45,
    hoursWorked: 18,
    hoursCapacity: 40,
    projects: ["Skyway Bridge Extension"],
    status: "Underutilized"
  }
]

const mockFinancialData: FinancialData[] = [
  { month: "Jan", budgeted: 250000000, actual: 240000000, forecast: 242500000, variance: -10000000 },
  { month: "Feb", budgeted: 275000000, actual: 260000000, forecast: 265000000, variance: -15000000 },
  { month: "Mar", budgeted: 300000000, actual: 305000000, forecast: 302500000, variance: 5000000 },
  { month: "Apr", budgeted: 325000000, actual: 340000000, forecast: 335000000, variance: 15000000 },
  { month: "May", budgeted: 350000000, actual: 345000000, forecast: 355000000, variance: -5000000 },
  { month: "Jun", budgeted: 375000000, actual: 380000000, forecast: 377500000, variance: 5000000 }
]

const mockSafetyMetrics: SafetyMetrics[] = [
  { date: "Jan", incidents: 2, nearMisses: 5, inspections: 15, complianceScore: 95 },
  { date: "Feb", incidents: 1, nearMisses: 3, inspections: 18, complianceScore: 97 },
  { date: "Mar", incidents: 0, nearMisses: 2, inspections: 20, complianceScore: 98 },
  { date: "Apr", incidents: 3, nearMisses: 7, inspections: 16, complianceScore: 92 },
  { date: "May", incidents: 1, nearMisses: 4, inspections: 19, complianceScore: 96 },
  { date: "Jun", incidents: 2, nearMisses: 6, inspections: 17, complianceScore: 94 }
]

const mockQualityMetrics: QualityMetrics[] = [
  { date: "Jan", ncrs: 8, resolved: 6, pending: 2, qualityScore: 88 },
  { date: "Feb", ncrs: 5, resolved: 4, pending: 1, qualityScore: 92 },
  { date: "Mar", ncrs: 3, resolved: 3, pending: 0, qualityScore: 95 },
  { date: "Apr", ncrs: 7, resolved: 5, pending: 2, qualityScore: 89 },
  { date: "May", ncrs: 4, resolved: 3, pending: 1, qualityScore: 91 },
  { date: "Jun", ncrs: 6, resolved: 4, pending: 2, qualityScore: 87 }
]

const COLORS = ['#ea580c', '#f97316', '#fb923c', '#fed7aa', '#ffedd5']

export function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedProjects, setSelectedProjects] = useState<string[]>(["all"])
  const [showCustomReportBuilder, setShowCustomReportBuilder] = useState(false)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])

  // Calculate overall KPIs
  const totalProjects = mockProjectMetrics.length
  const avgProgress = Math.round(mockProjectMetrics.reduce((sum, p) => sum + p.progress, 0) / totalProjects)
  const totalBudget = mockProjectMetrics.reduce((sum, p) => sum + p.budgetTotal, 0)
  const totalSpent = mockProjectMetrics.reduce((sum, p) => sum + p.budgetUsed, 0)
  const budgetUtilization = Math.round((totalSpent / totalBudget) * 100)
  const onTimeProjects = mockProjectMetrics.filter(p => p.status === "On Track").length
  const avgSafetyScore = Math.round(mockProjectMetrics.reduce((sum, p) => sum + p.safetyScore, 0) / totalProjects)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "At Risk": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Delayed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Completed": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Optimal": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Overloaded": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Underutilized": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
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

  const exportReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Implementation for export functionality
    console.log(`Exporting report in ${format} format`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive project insights, analytics, and performance reporting
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportReport('pdf')}>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportReport('excel')}>
                <FileText className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportReport('csv')}>
                <FileText className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            className="bg-orange-500 hover:bg-orange-600" 
            onClick={() => setShowCustomReportBuilder(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Project Progress</p>
                <p className="text-2xl font-bold text-blue-600">{avgProgress}%</p>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +5% from last month
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
                <p className="text-sm text-muted-foreground">Budget Utilization</p>
                <p className="text-2xl font-bold text-green-600">{budgetUtilization}%</p>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On-Time Projects</p>
                <p className="text-2xl font-bold text-orange-600">{onTimeProjects}/{totalProjects}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round((onTimeProjects / totalProjects) * 100)}% on schedule
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Safety Score</p>
                <p className="text-2xl font-bold text-green-600">{avgSafetyScore}%</p>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +2% improvement
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Progress Trends</CardTitle>
                <CardDescription>Progress tracking over time for all active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={mockFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="actual" stroke="#ea580c" strokeWidth={2} />
                    <Line type="monotone" dataKey="budgeted" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Status Distribution</CardTitle>
                <CardDescription>Current status breakdown of all projects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'On Track', value: mockProjectMetrics.filter(p => p.status === 'On Track').length, color: '#22c55e' },
                        { name: 'At Risk', value: mockProjectMetrics.filter(p => p.status === 'At Risk').length, color: '#eab308' },
                        { name: 'Delayed', value: mockProjectMetrics.filter(p => p.status === 'Delayed').length, color: '#ef4444' },
                        { name: 'Completed', value: mockProjectMetrics.filter(p => p.status === 'Completed').length, color: '#3b82f6' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: 'On Track', value: mockProjectMetrics.filter(p => p.status === 'On Track').length, color: '#22c55e' },
                        { name: 'At Risk', value: mockProjectMetrics.filter(p => p.status === 'At Risk').length, color: '#eab308' },
                        { name: 'Delayed', value: mockProjectMetrics.filter(p => p.status === 'Delayed').length, color: '#ef4444' },
                        { name: 'Completed', value: mockProjectMetrics.filter(p => p.status === 'Completed').length, color: '#3b82f6' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization Heatmap</CardTitle>
                <CardDescription>Personnel workload distribution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPersonnelUtilization.map(person => (
                  <div key={person.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{person.name}</span>
                        <Badge className={getStatusColor(person.status)}>
                          {person.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1">
                          <Progress value={Math.min(person.utilization, 100)} className="h-2" />
                        </div>
                        <span className="text-sm font-medium w-12">{person.utilization}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {person.hoursWorked}h / {person.hoursCapacity}h • {person.projects.length} project{person.projects.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Summary</CardTitle>
                <CardDescription>Key metrics for the current period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-4 border rounded-lg">
                    <Building className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{totalProjects}</div>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">{mockPersonnelUtilization.length}</div>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Truck className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-sm text-muted-foreground">Equipment Units</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">156</div>
                    <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance Dashboard</CardTitle>
              <CardDescription>Detailed project metrics and KPI tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search projects..." className="pl-10" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="on-track">On Track</SelectItem>
                      <SelectItem value="at-risk">At Risk</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Budget Usage</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>Safety</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProjectMetrics.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div className="font-medium">{project.name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={project.progress} className="flex-1" />
                            <span className="text-sm font-medium w-12">{project.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{formatCurrency(project.budgetUsed)}</div>
                            <div className="text-muted-foreground">
                              {Math.round((project.budgetUsed / project.budgetTotal) * 100)}% of {formatCurrency(project.budgetTotal)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{project.timeElapsed} / {project.timeTotal} months</div>
                            <div className="text-muted-foreground">
                              {Math.round((project.timeElapsed / project.timeTotal) * 100)}% elapsed
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{project.teamSize} members</div>
                            <div className="text-muted-foreground">
                              {project.milestonesCompleted}/{project.milestonesTotal} milestones
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{project.safetyScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{project.qualityScore}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personnel Utilization</CardTitle>
                <CardDescription>Team workload and capacity analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockPersonnelUtilization}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="#ea580c" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipment Utilization</CardTitle>
                <CardDescription>Equipment usage and idle time analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Truck className="h-8 w-8 text-orange-500" />
                      <div>
                        <div className="font-medium">Heavy Machinery</div>
                        <div className="text-sm text-muted-foreground">8 units active</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">85%</div>
                      <div className="text-xs text-muted-foreground">Utilization</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Construction className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="font-medium">Cranes</div>
                        <div className="text-sm text-muted-foreground">3 units active</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-600">65%</div>
                      <div className="text-xs text-muted-foreground">Utilization</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      <Hammer className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="font-medium">Tools & Equipment</div>
                        <div className="text-sm text-muted-foreground">45 units active</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">92%</div>
                      <div className="text-xs text-muted-foreground">Utilization</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Actual Analysis</CardTitle>
                <CardDescription>Financial performance tracking over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="budgeted" stackId="1" stroke="#f97316" fill="#fed7aa" />
                    <Area type="monotone" dataKey="actual" stackId="2" stroke="#ea580c" fill="#fb923c" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Forecast</CardTitle>
                <CardDescription>Projected expenditure and revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 border rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(3750000000)}</div>
                    <p className="text-sm text-muted-foreground">Total Project Value</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="text-center p-3 border rounded">
                      <div className="text-lg font-bold">{formatCurrency(totalSpent)}</div>
                      <p className="text-xs text-muted-foreground">Total Spent</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <div className="text-lg font-bold">{formatCurrency(totalBudget - totalSpent)}</div>
                      <p className="text-xs text-muted-foreground">Remaining Budget</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Q1 Forecast</span>
                      <span className="font-medium">{formatCurrency(900000000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Q2 Forecast</span>
                      <span className="font-medium">{formatCurrency(1100000000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Q3 Forecast</span>
                      <span className="font-medium">{formatCurrency(1000000000)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Safety Tab */}
        <TabsContent value="safety" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Safety Incident Trends</CardTitle>
                <CardDescription>Monthly safety performance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={mockSafetyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="nearMisses" stroke="#f97316" strokeWidth={2} />
                    <Line type="monotone" dataKey="inspections" stroke="#22c55e" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Scorecard</CardTitle>
                <CardDescription>Safety compliance metrics by project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockProjectMetrics.map(project => (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">Safety Score</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={project.safetyScore} className="w-24" />
                      <span className="text-sm font-medium w-12">{project.safetyScore}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Quality Tab */}
        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics Trends</CardTitle>
                <CardDescription>NCR tracking and quality improvement</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockQualityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="ncrs" fill="#ef4444" />
                    <Bar dataKey="resolved" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Control Summary</CardTitle>
                <CardDescription>Resolution rates and quality indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 border rounded-lg">
                  <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                  <div className="text-2xl font-bold">91%</div>
                  <p className="text-sm text-muted-foreground">Average Quality Score</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-3 border rounded">
                    <div className="text-lg font-bold text-red-600">33</div>
                    <p className="text-xs text-muted-foreground">Total NCRs</p>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <div className="text-lg font-bold text-green-600">25</div>
                    <p className="text-xs text-muted-foreground">Resolved NCRs</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Resolution Rate</span>
                    <span className="font-medium">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Custom Report Builder Dialog */}
      <Dialog open={showCustomReportBuilder} onOpenChange={setShowCustomReportBuilder}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Custom Report Builder</DialogTitle>
            <DialogDescription>
              Create custom reports with selected metrics and filters
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">Select Metrics</h4>
                <div className="space-y-2">
                  {[
                    "Project Progress", "Budget Utilization", "Personnel Utilization",
                    "Equipment Usage", "Safety Incidents", "Quality Scores",
                    "Timeline Performance", "Cost Variance", "Milestone Completion"
                  ].map(metric => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric}
                        checked={selectedMetrics.includes(metric)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedMetrics([...selectedMetrics, metric])
                          } else {
                            setSelectedMetrics(selectedMetrics.filter(m => m !== metric))
                          }
                        }}
                      />
                      <Label htmlFor={metric} className="text-sm">{metric}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Filters & Options</h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm">Date Range</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1month">Last Month</SelectItem>
                        <SelectItem value="3months">Last 3 Months</SelectItem>
                        <SelectItem value="6months">Last 6 Months</SelectItem>
                        <SelectItem value="1year">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm">Projects</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select projects" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Projects</SelectItem>
                        {mockProjectMetrics.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm">Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dashboard">Interactive Dashboard</SelectItem>
                        <SelectItem value="pdf">PDF Report</SelectItem>
                        <SelectItem value="excel">Excel Workbook</SelectItem>
                        <SelectItem value="csv">CSV Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Delivery Options</h4>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-email" />
                  <Label htmlFor="auto-email" className="text-sm">Schedule recurring reports</Label>
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Report
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share Dashboard
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}