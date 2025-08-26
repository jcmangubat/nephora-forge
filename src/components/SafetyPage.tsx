import React, { useState } from "react"
import { 
  Shield, 
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
  BarChart3,
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
  XCircle,
  CheckSquare,
  Upload,
  RefreshCw,
  UserCheck,
  HardHat,
  Zap,
  Flag
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

interface SafetyIncident {
  id: string
  title: string
  description: string
  severity: "Low" | "Medium" | "High" | "Critical"
  status: "Open" | "Under Investigation" | "Resolved" | "Closed"
  location: string
  reportedBy: string
  reportedDate: string
  assignedTo?: string
  resolvedDate?: string
  category: "Injury" | "Near Miss" | "Property Damage" | "Environmental" | "Security"
}

interface ComplianceDocument {
  id: string
  name: string
  type: "License" | "Permit" | "Certification" | "Policy" | "Manual"
  expiryDate: string
  status: "Active" | "Expired" | "Expiring Soon"
  owner: string
  lastUpdated: string
  version: string
  uploadedBy: string
}

interface SafetyInspection {
  id: string
  title: string
  location: string
  inspector: string
  scheduledDate: string
  completedDate?: string
  status: "Scheduled" | "In Progress" | "Completed" | "Overdue"
  result?: "Pass" | "Fail" | "Conditional Pass"
  score?: number
  issues: number
}

interface TrainingRecord {
  id: string
  courseName: string
  employee: string
  status: "Not Started" | "In Progress" | "Completed" | "Expired"
  assignedDate: string
  completionDate?: string
  expiryDate?: string
  certificateId?: string
  mandatory: boolean
}

const mockIncidents: SafetyIncident[] = [
  {
    id: "1",
    title: "Minor slip on wet floor",
    description: "Employee slipped on wet floor in warehouse area, no serious injury",
    severity: "Low",
    status: "Under Investigation",
    location: "Warehouse A - Section 2",
    reportedBy: "Mike Rodriguez",
    reportedDate: "2024-01-20",
    assignedTo: "Safety Team",
    category: "Injury"
  },
  {
    id: "2",
    title: "Near miss with crane operation",
    description: "Worker almost struck by crane load due to communication breakdown",
    severity: "High",
    status: "Open",
    location: "Downtown Site - Zone B",
    reportedBy: "Sarah Chua",
    reportedDate: "2024-01-18",
    assignedTo: "John Safety Manager",
    category: "Near Miss"
  },
  {
    id: "3",
    title: "Chemical spill contained",
    description: "Small chemical spill quickly contained with proper protocols",
    severity: "Medium",
    status: "Resolved",
    location: "Storage Facility",
    reportedBy: "Pete Katigbak",
    reportedDate: "2024-01-15",
    resolvedDate: "2024-01-16",
    category: "Environmental"
  }
]

const mockDocuments: ComplianceDocument[] = [
  {
    id: "1",
    name: "OSHA Construction Safety License",
    type: "License",
    expiryDate: "2024-06-15",
    status: "Expiring Soon",
    owner: "NephoraForge Construction",
    lastUpdated: "2023-05-20",
    version: "v2.1",
    uploadedBy: "Admin User"
  },
  {
    id: "2",
    name: "Environmental Permit - Downtown Site",
    type: "Permit",
    expiryDate: "2024-12-31",
    status: "Active",
    owner: "Environmental Dept",
    lastUpdated: "2024-01-10",
    version: "v1.3",
    uploadedBy: "Lisa Williams"
  },
  {
    id: "3",
    name: "ISO 45001 Certification",
    type: "Certification",
    expiryDate: "2023-12-01",
    status: "Expired",
    owner: "Quality Assurance",
    lastUpdated: "2023-11-15",
    version: "v3.0",
    uploadedBy: "Carlos Martinez"
  }
]

const mockInspections: SafetyInspection[] = [
  {
    id: "1",
    title: "Weekly Site Safety Inspection",
    location: "Downtown Site",
    inspector: "Sarah Chua",
    scheduledDate: "2024-01-22",
    status: "Scheduled",
    issues: 0
  },
  {
    id: "2",
    title: "Equipment Safety Check",
    location: "Equipment Yard",
    inspector: "Mike Rodriguez",
    scheduledDate: "2024-01-20",
    completedDate: "2024-01-20",
    status: "Completed",
    result: "Pass",
    score: 95,
    issues: 2
  },
  {
    id: "3",
    title: "Fire Safety Inspection",
    location: "Office Building",
    inspector: "Pete Katigbak",
    scheduledDate: "2024-01-15",
    status: "Overdue",
    issues: 0
  }
]

const mockTraining: TrainingRecord[] = [
  {
    id: "1",
    courseName: "OSHA 30-Hour Construction Safety",
    employee: "Mike Rodriguez",
    status: "Completed",
    assignedDate: "2023-12-01",
    completionDate: "2023-12-15",
    expiryDate: "2026-12-15",
    certificateId: "OSHA-30-2023-001",
    mandatory: true
  },
  {
    id: "2",
    courseName: "First Aid & CPR Certification",
    employee: "Sarah Chua",
    status: "Expired",
    assignedDate: "2022-06-01",
    completionDate: "2022-06-15",
    expiryDate: "2024-06-15",
    certificateId: "CPR-2022-015",
    mandatory: true
  },
  {
    id: "3",
    courseName: "Hazard Communication Training",
    employee: "Pete Katigbak",
    status: "In Progress",
    assignedDate: "2024-01-10",
    mandatory: false
  }
]

export function SafetyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIncident, setSelectedIncident] = useState<SafetyIncident | null>(null)
  const [showAddIncident, setShowAddIncident] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Under Investigation": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Closed": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Expired": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Expiring Soon": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Overdue": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "In Progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  // Analytics calculations
  const totalIncidents = mockIncidents.length
  const openIncidents = mockIncidents.filter(i => i.status === "Open" || i.status === "Under Investigation").length
  const criticalIncidents = mockIncidents.filter(i => i.severity === "Critical").length
  const expiredDocuments = mockDocuments.filter(d => d.status === "Expired").length
  const expiringDocuments = mockDocuments.filter(d => d.status === "Expiring Soon").length
  const overdueInspections = mockInspections.filter(i => i.status === "Overdue").length
  const expiredTraining = mockTraining.filter(t => t.status === "Expired").length

  const complianceScore = Math.round(((mockDocuments.length - expiredDocuments) / mockDocuments.length) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">Safety & Compliance</h1>
          <p className="text-muted-foreground">
            Monitor workplace safety, manage compliance, and ensure regulatory adherence
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600" 
            onClick={() => setShowAddIncident(true)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {(criticalIncidents > 0 || expiredDocuments > 0 || overdueInspections > 0) && (
        <div className="space-y-3">
          {criticalIncidents > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 dark:text-red-200">Critical Safety Alert</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300">
                {criticalIncidents} critical safety incident{criticalIncidents > 1 ? 's' : ''} require immediate attention
              </AlertDescription>
            </Alert>
          )}
          {expiredDocuments > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 dark:text-red-200">Compliance Alert</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300">
                {expiredDocuments} compliance document{expiredDocuments > 1 ? 's have' : ' has'} expired
              </AlertDescription>
            </Alert>
          )}
          {overdueInspections > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800 dark:text-yellow-200">Inspection Alert</AlertTitle>
              <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                {overdueInspections} safety inspection{overdueInspections > 1 ? 's are' : ' is'} overdue
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Dashboard Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-red-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Incidents</p>
                <p className="text-2xl font-bold text-red-600">{openIncidents}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliance Score</p>
                <p className="text-2xl font-bold text-green-600">{complianceScore}%</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expiring Documents</p>
                <p className="text-2xl font-bold text-yellow-600">{expiringDocuments}</p>
              </div>
              <FileText className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Training Due</p>
                <p className="text-2xl font-bold text-blue-600">{expiredTraining}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Safety Incidents</CardTitle>
                <CardDescription>Latest reported incidents requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockIncidents.slice(0, 3).map(incident => (
                  <div key={incident.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                        <span className="font-medium">{incident.title}</span>
                      </div>
                      <Badge className={getStatusColor(incident.status)} variant="outline">
                        {incident.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Location: {incident.location}</span>
                      <span>Reported: {new Date(incident.reportedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
                <CardDescription>Current compliance document status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-red-50 dark:bg-red-950/20">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <div className="flex-1">
                      <p className="font-medium">ISO 45001 Certification</p>
                      <p className="text-sm text-muted-foreground">Expired on Dec 1, 2023</p>
                    </div>
                    <Button size="sm" variant="outline">Renew</Button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium">OSHA Construction License</p>
                      <p className="text-sm text-muted-foreground">Expires in 4 months</p>
                    </div>
                    <Button size="sm" variant="outline">Review</Button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">Environmental Permit</p>
                      <p className="text-sm text-muted-foreground">Valid until Dec 31, 2024</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Inspections</CardTitle>
                <CardDescription>Scheduled safety inspections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockInspections.filter(i => i.status === "Scheduled" || i.status === "Overdue").map(inspection => (
                  <div key={inspection.id} className={`border rounded-lg p-3 ${inspection.status === "Overdue" ? "bg-red-50 dark:bg-red-950/20" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{inspection.title}</span>
                      <Badge className={getStatusColor(inspection.status)}>
                        {inspection.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Inspector: {inspection.inspector}</span>
                      <span>Due: {new Date(inspection.scheduledDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training Status</CardTitle>
                <CardDescription>Employee training completion status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockTraining.slice(0, 3).map(training => (
                  <div key={training.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {training.mandatory && <Flag className="h-4 w-4 text-red-500" />}
                        <span className="font-medium">{training.employee}</span>
                      </div>
                      <Badge className={getStatusColor(training.status)}>
                        {training.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{training.courseName}</p>
                    {training.expiryDate && (
                      <p className="text-xs text-muted-foreground">
                        Expires: {new Date(training.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Incidents & Hazard Reports</CardTitle>
              <CardDescription>Track and manage all safety incidents and near misses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search incidents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={() => setShowAddIncident(true)} className="bg-red-500 hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Report Incident
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Reported Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIncidents.map((incident) => (
                      <TableRow key={incident.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedIncident(incident)}>
                          <div>
                            <div className="font-medium">{incident.title}</div>
                            <div className="text-sm text-muted-foreground">{incident.category}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(incident.status)} variant="outline">
                            {incident.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{incident.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(incident.reportedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedIncident(incident)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Assign Investigator
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
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documents & Certifications</CardTitle>
              <CardDescription>Manage compliance documents, licenses, and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search documents..." className="pl-10" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDocuments.map((document) => (
                      <TableRow key={document.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{document.name}</div>
                            <div className="text-sm text-muted-foreground">Version {document.version}</div>
                          </div>
                        </TableCell>
                        <TableCell>{document.type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(document.status)}>
                            {document.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{new Date(document.expiryDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>{document.owner}</TableCell>
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
                                View Document
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Update Version
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Renew
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
        </TabsContent>

        {/* Inspections Tab */}
        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Inspections & Checklists</CardTitle>
              <CardDescription>Schedule and track safety inspections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search inspections..." className="pl-10" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Inspection
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Inspection</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInspections.map((inspection) => (
                      <TableRow key={inspection.id}>
                        <TableCell>
                          <div className="font-medium">{inspection.title}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{inspection.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>{inspection.inspector}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(inspection.status)}>
                            {inspection.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(inspection.scheduledDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {inspection.result && (
                            <div className="flex items-center space-x-2">
                              <Badge variant={inspection.result === "Pass" ? "default" : "destructive"}>
                                {inspection.result}
                              </Badge>
                              {inspection.score && <span className="text-sm">{inspection.score}%</span>}
                            </div>
                          )}
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
                                View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckSquare className="mr-2 h-4 w-4" />
                                Complete Inspection
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Reschedule
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
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety Training & Programs</CardTitle>
              <CardDescription>Manage employee safety training and certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search training records..." className="pl-10" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Assign Training
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Completion Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Mandatory</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTraining.map((training) => (
                      <TableRow key={training.id}>
                        <TableCell>
                          <div className="font-medium">{training.employee}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{training.courseName}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(training.status)}>
                            {training.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {training.completionDate ? new Date(training.completionDate).toLocaleDateString() : "-"}
                        </TableCell>
                        <TableCell>
                          {training.expiryDate ? (
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{new Date(training.expiryDate).toLocaleDateString()}</span>
                            </div>
                          ) : "-"}
                        </TableCell>
                        <TableCell>
                          {training.mandatory && <Flag className="h-4 w-4 text-red-500" />}
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
                                View Certificate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Schedule Renewal
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Bell className="mr-2 h-4 w-4" />
                                Send Reminder
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
        </TabsContent>

        {/* Audits Tab */}
        <TabsContent value="audits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit & Compliance Tracking</CardTitle>
              <CardDescription>Track internal and external audits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clipboard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Audit Management Coming Soon</h3>
                <p className="text-muted-foreground">
                  Comprehensive audit tracking and compliance management features will be available here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Safety Metrics</CardTitle>
                <CardDescription>Key safety performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="text-center p-4 border rounded-lg">
                    <HardHat className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">127</div>
                    <p className="text-sm text-muted-foreground">Days Without Incident</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Shield className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">{complianceScore}%</div>
                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                    <div className="text-2xl font-bold">15</div>
                    <p className="text-sm text-muted-foreground">Completed Inspections</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Award className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <div className="text-2xl font-bold">89%</div>
                    <p className="text-sm text-muted-foreground">Training Completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Incident Trends</CardTitle>
                <CardDescription>Monthly incident reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">January 2024</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "20%" }} />
                      </div>
                      <span className="text-sm font-medium">2</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">December 2023</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }} />
                      </div>
                      <span className="text-sm font-medium">1</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">November 2023</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "0%" }} />
                      </div>
                      <span className="text-sm font-medium">0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Incident Details Dialog */}
      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Incident Details</DialogTitle>
            <DialogDescription>
              Complete incident information and investigation status
            </DialogDescription>
          </DialogHeader>
          {selectedIncident && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedIncident.title}</h3>
                  <p className="text-muted-foreground">{selectedIncident.category}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getSeverityColor(selectedIncident.severity)}>
                      {selectedIncident.severity}
                    </Badge>
                    <Badge className={getStatusColor(selectedIncident.status)} variant="outline">
                      {selectedIncident.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Incident Description</h4>
                <p className="text-sm">{selectedIncident.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">Incident Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm">{selectedIncident.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Reported By:</span>
                      <span className="text-sm">{selectedIncident.reportedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Reported Date:</span>
                      <span className="text-sm">{new Date(selectedIncident.reportedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assigned To:</span>
                      <span className="text-sm">{selectedIncident.assignedTo || "Unassigned"}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Investigation Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm">{selectedIncident.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Severity:</span>
                      <span className="text-sm">{selectedIncident.severity}</span>
                    </div>
                    {selectedIncident.resolvedDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Resolved Date:</span>
                        <span className="text-sm">{new Date(selectedIncident.resolvedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Assign Investigator
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}