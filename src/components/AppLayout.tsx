import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { DashboardSidebar } from "./DashboardSidebar"
import { ProjectsPage } from "./ProjectsPage"
import { ProjectDetailPage } from "./ProjectDetailPage"
import { AnalyticsCharts } from "./AnalyticsCharts"
import { PersonnelTable } from "./PersonnelTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { HardHat, Truck, AlertTriangle, CheckCircle, Clock, DollarSign, Users, Calendar, User } from "lucide-react"
import { Badge } from "./ui/badge"
import { useNavigation } from "./NavigationProvider"

const stats = [
  {
    title: "Active Projects",
    value: "47",
    description: "+3 new this month",
    icon: Calendar,
    color: "text-blue-600",
  },
  {
    title: "Personnel On Site",
    value: "324",
    description: "85% capacity utilization",
    icon: HardHat,
    color: "text-orange-600",
  },
  {
    title: "Equipment Active",
    value: "89%",
    description: "156 of 175 units",
    icon: Truck,
    color: "text-green-600",
  },
  {
    title: "Safety Score",
    value: "98.2%",
    description: "2 incidents this month",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

const recentAlerts = [
  {
    id: 1,
    type: "safety",
    message: "Equipment inspection due for Crane #23",
    time: "2 hours ago",
    priority: "high",
  },
  {
    id: 2,
    type: "project",
    message: "Downtown Complex ahead of schedule",
    time: "4 hours ago",
    priority: "info",
  },
  {
    id: 3,
    type: "equipment",
    message: "Bulldozer #7 maintenance completed",
    time: "6 hours ago",
    priority: "low",
  },
]

function DashboardPage() {
  const currentTime = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <>
      <div className="border-b bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
        <div className="flex h-20 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-orange-800 dark:text-orange-200">Operations Command Center</h1>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                Real-time monitoring and control of construction operations
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Admin User</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Online
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{currentTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Welcome Message */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-500 rounded-full p-2">
                <HardHat className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200">Welcome back, Admin!</h3>
                <p className="text-sm text-muted-foreground">
                  Here's what's happening with your construction operations today.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions and Alerts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System notifications and important updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.priority === 'high' ? 'bg-red-500' : 
                    alert.priority === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <button className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                <Users className="h-4 w-4" />
                <span>Assign Personnel</span>
              </button>
              <button className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                <Truck className="h-4 w-4" />
                <span>Equipment Request</span>
              </button>
              <button className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                <AlertTriangle className="h-4 w-4" />
                <span>Safety Report</span>
              </button>
              <button className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted transition-colors">
                <CheckCircle className="h-4 w-4" />
                <span>Quality Inspection</span>
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <AnalyticsCharts />

        {/* Personnel Table */}
        <PersonnelTable />
      </div>
    </>
  )
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <>
      <div className="border-b bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
        <div className="flex h-20 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-orange-800 dark:text-orange-200">{title}</h1>
              <p className="text-sm text-orange-600 dark:text-orange-300">{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{title} Module</h3>
              <p className="text-muted-foreground">This module is under development</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export function AppLayout() {
  const { currentPage } = useNavigation()

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "projects":
        return (
          <>
            <div className="border-b bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
              <div className="flex h-20 items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger />
                </div>
              </div>
            </div>
            <ProjectsPage />
          </>
        )
      case "project-detail":
        return (
          <>
            <div className="border-b bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20">
              <div className="flex h-20 items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger />
                </div>
              </div>
            </div>
            <ProjectDetailPage />
          </>
        )
      case "personnel":
        return <PlaceholderPage title="Personnel Management" description="Manage workforce and team assignments" />
      case "equipment":
        return <PlaceholderPage title="Equipment Management" description="Track and manage construction equipment" />
      case "safety":
        return <PlaceholderPage title="Safety & Compliance" description="Monitor safety protocols and compliance" />
      case "quality":
        return <PlaceholderPage title="Quality Control" description="Manage quality inspections and standards" />
      case "analytics":
        return <PlaceholderPage title="Analytics & Reports" description="View detailed analytics and reports" />
      case "users":
        return <PlaceholderPage title="User Management" description="Manage system users and permissions" />
      case "settings":
        return <PlaceholderPage title="System Settings" description="Configure system settings and preferences" />
      case "maintenance":
        return <PlaceholderPage title="System Maintenance" description="System maintenance and diagnostics" />
      default:
        return <DashboardPage />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto">
          {renderCurrentPage()}
        </main>
      </div>
    </SidebarProvider>
  )
}