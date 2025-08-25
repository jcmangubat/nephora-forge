import { Home, Users, BarChart3, Settings, LogOut, HardHat, Truck, ClipboardCheck, Wrench, Calendar, AlertTriangle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from "./ui/sidebar"
import { Button } from "./ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { useAuth } from "./AuthProvider"
import { useNavigation } from "./NavigationProvider"

const menuItems = [
  {
    title: "Dashboard",
    page: "dashboard" as const,
    icon: Home,
  },
  {
    title: "Projects",
    page: "projects" as const,
    icon: Calendar,
  },
  {
    title: "Personnel",
    page: "personnel" as const,
    icon: HardHat,
  },
  {
    title: "Equipment",
    page: "equipment" as const,
    icon: Truck,
  },
  {
    title: "Safety & Compliance",
    page: "safety" as const,
    icon: AlertTriangle,
  },
  {
    title: "Quality Control",
    page: "quality" as const,
    icon: ClipboardCheck,
  },
  {
    title: "Analytics",
    page: "analytics" as const,
    icon: BarChart3,
  },
]

const adminItems = [
  {
    title: "User Management",
    page: "users" as const,
    icon: Users,
  },
  {
    title: "System Settings",
    page: "settings" as const,
    icon: Settings,
  },
  {
    title: "Maintenance",
    page: "maintenance" as const,
    icon: Wrench,
  },
]

export function DashboardSidebar() {
  const { logout } = useAuth()
  const { currentPage, setCurrentPage } = useNavigation()

  const handleLogout = () => {
    logout()
  }

  const handleNavigation = (page: typeof currentPage) => {
    setCurrentPage(page)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 rounded-lg p-2">
              <HardHat className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-orange-600">NephoraForge</h2>
              <p className="text-xs text-muted-foreground">Construction Operations</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={currentPage === item.page}
                  >
                    <button onClick={() => handleNavigation(item.page)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={currentPage === item.page}
                  >
                    <button onClick={() => handleNavigation(item.page)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={handleLogout}
              >
                <LogOut />
                <span>Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}