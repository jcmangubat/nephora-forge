import React, { useState } from "react"
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Wrench, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Settings,
  Eye,
  Edit,
  Archive,
  Activity,
  FileText,
  Users,
  DollarSign,
  Zap,
  Shield,
  Construction,
  Car,
  Hammer
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

interface Equipment {
  id: string
  name: string
  category: string
  model: string
  serialNumber: string
  status: "Available" | "In Use" | "Under Maintenance" | "Decommissioned"
  location: string
  assignedProject?: string
  assignedTo?: string
  purchaseDate: string
  lastMaintenance: string
  nextMaintenance: string
  utilizationRate: number
  totalHours: number
  costPerHour: number
  issues: Issue[]
  specifications: Record<string, string>
  tags: string[]
}

interface Issue {
  id: string
  title: string
  description: string
  severity: "Low" | "Medium" | "High" | "Critical"
  status: "Pending" | "In Progress" | "Resolved"
  reportedBy: string
  reportedDate: string
  resolvedDate?: string
}

interface MaintenanceRecord {
  id: string
  equipmentId: string
  date: string
  type: "Routine" | "Repair" | "Inspection" | "Overhaul"
  description: string
  cost: number
  performedBy: string
  nextDue: string
}

const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Excavator CAT 320D",
    category: "Heavy Machinery",
    model: "320D",
    serialNumber: "CAT320D001",
    status: "In Use",
    location: "Makati Site",
    assignedProject: "Makati CBD Office Complex",
    assignedTo: "John dela Cruz",
    purchaseDate: "2022-01-15",
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-04-15",
    utilizationRate: 85,
    totalHours: 2400,
    costPerHour: 125,
    issues: [
      {
        id: "1",
        title: "Hydraulic leak detected",
        description: "Minor hydraulic fluid leak from main cylinder",
        severity: "Medium",
        status: "In Progress",
        reportedBy: "Jose Dela Cruz",
        reportedDate: "2024-01-20"
      }
    ],
    specifications: {
      "Engine Power": "122 kW",
      "Operating Weight": "20,300 kg",
      "Bucket Capacity": "1.2 m³"
    },
    tags: ["excavation", "earthmoving", "construction"]
  },
  {
    id: "2",
    name: "Tower Crane TC-5013",
    category: "Cranes",
    model: "TC-5013",
    serialNumber: "TC5013002",
    status: "Available",
    location: "Equipment Yard",
    purchaseDate: "2021-06-10",
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-07-10",
    utilizationRate: 65,
    totalHours: 3200,
    costPerHour: 200,
    issues: [],
    specifications: {
      "Max Load": "5 tons",
      "Jib Length": "50m",
      "Height": "40m"
    },
    tags: ["lifting", "construction", "high-capacity"]
  },
  {
    id: "3",
    name: "Concrete Mixer CM-350",
    category: "Concrete Equipment",
    model: "CM-350",
    serialNumber: "CM350003",
    status: "Under Maintenance",
    location: "Maintenance Shop",
    purchaseDate: "2023-03-20",
    lastMaintenance: "2024-01-25",
    nextMaintenance: "2024-04-25",
    utilizationRate: 70,
    totalHours: 1500,
    costPerHour: 75,
    issues: [
      {
        id: "2",
        title: "Motor replacement needed",
        description: "Main motor showing signs of wear, replacement scheduled",
        severity: "High",
        status: "In Progress",
        reportedBy: "Pete Katigbak",
        reportedDate: "2024-01-25"
      }
    ],
    specifications: {
      "Capacity": "350L",
      "Motor Power": "4 kW",
      "Weight": "180 kg"
    },
    tags: ["concrete", "mixing", "portable"]
  },
  {
    id: "4",
    name: "Bulldozer D6T",
    category: "Heavy Machinery",
    model: "D6T",
    serialNumber: "D6T004",
    status: "In Use",
    location: "Skyway Site",
    assignedProject: "Skyway Bridge Extension",
    assignedTo: "Carlos Ramirez",
    purchaseDate: "2020-09-12",
    lastMaintenance: "2023-12-20",
    nextMaintenance: "2024-06-20",
    utilizationRate: 90,
    totalHours: 4800,
    costPerHour: 150,
    issues: [],
    specifications: {
      "Engine Power": "164 kW",
      "Operating Weight": "18,200 kg",
      "Blade Capacity": "3.4 m³"
    },
    tags: ["earthmoving", "grading", "heavy-duty"]
  },
  {
    id: "5",
    name: "Forklift FT-2500",
    category: "Material Handling",
    model: "FT-2500",
    serialNumber: "FT2500005",
    status: "Available",
    location: "Warehouse",
    purchaseDate: "2023-08-05",
    lastMaintenance: "2024-01-30",
    nextMaintenance: "2024-04-30",
    utilizationRate: 45,
    totalHours: 800,
    costPerHour: 35,
    issues: [],
    specifications: {
      "Lift Capacity": "2500 kg",
      "Lift Height": "4.5m",
      "Fuel Type": "Electric"
    },
    tags: ["material-handling", "warehouse", "electric"]
  }
]

const categories = ["All", "Heavy Machinery", "Cranes", "Concrete Equipment", "Material Handling", "Tools", "Vehicles"]
const statuses = ["All", "Available", "In Use", "Under Maintenance", "Decommissioned"]
const locations = ["All", "Downtown Site", "Bridge Site", "Airport Site", "Equipment Yard", "Warehouse", "Maintenance Shop"]

export function EquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [locationFilter, setLocationFilter] = useState("All")
  const [selectedEquipment, setSelectedEquipment] = useState(null as Equipment | null)
  const [showAddEquipment, setShowAddEquipment] = useState(false)

  const filteredEquipment = mockEquipment.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         equipment.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "All" || equipment.category === categoryFilter
    const matchesStatus = statusFilter === "All" || equipment.status === statusFilter
    const matchesLocation = locationFilter === "All" || equipment.location === locationFilter

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "In Use": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Under Maintenance": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Decommissioned": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Heavy Machinery": return Construction
      case "Cranes": return Activity
      case "Concrete Equipment": return Wrench
      case "Material Handling": return Car
      case "Tools": return Hammer
      case "Vehicles": return Truck
      default: return Settings
    }
  }

  // Analytics calculations
  const totalEquipment = mockEquipment.length
  const activeEquipment = mockEquipment.filter(e => e.status === "In Use").length
  const availableEquipment = mockEquipment.filter(e => e.status === "Available").length
  const maintenanceEquipment = mockEquipment.filter(e => e.status === "Under Maintenance").length
  const averageUtilization = Math.round(mockEquipment.reduce((sum, e) => sum + e.utilizationRate, 0) / totalEquipment)
  const totalIssues = mockEquipment.reduce((sum, e) => sum + e.issues.length, 0)
  const criticalIssues = mockEquipment.reduce((sum, e) => sum + e.issues.filter(i => i.severity === "Critical").length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">Equipment Management</h1>
          <p className="text-muted-foreground">
            Monitor, track, and manage construction equipment and assets
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600" 
            onClick={() => setShowAddEquipment(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Equipment
          </Button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Equipment</p>
                <p className="text-2xl font-bold">{totalEquipment}</p>
              </div>
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Usage</p>
                <p className="text-2xl font-bold text-blue-600">{activeEquipment}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Utilization</p>
                <p className="text-2xl font-bold text-green-600">{averageUtilization}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues</p>
                <p className="text-2xl font-bold text-red-600">{totalIssues}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inventory">Equipment Inventory</TabsTrigger>
          <TabsTrigger value="assignments">Project Assignments</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance & Issues</TabsTrigger>
          <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          <TabsTrigger value="registration">Add/Edit Equipment</TabsTrigger>
        </TabsList>

        {/* Equipment Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
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
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Table */}
          <Card>
            <CardHeader>
              <CardTitle>Equipment Inventory</CardTitle>
              <CardDescription>
                {filteredEquipment.length} of {totalEquipment} equipment items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Equipment</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Next Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.map((equipment) => {
                    const CategoryIcon = getCategoryIcon(equipment.category)
                    return (
                      <TableRow key={equipment.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedEquipment(equipment)}>
                          <div className="flex items-center space-x-3">
                            <CategoryIcon className="h-8 w-8 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{equipment.name}</div>
                              <div className="text-sm text-muted-foreground">{equipment.model} • {equipment.serialNumber}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{equipment.category}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(equipment.status)}>
                            {equipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{equipment.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 w-16">
                              <Progress value={equipment.utilizationRate} className="h-2" />
                            </div>
                            <span className="text-sm font-medium w-12">
                              {equipment.utilizationRate}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{new Date(equipment.nextMaintenance).toLocaleDateString()}</span>
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
                              <DropdownMenuItem onClick={() => setSelectedEquipment(equipment)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Equipment
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Assign to Project
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Wrench className="mr-2 h-4 w-4" />
                                Schedule Maintenance
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

        {/* Project Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Equipment by Project</CardTitle>
                <CardDescription>Current equipment assignments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Makati CBD Office Complex", "Skyway Bridge Extension", "NAIA Terminal Expansion"].map(project => {
                  const projectEquipment = mockEquipment.filter(e => e.assignedProject === project)
                  return (
                    <div key={project} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{project}</h4>
                        <Badge variant="outline">{projectEquipment.length} items</Badge>
                      </div>
                      <div className="space-y-1">
                        {projectEquipment.map(equipment => (
                          <div key={equipment.id} className="flex items-center justify-between text-sm">
                            <span>{equipment.name}</span>
                            <span className="text-muted-foreground">{equipment.assignedTo}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Schedule</CardTitle>
                <CardDescription>Upcoming equipment usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium">Excavator CAT 320D</p>
                      <p className="text-sm text-muted-foreground">Tomorrow 08:00 - 16:00</p>
                    </div>
                    <Badge variant="outline">Confirmed</Badge>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Calendar className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Tower Crane TC-5013</p>
                      <p className="text-sm text-muted-foreground">Next Week - Full Week</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium">Bulldozer D6T</p>
                      <p className="text-sm text-muted-foreground">Conflict detected - Double booked</p>
                    </div>
                    <Badge variant="destructive">Conflict</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Maintenance & Issues Tab */}
        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Upcoming and overdue maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-red-50 dark:bg-red-950/20">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <p className="font-medium">Bulldozer D6T</p>
                      <p className="text-sm text-muted-foreground">Maintenance overdue by 15 days</p>
                    </div>
                    <Button size="sm" variant="outline">Schedule</Button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium">Excavator CAT 320D</p>
                      <p className="text-sm text-muted-foreground">Due in 30 days</p>
                    </div>
                    <Button size="sm" variant="outline">Schedule</Button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">Forklift FT-2500</p>
                      <p className="text-sm text-muted-foreground">Completed last week</p>
                    </div>
                    <Badge variant="outline">Complete</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Issues</CardTitle>
                <CardDescription>Current equipment issues and reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockEquipment.flatMap(equipment => 
                  equipment.issues.map(issue => (
                    <div key={issue.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(issue.severity)} variant="outline">
                            {issue.severity}
                          </Badge>
                          <span className="font-medium">{issue.title}</span>
                        </div>
                        <Badge variant="outline">{issue.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Equipment: {equipment.name}</span>
                        <span>Reported: {new Date(issue.reportedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Utilization Analytics</CardTitle>
                <CardDescription>Equipment performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-sm text-muted-foreground">Average Utilization</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">12,700</div>
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <DollarSign className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">₱60M</div>
                    <p className="text-sm text-muted-foreground">Revenue Generated</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingDown className="h-8 w-8 mx-auto text-red-500 mb-2" />
                    <div className="text-2xl font-bold">8%</div>
                    <p className="text-sm text-muted-foreground">Downtime</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Equipment operational costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockEquipment.slice(0, 4).map(equipment => {
                  const totalCost = equipment.totalHours * equipment.costPerHour
                  const utilization = equipment.utilizationRate
                  return (
                    <div key={equipment.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{equipment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {equipment.totalHours}h × ₱{equipment.costPerHour.toLocaleString()}/h
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₱{totalCost.toLocaleString()}</p>
                        <p className={`text-sm ${utilization > 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                          {utilization}% utilized
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Registration Tab */}
        <TabsContent value="registration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Registration</CardTitle>
              <CardDescription>Add new equipment or edit existing entries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="equipment-name">Equipment Name</Label>
                  <Input id="equipment-name" placeholder="e.g., Excavator CAT 320D" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-model">Model</Label>
                  <Input id="equipment-model" placeholder="e.g., 320D" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-serial">Serial Number</Label>
                  <Input id="equipment-serial" placeholder="e.g., CAT320D001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.slice(1).map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment-cost">Cost per Hour (���)</Label>
                  <Input id="equipment-cost" type="number" placeholder="e.g., 6250" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equipment-specs">Technical Specifications</Label>
                <Textarea 
                  id="equipment-specs" 
                  placeholder="Enter technical specifications (one per line, format: Specification: Value)"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equipment-tags">Tags</Label>
                <Input id="equipment-tags" placeholder="e.g., excavation, earthmoving, construction (comma-separated)" />
              </div>
              
              <Separator />
              
              <div className="flex items-center space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Register Equipment
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Equipment Details Dialog */}
      <Dialog open={!!selectedEquipment} onOpenChange={() => setSelectedEquipment(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Equipment Details</DialogTitle>
            <DialogDescription>
              Complete information and maintenance history
            </DialogDescription>
          </DialogHeader>
          {selectedEquipment && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                {(() => {
                  const CategoryIcon = getCategoryIcon(selectedEquipment.category)
                  return <CategoryIcon className="h-16 w-16 text-muted-foreground" />
                })()}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedEquipment.name}</h3>
                  <p className="text-muted-foreground">{selectedEquipment.model} • {selectedEquipment.serialNumber}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getStatusColor(selectedEquipment.status)}>
                      {selectedEquipment.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {selectedEquipment.utilizationRate}% Utilization
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <span className="text-sm">{selectedEquipment.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm">{selectedEquipment.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Purchase Date:</span>
                      <span className="text-sm">{new Date(selectedEquipment.purchaseDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Cost per Hour:</span>
                      <span className="text-sm">₱{selectedEquipment.costPerHour.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Usage Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Hours:</span>
                      <span className="text-sm">{selectedEquipment.totalHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assigned Project:</span>
                      <span className="text-sm">{selectedEquipment.assignedProject || "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assigned To:</span>
                      <span className="text-sm">{selectedEquipment.assignedTo || "None"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Utilization Rate:</span>
                      <span className="text-sm">{selectedEquipment.utilizationRate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Technical Specifications</h4>
                <div className="grid gap-2 md:grid-cols-2">
                  {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-2 border rounded">
                      <span className="text-sm text-muted-foreground">{key}:</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEquipment.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Maintenance History</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="text-sm font-medium">Last Maintenance</span>
                      <p className="text-xs text-muted-foreground">Routine inspection and service</p>
                    </div>
                    <span className="text-sm">{new Date(selectedEquipment.lastMaintenance).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded bg-yellow-50 dark:bg-yellow-950/20">
                    <div>
                      <span className="text-sm font-medium">Next Maintenance</span>
                      <p className="text-xs text-muted-foreground">Scheduled routine service</p>
                    </div>
                    <span className="text-sm">{new Date(selectedEquipment.nextMaintenance).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {selectedEquipment.issues.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Current Issues</h4>
                  <div className="space-y-2">
                    {selectedEquipment.issues.map(issue => (
                      <div key={issue.id} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity}
                          </Badge>
                          <Badge variant="outline">{issue.status}</Badge>
                        </div>
                        <p className="font-medium mb-1">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">{issue.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}