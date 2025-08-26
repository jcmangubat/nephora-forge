import React, { useState } from "react"
import { 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  AlertTriangle, 
  XCircle,
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
  Scale
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

interface QCInspection {
  id: string
  title: string
  type: "Pre-Construction" | "Ongoing Works" | "Turnover" | "Safety" | "Material"
  project: string
  location: string
  inspector: string
  scheduledDate: string
  completedDate?: string
  status: "Scheduled" | "In Progress" | "Passed" | "Failed" | "Overdue"
  checklistItems: number
  passedItems: number
  failedItems: number
  standard: string
}

interface NCRRecord {
  id: string
  ncrNumber: string
  title: string
  description: string
  type: "Quality Non-Conformance" | "Safety Violation" | "Material Defect" | "Process Deviation"
  severity: "Minor" | "Major" | "Critical"
  status: "Open" | "Under Review" | "Resolved" | "Closed"
  project: string
  location: string
  raisedBy: string
  raisedDate: string
  assignedTo?: string
  dueDate: string
  standard: string
  evidence: string[]
}

interface MaterialTest {
  id: string
  testType: "Concrete Strength" | "Steel Tensile" | "Soil Compaction" | "Weld Test" | "Aggregate Grading"
  material: string
  project: string
  testDate: string
  result: "Pass" | "Fail" | "Pending"
  standardValue: string
  actualValue: string
  testingLab: string
  certificateNumber: string
  expiryDate?: string
  standard: string
}

interface CAPARecord {
  id: string
  capaNumber: string
  title: string
  type: "Corrective Action" | "Preventive Action"
  relatedNCR: string
  description: string
  rootCause: string
  proposedAction: string
  assignedTo: string
  dueDate: string
  status: "Open" | "In Progress" | "Completed" | "Verified"
  priority: "Low" | "Medium" | "High" | "Critical"
  project: string
}

interface ComplianceStandard {
  id: string
  code: string
  title: string
  category: "DPWH" | "DOLE" | "OSHC" | "PNS" | "ISO" | "Project Specific"
  version: string
  effectiveDate: string
  status: "Active" | "Superseded" | "Under Review"
  applicableProjects: string[]
}

const mockInspections: QCInspection[] = [
  {
    id: "1",
    title: "Foundation Concrete Pour Inspection",
    type: "Ongoing Works",
    project: "Downtown Office Complex",
    location: "Foundation Level - Grid A1-A5",
    inspector: "Engr. Maria Santos",
    scheduledDate: "2024-01-22",
    status: "Scheduled",
    checklistItems: 25,
    passedItems: 0,
    failedItems: 0,
    standard: "DPWH Standard Specifications (Blue Book)"
  },
  {
    id: "2",
    title: "Safety PPE Compliance Check",
    type: "Safety",
    project: "Bridge Construction",
    location: "Construction Site - All Areas",
    inspector: "Safety Officer Juan Cruz",
    scheduledDate: "2024-01-20",
    completedDate: "2024-01-20",
    status: "Passed",
    checklistItems: 15,
    passedItems: 14,
    failedItems: 1,
    standard: "DOLE DO 13 (Occupational Safety and Health Standards)"
  },
  {
    id: "3",
    title: "Steel Reinforcement Pre-Pour Inspection",
    type: "Material",
    project: "Residential Tower",
    location: "Level 5 - Slab Reinforcement",
    inspector: "Engr. Roberto Dela Cruz",
    scheduledDate: "2024-01-18",
    status: "Overdue",
    checklistItems: 20,
    passedItems: 0,
    failedItems: 0,
    standard: "PNS 49:2015 (Steel Bars for Concrete Reinforcement)"
  }
]

const mockNCRs: NCRRecord[] = [
  {
    id: "1",
    ncrNumber: "NCR-2024-001",
    title: "Concrete Slump Test Failure",
    description: "Concrete slump test failed specification requirements. Measured slump: 180mm, Required: 100-150mm",
    type: "Quality Non-Conformance",
    severity: "Major",
    status: "Under Review",
    project: "Downtown Office Complex",
    location: "Level 3 Slab Pour",
    raisedBy: "QC Inspector - Engr. Maria Santos",
    raisedDate: "2024-01-19",
    assignedTo: "Project Engineer - Engr. Carlos Reyes",
    dueDate: "2024-01-26",
    standard: "DPWH Standard Specifications Section 603",
    evidence: ["slump_test_photo.jpg", "lab_report_20240119.pdf"]
  },
  {
    id: "2",
    ncrNumber: "SV-2024-002",
    title: "Missing Safety Harness Violation",
    description: "Worker observed working at height without proper safety harness and lifeline",
    type: "Safety Violation",
    severity: "Critical",
    status: "Open",
    project: "Bridge Construction",
    location: "Pier 2 - Deck Level Construction",
    raisedBy: "Safety Officer - Juan Cruz",
    raisedDate: "2024-01-21",
    assignedTo: "Site Supervisor - Pedro Mendez",
    dueDate: "2024-01-22",
    standard: "DOLE DO 13 Rule 1030 (Personal Protective Equipment)",
    evidence: ["safety_violation_photo.jpg", "incident_report.pdf"]
  }
]

const mockMaterialTests: MaterialTest[] = [
  {
    id: "1",
    testType: "Concrete Strength",
    material: "Ready Mix Concrete Class A (fc' = 21 MPa)",
    project: "Downtown Office Complex",
    testDate: "2024-01-15",
    result: "Pass",
    standardValue: "21 MPa (min)",
    actualValue: "23.5 MPa",
    testingLab: "DPWH Materials Testing Laboratory",
    certificateNumber: "MTL-2024-0015",
    standard: "ASTM C39 / PNS 07:2017",
  },
  {
    id: "2",
    testType: "Steel Tensile",
    material: "12mm Deformed Steel Bars Grade 40",
    project: "Residential Tower",
    testDate: "2024-01-18",
    result: "Fail",
    standardValue: "400 MPa (min)",
    actualValue: "385 MPa",
    testingLab: "SGS Philippines Testing Services",
    certificateNumber: "SGS-2024-0025",
    standard: "ASTM A615 / PNS 49:2015",
  }
]

const mockCAPAs: CAPARecord[] = [
  {
    id: "1",
    capaNumber: "CAPA-2024-001",
    title: "Improve Concrete Quality Control Process",
    type: "Corrective Action",
    relatedNCR: "NCR-2024-001",
    description: "Implement additional quality control measures for concrete batching and delivery",
    rootCause: "Inadequate monitoring of concrete batching plant operations and delivery time",
    proposedAction: "Install real-time monitoring system for batching plant and enforce maximum delivery time limits",
    assignedTo: "Project Manager - Engr. Lisa Williams",
    dueDate: "2024-02-15",
    status: "In Progress",
    priority: "High",
    project: "Downtown Office Complex"
  },
  {
    id: "2",
    capaNumber: "CAPA-2024-002",
    title: "Enhanced Safety Training and Monitoring",
    type: "Preventive Action",
    relatedNCR: "SV-2024-002",
    description: "Strengthen safety awareness and implement stricter monitoring of PPE compliance",
    rootCause: "Insufficient safety orientation and lack of continuous monitoring",
    proposedAction: "Conduct refresher safety training and assign dedicated safety watchers for high-risk areas",
    assignedTo: "Safety Officer - Juan Cruz",
    dueDate: "2024-01-30",
    status: "Open",
    priority: "Critical",
    project: "Bridge Construction"
  }
]

const mockStandards: ComplianceStandard[] = [
  {
    id: "1",
    code: "DPWH-2015",
    title: "Standard Specifications for Highways, Bridges, and Airports",
    category: "DPWH",
    version: "2015 Edition",
    effectiveDate: "2015-01-01",
    status: "Active",
    applicableProjects: ["Downtown Office Complex", "Bridge Construction", "Highway Expansion"]
  },
  {
    id: "2",
    code: "DOLE DO 13",
    title: "Occupational Safety and Health Standards",
    category: "DOLE",
    version: "Series of 1998 (As Amended)",
    effectiveDate: "1998-09-16",
    status: "Active",
    applicableProjects: ["All Projects"]
  },
  {
    id: "3",
    code: "ISO 9001:2015",
    title: "Quality Management Systems - Requirements",
    category: "ISO",
    version: "2015",
    effectiveDate: "2015-09-15",
    status: "Active",
    applicableProjects: ["Downtown Office Complex", "Airport Terminal"]
  }
]

export function QualityControlPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNCR, setSelectedNCR] = useState<NCRRecord | null>(null)
  const [selectedCAPA, setSelectedCAPA] = useState<CAPARecord | null>(null)
  const [showAddNCR, setShowAddNCR] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "In Progress": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Passed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Failed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Overdue": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Open": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Under Review": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Resolved": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Closed": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Verified": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Pass": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Fail": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Superseded": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Minor": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Major": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Low": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  // Analytics calculations
  const totalInspections = mockInspections.length
  const passedInspections = mockInspections.filter(i => i.status === "Passed").length
  const failedInspections = mockInspections.filter(i => i.status === "Failed").length
  const overdueInspections = mockInspections.filter(i => i.status === "Overdue").length
  const openNCRs = mockNCRs.filter(n => n.status === "Open" || n.status === "Under Review").length
  const criticalNCRs = mockNCRs.filter(n => n.severity === "Critical").length
  const openCAPAs = mockCAPAs.filter(c => c.status === "Open" || c.status === "In Progress").length
  const failedTests = mockMaterialTests.filter(t => t.result === "Fail").length

  const complianceScore = Math.round(((passedInspections + (totalInspections - failedInspections - overdueInspections)) / totalInspections) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">Quality Control & Safety Compliance</h1>
          <p className="text-muted-foreground">
            Unified QA/QC and Safety management following Philippine construction standards
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600" 
            onClick={() => setShowAddNCR(true)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            File NCR
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {(criticalNCRs > 0 || overdueInspections > 0 || failedTests > 0) && (
        <div className="space-y-3">
          {criticalNCRs > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 dark:text-red-200">Critical Non-Conformance Alert</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300">
                {criticalNCRs} critical NCR{criticalNCRs > 1 ? 's' : ''} require immediate attention and DOLE reporting
              </AlertDescription>
            </Alert>
          )}
          {overdueInspections > 0 && (
            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertTitle className="text-yellow-800 dark:text-yellow-200">Overdue Inspections</AlertTitle>
              <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                {overdueInspections} inspection{overdueInspections > 1 ? 's are' : ' is'} overdue and may affect project compliance
              </AlertDescription>
            </Alert>
          )}
          {failedTests > 0 && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 dark:text-red-200">Failed Material Tests</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300">
                {failedTests} material test{failedTests > 1 ? 's have' : ' has'} failed - immediate corrective action required
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Dashboard Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        <Card className="border-red-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open NCRs</p>
                <p className="text-2xl font-bold text-red-600">{openNCRs}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active CAPAs</p>
                <p className="text-2xl font-bold text-blue-600">{openCAPAs}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-yellow-200">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Items</p>
                <p className="text-2xl font-bold text-yellow-600">{overdueInspections}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="ncr">NCRs</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="capa">CAPA</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Inspections</CardTitle>
                <CardDescription>Latest quality and safety inspections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockInspections.slice(0, 3).map(inspection => (
                  <div key={inspection.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{inspection.title}</span>
                      <Badge className={getStatusColor(inspection.status)}>
                        {inspection.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Project: {inspection.project}</span>
                        <span>Inspector: {inspection.inspector}</span>
                      </div>
                      <div>Standard: {inspection.standard}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active NCRs & Violations</CardTitle>
                <CardDescription>Non-conformances requiring attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockNCRs.filter(ncr => ncr.status === "Open" || ncr.status === "Under Review").map(ncr => (
                  <div key={ncr.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(ncr.severity)}>
                          {ncr.severity}
                        </Badge>
                        <span className="font-medium">{ncr.ncrNumber}</span>
                      </div>
                      <Badge className={getStatusColor(ncr.status)} variant="outline">
                        {ncr.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{ncr.title}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Project: {ncr.project}</span>
                      <span>Due: {new Date(ncr.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Material Test Results</CardTitle>
                <CardDescription>Recent laboratory test results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockMaterialTests.map(test => (
                  <div key={test.id} className={`border rounded-lg p-3 ${test.result === "Fail" ? "bg-red-50 dark:bg-red-950/20" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{test.testType}</span>
                      <Badge className={getStatusColor(test.result)}>
                        {test.result}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Material: {test.material}</div>
                      <div className="flex items-center justify-between">
                        <span>Standard: {test.standardValue}</span>
                        <span>Actual: {test.actualValue}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CAPA Status</CardTitle>
                <CardDescription>Corrective and preventive actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockCAPAs.map(capa => (
                  <div key={capa.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeverityColor(capa.priority)}>
                          {capa.priority}
                        </Badge>
                        <span className="font-medium">{capa.capaNumber}</span>
                      </div>
                      <Badge className={getStatusColor(capa.status)} variant="outline">
                        {capa.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{capa.title}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Assigned: {capa.assignedTo}</span>
                      <span>Due: {new Date(capa.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Standards Tab */}
        <TabsContent value="standards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Philippine Construction Standards & Regulations</CardTitle>
              <CardDescription>DPWH, DOLE, OSHC, PNS, and ISO standards repository</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search standards..." className="pl-10" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Standard
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {["DPWH", "DOLE", "OSHC", "PNS", "ISO", "Project Specific"].map(category => {
                    const standards = mockStandards.filter(s => s.category === category)
                    return (
                      <Card key={category}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">{category} Standards</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {standards.map(standard => (
                            <div key={standard.id} className="border rounded p-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium">{standard.code}</span>
                                <Badge className={getStatusColor(standard.status)} variant="outline">
                                  {standard.status}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">{standard.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">Version: {standard.version}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inspections Tab */}
        <TabsContent value="inspections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quality & Safety Inspections</CardTitle>
              <CardDescription>Unified calendar and tracking of all inspections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inspections..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="pre-construction">Pre-Construction</SelectItem>
                      <SelectItem value="ongoing">Ongoing Works</SelectItem>
                      <SelectItem value="turnover">Turnover</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="material">Material</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Inspection
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Inspection</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Results</TableHead>
                      <TableHead>Standard</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockInspections.map((inspection) => (
                      <TableRow key={inspection.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{inspection.title}</div>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{inspection.location}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{inspection.type}</Badge>
                        </TableCell>
                        <TableCell>{inspection.project}</TableCell>
                        <TableCell>{inspection.inspector}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(inspection.status)}>
                            {inspection.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {inspection.status === "Passed" || inspection.status === "Failed" ? (
                            <div className="text-sm">
                              <div className="text-green-600">✓ {inspection.passedItems}</div>
                              <div className="text-red-600">✗ {inspection.failedItems}</div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-muted-foreground">
                            {inspection.standard}
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
                                View Checklist
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckSquare className="mr-2 h-4 w-4" />
                                Complete Inspection
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                File NCR
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

        {/* NCRs Tab */}
        <TabsContent value="ncr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Non-Conformance Reports & Safety Violations</CardTitle>
              <CardDescription>Track NCRs and DOLE safety violations with evidence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search NCRs..." className="pl-10" />
                  </div>
                  <Button onClick={() => setShowAddNCR(true)} className="bg-red-500 hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    File NCR
                  </Button>
                  <Button variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Safety Violation
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NCR/Violation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Standard</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockNCRs.map((ncr) => (
                      <TableRow key={ncr.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedNCR(ncr)}>
                          <div>
                            <div className="font-medium">{ncr.ncrNumber}</div>
                            <div className="text-sm text-muted-foreground">{ncr.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ncr.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(ncr.severity)}>
                            {ncr.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(ncr.status)}>
                            {ncr.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ncr.project}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{new Date(ncr.dueDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-muted-foreground">{ncr.standard}</div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedNCR(ncr)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Target className="mr-2 h-4 w-4" />
                                Create CAPA
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Camera className="mr-2 h-4 w-4" />
                                Add Evidence
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

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Material Tests & Safety Certificates</CardTitle>
              <CardDescription>Laboratory test results and compliance certificates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search test results..." className="pl-10" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <TestTube className="h-4 w-4 mr-2" />
                    Upload Test Result
                  </Button>
                  <Button variant="outline">
                    <FileCheck className="h-4 w-4 mr-2" />
                    Add Certificate
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Type</TableHead>
                      <TableHead>Material</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Values</TableHead>
                      <TableHead>Testing Lab</TableHead>
                      <TableHead>Standard</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMaterialTests.map((test) => (
                      <TableRow key={test.id} className={test.result === "Fail" ? "bg-red-50 dark:bg-red-950/20" : ""}>
                        <TableCell>
                          <Badge variant="outline">{test.testType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{test.material}</div>
                        </TableCell>
                        <TableCell>{test.project}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(test.result)}>
                            {test.result}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Std: {test.standardValue}</div>
                            <div className={test.result === "Fail" ? "text-red-600 font-medium" : "text-green-600"}>
                              Act: {test.actualValue}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{test.testingLab}</div>
                            <div className="text-muted-foreground">{test.certificateNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs text-muted-foreground">{test.standard}</div>
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
                              {test.result === "Fail" && (
                                <DropdownMenuItem>
                                  <AlertTriangle className="mr-2 h-4 w-4" />
                                  File NCR
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Retest
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

        {/* CAPA Tab */}
        <TabsContent value="capa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Corrective & Preventive Actions (CAPA)</CardTitle>
              <CardDescription>Track corrective and preventive actions from NCRs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search CAPAs..." className="pl-10" />
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Target className="h-4 w-4 mr-2" />
                    Create CAPA
                  </Button>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CAPA</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Related NCR</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCAPAs.map((capa) => (
                      <TableRow key={capa.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell onClick={() => setSelectedCAPA(capa)}>
                          <div>
                            <div className="font-medium">{capa.capaNumber}</div>
                            <div className="text-sm text-muted-foreground">{capa.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{capa.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(capa.priority)}>
                            {capa.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(capa.status)}>
                            {capa.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{capa.assignedTo}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{new Date(capa.dueDate).toLocaleDateString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-blue-600">{capa.relatedNCR}</span>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedCAPA(capa)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Update Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Mark Complete
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
              <CardTitle>Audit Logs & Compliance Reports</CardTitle>
              <CardDescription>Audit trails and regulatory compliance reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Scale className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Audit Management System</h3>
                <p className="text-muted-foreground mb-4">
                  Complete audit trails for DOLE, DPWH, and client reporting requirements
                </p>
                <div className="grid gap-4 md:grid-cols-3 max-w-2xl mx-auto">
                  <Button variant="outline" className="p-4 h-auto flex-col">
                    <FileText className="h-8 w-8 mb-2" />
                    <span>Generate DOLE Report</span>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto flex-col">
                    <Building className="h-8 w-8 mb-2" />
                    <span>DPWH Compliance</span>
                  </Button>
                  <Button variant="outline" className="p-4 h-auto flex-col">
                    <Award className="h-8 w-8 mb-2" />
                    <span>ISO 9001 Audit</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* NCR Details Dialog */}
      <Dialog open={!!selectedNCR} onOpenChange={() => setSelectedNCR(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Non-Conformance Report Details</DialogTitle>
            <DialogDescription>
              Complete NCR information and corrective actions
            </DialogDescription>
          </DialogHeader>
          {selectedNCR && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedNCR.ncrNumber}</h3>
                  <p className="text-muted-foreground">{selectedNCR.title}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getSeverityColor(selectedNCR.severity)}>
                      {selectedNCR.severity}
                    </Badge>
                    <Badge className={getStatusColor(selectedNCR.status)} variant="outline">
                      {selectedNCR.status}
                    </Badge>
                    <Badge variant="outline">{selectedNCR.type}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm">{selectedNCR.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium">NCR Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Project:</span>
                      <span className="text-sm">{selectedNCR.project}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Location:</span>
                      <span className="text-sm">{selectedNCR.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Raised By:</span>
                      <span className="text-sm">{selectedNCR.raisedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date Raised:</span>
                      <span className="text-sm">{new Date(selectedNCR.raisedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Assignment & Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Assigned To:</span>
                      <span className="text-sm">{selectedNCR.assignedTo || "Unassigned"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Due Date:</span>
                      <span className="text-sm">{new Date(selectedNCR.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Standard:</span>
                      <span className="text-sm">{selectedNCR.standard}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Evidence & Documentation</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNCR.evidence.map((evidence, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer">
                      <Camera className="h-3 w-3 mr-1" />
                      {evidence}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Create CAPA
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Reassign
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

      {/* CAPA Details Dialog */}
      <Dialog open={!!selectedCAPA} onOpenChange={() => setSelectedCAPA(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>CAPA Details</DialogTitle>
            <DialogDescription>
              Corrective and Preventive Action information
            </DialogDescription>
          </DialogHeader>
          {selectedCAPA && (
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Target className="h-16 w-16 text-blue-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedCAPA.capaNumber}</h3>
                  <p className="text-muted-foreground">{selectedCAPA.title}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getSeverityColor(selectedCAPA.priority)}>
                      {selectedCAPA.priority}
                    </Badge>
                    <Badge className={getStatusColor(selectedCAPA.status)} variant="outline">
                      {selectedCAPA.status}
                    </Badge>
                    <Badge variant="outline">{selectedCAPA.type}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm">{selectedCAPA.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Root Cause Analysis</h4>
                  <p className="text-sm">{selectedCAPA.rootCause}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Proposed Action</h4>
                  <p className="text-sm">{selectedCAPA.proposedAction}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Related NCR:</span>
                    <span className="text-sm text-blue-600">{selectedCAPA.relatedNCR}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Project:</span>
                    <span className="text-sm">{selectedCAPA.project}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Assigned To:</span>
                    <span className="text-sm">{selectedCAPA.assignedTo}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Due Date:</span>
                    <span className="text-sm">{new Date(selectedCAPA.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Priority:</span>
                    <span className="text-sm">{selectedCAPA.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className="text-sm">{selectedCAPA.status}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Progress
                </Button>
                <Button variant="outline">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Reassign
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}