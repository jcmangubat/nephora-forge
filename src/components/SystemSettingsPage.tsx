import React, { useState } from "react";
import {
  Settings,
  Users,
  CreditCard,
  Bell,
  Shield,
  Link,
  FolderCog,
  Globe,
  Archive,
  Code,
  Palette,
  Database,
  FileText,
  Building,
  User,
  DollarSign,
  Mail,
  Lock,
  Cloud,
  Workflow,
  Calendar,
  HardDrive,
  Key,
  Brush,
  Save,
  Upload,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Trash2,
  Plus,
  Edit,
  Camera,
  Phone,
  MessageSquare,
  Smartphone,
  Zap,
  BarChart3,
  FileCheck,
  Webhook,
  ExternalLink,
  RotateCcw,
  Check,
  X,
  Info,
  Star,
  Crown,
  Flag,
  Map,
  Clock4,
  Languages,
  Banknote,
  Receipt,
  CreditCard as CreditCardIcon,
  Calendar as CalendarIcon,
  Timer,
  FolderOpen,
  FileArchive,
  Cpu,
  Terminal,
  Wrench,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
  category: string;
}

interface Integration {
  name: string;
  description: string;
  status: "Connected" | "Disconnected" | "Error";
  lastSync: string;
  icon: any;
}

interface UserRole {
  name: string;
  permissions: string[];
  userCount: number;
  description: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    user: "John dela Cruz",
    action: "Updated role permissions",
    timestamp: "Aug 25, 2025, 3:45 PM",
    details: "Modified Project Manager permissions to include budget approval",
    category: "Security",
  },
  {
    id: "2",
    user: "Maria Santos",
    action: "Changed system timezone",
    timestamp: "Aug 24, 2025, 10:30 AM",
    details: "Updated default timezone from GMT+0 to Asia/Manila",
    category: "General",
  },
  {
    id: "3",
    user: "Admin System",
    action: "Automatic backup completed",
    timestamp: "Aug 25, 2025, 2:01 AM",
    details: "Daily backup successfully stored to Azure Blob Storage",
    category: "System",
  },
  {
    id: "4",
    user: "Liza Bautista",
    action: "Updated notification settings",
    timestamp: "Aug 23, 2025, 4:20 PM",
    details: "Enabled SMS alerts for safety incidents",
    category: "Notifications",
  },
];

const mockIntegrations: Integration[] = [
  {
    name: "Microsoft Azure",
    description: "Cloud storage and backup services",
    status: "Connected",
    lastSync: "Aug 25, 2025, 2:01 AM",
    icon: Cloud,
  },
  {
    name: "QuickBooks Philippines",
    description: "Accounting and financial management",
    status: "Connected",
    lastSync: "Aug 25, 2025, 11:30 PM",
    icon: Receipt,
  },
  {
    name: "Sprout Solutions",
    description: "HR and payroll management",
    status: "Connected",
    lastSync: "Aug 24, 2025, 6:00 PM",
    icon: Users,
  },
  {
    name: "Smart SMS Gateway",
    description: "SMS notifications and alerts",
    status: "Connected",
    lastSync: "Aug 25, 2025, 8:15 AM",
    icon: MessageSquare,
  },
  {
    name: "Google Calendar",
    description: "Project scheduling and calendar sync",
    status: "Disconnected",
    lastSync: "Aug 20, 2025, 3:00 PM",
    icon: CalendarIcon,
  },
];

const mockRoles: UserRole[] = [
  {
    name: "Admin",
    permissions: [
      "full_access",
      "user_management",
      "system_settings",
      "billing",
    ],
    userCount: 3,
    description: "Complete system access and administrative privileges",
  },
  {
    name: "Project Manager",
    permissions: [
      "project_management",
      "team_oversight",
      "budget_approval",
      "reporting",
    ],
    userCount: 8,
    description: "Project oversight and team management",
  },
  {
    name: "Site Engineer",
    permissions: ["engineering_tools", "technical_reports", "quality_control"],
    userCount: 12,
    description: "Technical engineering and site supervision",
  },
  {
    name: "Safety Officer",
    permissions: [
      "safety_compliance",
      "incident_management",
      "training_oversight",
    ],
    userCount: 4,
    description: "Safety oversight and compliance management",
  },
];

export function SystemSettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedTab, setSelectedTab] = useState("general");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Disconnected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-orange-800 dark:text-orange-200">
            System Settings
          </h1>
          <p className="text-muted-foreground">
            Central configuration hub for Santos Construction Group
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Organization Info Banner */}
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
        <CardContent className="pt-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                Santos Construction Group
              </h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Enterprise Plan • 45 Active Users • Valid until Aug 15, 2026
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-7 lg:grid-cols-13">
          <TabsTrigger value="general" className="text-xs">
            General
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xs">
            Users
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-xs">
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="text-xs">
            Security
          </TabsTrigger>
          <TabsTrigger value="integrations" className="text-xs">
            Integrations
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-xs">
            Projects
          </TabsTrigger>
          <TabsTrigger value="localization" className="text-xs">
            Localization
          </TabsTrigger>
          <TabsTrigger value="retention" className="text-xs">
            Data
          </TabsTrigger>
          <TabsTrigger value="api" className="text-xs">
            API
          </TabsTrigger>
          <TabsTrigger value="branding" className="text-xs">
            Branding
          </TabsTrigger>
          <TabsTrigger value="backup" className="text-xs">
            Backup
          </TabsTrigger>
          <TabsTrigger value="license" className="text-xs">
            License
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>
                Basic organization and system configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    defaultValue="Santos Construction Group"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-prefix">Default Project Prefix</Label>
                  <Input id="project-prefix" defaultValue="NCF-2025" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">System Timezone</Label>
                  <Select defaultValue="asia-manila">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-manila">
                        Asia/Manila (GMT+8)
                      </SelectItem>
                      <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                      <SelectItem value="asia-singapore">
                        Asia/Singapore (GMT+8)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="php">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="php">Philippine Peso (₱)</SelectItem>
                      <SelectItem value="usd">US Dollar ($)</SelectItem>
                      <SelectItem value="sgd">Singapore Dollar (S$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-address">Company Address</Label>
                <Textarea
                  id="company-address"
                  defaultValue="Unit 1504, Ortigas Center, Pasig City, Metro Manila, Philippines 1605"
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">System Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-save drafts</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save form drafts every 30 seconds
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable system maintenance alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify users before scheduled maintenance
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow file uploads from mobile</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable mobile file uploads and photo capture
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User & Role Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User & Role Management</span>
              </CardTitle>
              <CardDescription>
                Manage user roles, permissions, and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">System Roles</h4>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Role
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {mockRoles.map((role, index) => (
                    <Card key={index} className="border-2">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center space-x-2">
                            <Crown className="h-4 w-4 text-orange-500" />
                            <span>{role.name}</span>
                          </CardTitle>
                          <Badge variant="outline">
                            {role.userCount} users
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {role.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <span className="text-sm font-medium">
                            Permissions:
                          </span>
                          <div className="mt-2 space-y-1">
                            {role.permissions
                              .slice(0, 3)
                              .map((permission, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-2"
                                >
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span className="text-xs capitalize">
                                    {permission.replace("_", " ")}
                                  </span>
                                </div>
                              ))}
                            {role.permissions.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{role.permissions.length - 3} more permissions
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Sample Users</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span>John dela Cruz</span>
                        </div>
                      </TableCell>
                      <TableCell>Admin</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>MS</AvatarFallback>
                          </Avatar>
                          <span>Maria Santos</span>
                        </div>
                      </TableCell>
                      <TableCell>Project Manager</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>30 minutes ago</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JR</AvatarFallback>
                          </Avatar>
                          <span>Carlos Ramirez</span>
                        </div>
                      </TableCell>
                      <TableCell>Safety Officer</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>1 hour ago</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>LB</AvatarFallback>
                          </Avatar>
                          <span>Liza Bautista</span>
                        </div>
                      </TableCell>
                      <TableCell>Site Engineer</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>45 minutes ago</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financial & Billing Tab */}
        <TabsContent value="billing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Subscription & Billing</span>
                </CardTitle>
                <CardDescription>
                  Current plan and payment information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                  <Crown className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <div className="text-xl font-bold text-orange-600">
                    Enterprise Plan
                  </div>
                  <div className="text-2xl font-bold">
                    {formatCurrency(150000)}
                  </div>
                  <p className="text-sm text-muted-foreground">per year</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Last Payment:
                    </span>
                    <span className="text-sm font-medium">August 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Next Renewal:
                    </span>
                    <span className="text-sm font-medium">August 15, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Payment Method:
                    </span>
                    <span className="text-sm font-medium">
                      Credit Card (•••• 4321)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Billing Contact:
                    </span>
                    <span className="text-sm font-medium">Ana Villanueva</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h5 className="font-medium">Plan Features</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">100 Active Users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Unlimited Projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced Analytics</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Priority Support</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Update Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Usage & Billing History</span>
                </CardTitle>
                <CardDescription>
                  Monthly usage and payment history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Current Users:</span>
                    <span className="font-medium">45 / 100</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h5 className="font-medium">Recent Payments</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Aug 15, 2025</span>
                      <span className="font-medium">
                        {formatCurrency(150000)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Aug 15, 2024</span>
                      <span className="font-medium">
                        {formatCurrency(150000)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Aug 15, 2023</span>
                      <span className="font-medium">
                        {formatCurrency(120000)}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h5 className="font-medium">Billing Contacts</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Ana Villanueva</p>
                        <p className="text-xs text-muted-foreground">
                          Finance Officer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoices
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications & Communication Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification & Communication Settings</span>
              </CardTitle>
              <CardDescription>
                Configure alerts, notifications, and communication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Project Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          New milestones, task completions
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Safety Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Incident reports, safety violations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Budget Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Budget thresholds, overruns
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Automated project summaries
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">SMS Alerts</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Emergency Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Critical safety incidents
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>System Downtime</Label>
                        <p className="text-sm text-muted-foreground">
                          Planned maintenance notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Approval Requests</Label>
                        <p className="text-sm text-muted-foreground">
                          Pending approvals, signatures
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Communication Settings</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Default Email Domain</Label>
                    <Input defaultValue="@nephoraforge.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>SMS Gateway Provider</Label>
                    <Select defaultValue="smart">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smart">
                          Smart Communications
                        </SelectItem>
                        <SelectItem value="globe">Globe Telecom</SelectItem>
                        <SelectItem value="dito">DITO Telecommunity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Admin Email Recipients</Label>
                    <Textarea
                      defaultValue="juan.delacruz@nephoraforge.com, maria.santos@nephoraforge.com"
                      placeholder="Enter email addresses separated by commas"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Emergency Contact Numbers</Label>
                    <Textarea
                      defaultValue="+63917-222-3344, +63918-555-7890"
                      placeholder="Enter phone numbers separated by commas"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">In-App Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Show desktop notifications</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Play notification sounds</Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show notification badges</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Compliance Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Authentication and access control policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Authentication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require 2FA for Admins</Label>
                        <p className="text-sm text-muted-foreground">
                          Mandatory for admin and manager roles
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require 2FA for all users</Label>
                        <p className="text-sm text-muted-foreground">
                          Organization-wide 2FA requirement
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Single Sign-On (SSO)</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable SSO integration
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Password Policy</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Minimum Password Length</Label>
                      <Select defaultValue="8">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 characters</SelectItem>
                          <SelectItem value="8">8 characters</SelectItem>
                          <SelectItem value="12">12 characters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require uppercase letters</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require special characters</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require numbers</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>Password Expiry</Label>
                      <Select defaultValue="never">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Compliance & Audit</span>
                </CardTitle>
                <CardDescription>
                  Data backup and audit trail configuration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Data Backup</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">
                            Daily at 2:00 AM
                          </SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Backup Location</Label>
                      <Select defaultValue="azure">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="azure">
                            Microsoft Azure Blob Storage
                          </SelectItem>
                          <SelectItem value="aws">Amazon S3</SelectItem>
                          <SelectItem value="google">
                            Google Cloud Storage
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Last backup successful</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Aug 25, 2025, 2:01 AM
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Audit Events</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {mockAuditLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="text-xs p-2 border rounded">
                        <div className="flex justify-between">
                          <span className="font-medium">{log.user}</span>
                          <span className="text-muted-foreground">
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{log.action}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Audit Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integration Settings Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Link className="h-5 w-5" />
                <span>Third-Party Integrations</span>
              </CardTitle>
              <CardDescription>
                Connect with external services and applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockIntegrations.map((integration, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <integration.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            {integration.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {integration.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {integration.lastSync}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integration.status === "Connected" ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="w-full bg-orange-500 hover:bg-orange-600"
                          >
                            <Link className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Available Integrations</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Webhook className="h-4 w-4" />
                      <span className="font-medium">Custom Webhooks</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Set up custom webhook endpoints for real-time data
                      synchronization
                    </p>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Webhook
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="h-4 w-4" />
                      <span className="font-medium">API Connections</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect to REST APIs and external data sources
                    </p>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add API
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Project Configuration Tab */}
        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FolderCog className="h-5 w-5" />
                <span>Project Configuration</span>
              </CardTitle>
              <CardDescription>
                Default project settings and workflow configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Default Project Settings</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Default Project Template</Label>
                      <Select defaultValue="commercial">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">
                            Commercial Building - High Rise
                          </SelectItem>
                          <SelectItem value="residential">
                            Residential Development
                          </SelectItem>
                          <SelectItem value="infrastructure">
                            Infrastructure Project
                          </SelectItem>
                          <SelectItem value="renovation">
                            Renovation & Retrofit
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Default Project Manager</Label>
                      <Select defaultValue="maria">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maria">Maria Santos</SelectItem>
                          <SelectItem value="juan">John dela Cruz</SelectItem>
                          <SelectItem value="liza">Liza Bautista</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Default Budget Currency</Label>
                      <Select defaultValue="php">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="php">
                            Philippine Peso (₱)
                          </SelectItem>
                          <SelectItem value="usd">US Dollar ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Task Workflow</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded bg-gray-50 dark:bg-gray-900/50">
                      <p className="text-sm font-medium mb-2">
                        Current Workflow:
                      </p>
                      <div className="flex items-center space-x-2 text-sm">
                        <Badge variant="outline">Draft</Badge>
                        <span>→</span>
                        <Badge variant="outline">In Review</Badge>
                        <span>→</span>
                        <Badge variant="outline">Approved</Badge>
                        <span>→</span>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Customize Workflow
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">File Upload Settings</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Allowed File Types</Label>
                      <Input defaultValue="PDF, DOCX, XLSX, JPG, PNG, DWG" />
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum File Size</Label>
                      <Select defaultValue="100">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50 MB</SelectItem>
                          <SelectItem value="100">100 MB</SelectItem>
                          <SelectItem value="500">500 MB</SelectItem>
                          <SelectItem value="1000">1 GB</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Auto-virus scan uploads</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require approval for large files</Label>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Project Permissions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Allow project managers to invite users</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require approval for budget changes</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Auto-archive completed projects</Label>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <Label>Project Visibility Default</Label>
                      <Select defaultValue="team">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            Public (All Users)
                          </SelectItem>
                          <SelectItem value="team">
                            Team Members Only
                          </SelectItem>
                          <SelectItem value="private">
                            Private (Managers Only)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Localization & Regional Tab */}
        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Localization & Regional Settings</span>
              </CardTitle>
              <CardDescription>
                Language, date formats, and regional preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Language & Format Settings</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Default Language</Label>
                      <Select defaultValue="en-ph">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-ph">
                            English (Philippines)
                          </SelectItem>
                          <SelectItem value="fil">Filipino</SelectItem>
                          <SelectItem value="en-us">English (US)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Time Format</Label>
                      <Select defaultValue="24h">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                          <SelectItem value="24h">24-hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Number Format</Label>
                      <Select defaultValue="comma">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="comma">
                            1,234.56 (Comma)
                          </SelectItem>
                          <SelectItem value="space">
                            1 234.56 (Space)
                          </SelectItem>
                          <SelectItem value="period">
                            1.234,56 (Period)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Regional Settings</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Country/Region</Label>
                      <Select defaultValue="philippines">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="philippines">
                            Philippines
                          </SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="malaysia">Malaysia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Work Week</Label>
                      <Select defaultValue="mon-sat">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mon-fri">
                            Monday - Friday
                          </SelectItem>
                          <SelectItem value="mon-sat">
                            Monday - Saturday
                          </SelectItem>
                          <SelectItem value="sun-thu">
                            Sunday - Thursday
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Working Hours</Label>
                      <div className="flex items-center space-x-2">
                        <Input defaultValue="08:00" className="flex-1" />
                        <span>to</span>
                        <Input defaultValue="17:00" className="flex-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Default Timezone</Label>
                      <Select defaultValue="asia-manila">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asia-manila">
                            Asia/Manila (PHT)
                          </SelectItem>
                          <SelectItem value="asia-singapore">
                            Asia/Singapore (SGT)
                          </SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">
                  Philippine Public Holidays (2025)
                </h4>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { name: "New Year's Day", date: "Jan 1, 2025" },
                    { name: "People Power Anniversary", date: "Feb 25, 2025" },
                    { name: "Araw ng Kagitingan", date: "Apr 9, 2025" },
                    { name: "Labor Day", date: "May 1, 2025" },
                    { name: "Independence Day", date: "Jun 12, 2025" },
                    { name: "National Heroes Day", date: "Aug 25, 2025" },
                    { name: "Bonifacio Day", date: "Nov 30, 2025" },
                    { name: "Rizal Day", date: "Dec 30, 2025" },
                  ].map((holiday, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded"
                    >
                      <span className="text-sm font-medium">
                        {holiday.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {holiday.date}
                      </span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Holiday
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Retention & Archiving Tab */}
        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Archive className="h-5 w-5" />
                <span>Data Retention & Archiving</span>
              </CardTitle>
              <CardDescription>
                Configure data lifecycle and retention policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Retention Policies</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Completed Projects Retention</Label>
                      <Select defaultValue="5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 year</SelectItem>
                          <SelectItem value="3">3 years</SelectItem>
                          <SelectItem value="5">5 years</SelectItem>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>User Activity Logs</Label>
                      <Select defaultValue="2">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 year</SelectItem>
                          <SelectItem value="2">2 years</SelectItem>
                          <SelectItem value="5">5 years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Financial Records</Label>
                      <Select defaultValue="7">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 years</SelectItem>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Safety Records</Label>
                      <Select defaultValue="indefinite">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 years</SelectItem>
                          <SelectItem value="10">10 years</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Automatic Archiving</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-archive inactive projects</Label>
                        <p className="text-sm text-muted-foreground">
                          Projects with no activity for 12 months
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-delete temporary files</Label>
                        <p className="text-sm text-muted-foreground">
                          Remove temp files after 30 days
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compress archived data</Label>
                        <p className="text-sm text-muted-foreground">
                          Reduce storage size for old records
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Export Options</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-2">
                    <CardContent className="pt-4">
                      <div className="text-center space-y-2">
                        <FileText className="h-8 w-8 mx-auto text-blue-500" />
                        <p className="font-medium">CSV Export</p>
                        <p className="text-sm text-muted-foreground">
                          Spreadsheet compatible format
                        </p>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export CSV
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardContent className="pt-4">
                      <div className="text-center space-y-2">
                        <FileText className="h-8 w-8 mx-auto text-green-500" />
                        <p className="font-medium">Excel Export</p>
                        <p className="text-sm text-muted-foreground">
                          Microsoft Excel format
                        </p>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export XLSX
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardContent className="pt-4">
                      <div className="text-center space-y-2">
                        <FileText className="h-8 w-8 mx-auto text-red-500" />
                        <p className="font-medium">PDF Reports</p>
                        <p className="text-sm text-muted-foreground">
                          Formatted document reports
                        </p>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Storage Usage</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Storage Used:</span>
                    <span className="font-medium">2.4 TB / 5.0 TB</span>
                  </div>
                  <Progress value={48} className="h-2" />
                  <div className="grid gap-2 md:grid-cols-2 text-sm">
                    <div className="flex justify-between">
                      <span>Active Projects:</span>
                      <span>1.2 TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Archived Data:</span>
                      <span>800 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Uploads:</span>
                      <span>300 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>System Backups:</span>
                      <span>100 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API & Developer Tab */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>API & Developer Settings</span>
              </CardTitle>
              <CardDescription>
                API access tokens, webhooks, and developer tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">API Access Tokens</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Production API Key</span>
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value="ncf_prod_1234567890abcdef"
                          readOnly
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Created: Aug 15, 2025 • Last used: 2 hours ago
                      </p>
                    </div>

                    <div className="p-3 border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Development API Key</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          Test
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="password"
                          value="ncf_test_abcdef1234567890"
                          readOnly
                          className="flex-1"
                        />
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Created: Aug 10, 2025 • Last used: Yesterday
                      </p>
                    </div>

                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Generate New Token
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">API Configuration</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Rate Limiting</Label>
                      <Select defaultValue="1000">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100 requests/hour</SelectItem>
                          <SelectItem value="1000">
                            1,000 requests/hour
                          </SelectItem>
                          <SelectItem value="10000">
                            10,000 requests/hour
                          </SelectItem>
                          <SelectItem value="unlimited">Unlimited</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable API logging</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Require authentication for all endpoints</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>API Version</Label>
                      <Select defaultValue="v2">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="v1">v1 (Legacy)</SelectItem>
                          <SelectItem value="v2">v2 (Current)</SelectItem>
                          <SelectItem value="v3">v3 (Beta)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Webhooks</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        Project Milestone Webhook
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Triggers when a project milestone is completed
                    </p>
                    <div className="flex items-center space-x-2">
                      <Input
                        value="https://api.santos-construction.com/webhooks/milestones"
                        readOnly
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        Budget Approval Webhook
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Triggers when budget changes require approval
                    </p>
                    <div className="flex items-center space-x-2">
                      <Input
                        value="https://api.santos-construction.com/webhooks/budget"
                        readOnly
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Webhook
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Developer Resources</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">API Documentation</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complete API reference and integration guides
                    </p>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Docs
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-4 w-4" />
                      <span className="font-medium">API Testing Console</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Interactive tool for testing API endpoints
                    </p>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Console
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding & Customization Tab */}
        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Branding & Customization</span>
              </CardTitle>
              <CardDescription>
                Customize appearance, logos, and theme colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Company Branding</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Company Logo</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Building className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload your company logo
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            PNG or JPG up to 5MB, recommended 400x200px
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Login Banner Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <div className="text-center">
                          <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Upload login page banner
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Recommended 1920x1080px construction site photo
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Favicon</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                          <Building className="h-4 w-4 text-white" />
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload ICO
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Theme Colors</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Primary Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded border" />
                        <Input defaultValue="#1E40AF" className="flex-1" />
                        <Button variant="outline" size="sm">
                          <Brush className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Secondary Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-500 rounded border" />
                        <Input defaultValue="#6B7280" className="flex-1" />
                        <Button variant="outline" size="sm">
                          <Brush className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Accent Color (Orange)</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-500 rounded border" />
                        <Input defaultValue="#F97316" className="flex-1" />
                        <Button variant="outline" size="sm">
                          <Brush className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Success Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-500 rounded border" />
                        <Input defaultValue="#10B981" className="flex-1" />
                        <Button variant="outline" size="sm">
                          <Brush className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Warning Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-yellow-500 rounded border" />
                        <Input defaultValue="#F59E0B" className="flex-1" />
                        <Button variant="outline" size="sm">
                          <Brush className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Error Color</Label>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-red-500 rounded border" />
                        <Input defaultValue="#EF4444" className="flex-1" />
                        <Button variant="outline" size="sm">
                          <Brush className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Interface Customization</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Show company logo in header</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Custom login page message</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show construction theme elements</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable dark mode support</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Default Theme</Label>
                      <Select defaultValue="light">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light Mode</SelectItem>
                          <SelectItem value="dark">Dark Mode</SelectItem>
                          <SelectItem value="system">
                            System Preference
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Custom CSS</Label>
                      <Textarea
                        placeholder="Add custom CSS styles..."
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Email Templates</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span className="font-medium">Welcome Email</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Email template for new user invitations
                    </p>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <span className="font-medium">Notification Email</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Template for system notifications
                    </p>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup & Recovery Tab */}
        <TabsContent value="backup" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Backup & Recovery</span>
                </CardTitle>
                <CardDescription>
                  Data backup configuration and disaster recovery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Backup Configuration</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Every Hour</SelectItem>
                          <SelectItem value="daily">
                            Daily at 2:00 AM
                          </SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Backup Storage</Label>
                      <Select defaultValue="azure">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="azure">
                            Microsoft Azure Blob Storage
                          </SelectItem>
                          <SelectItem value="aws">Amazon S3</SelectItem>
                          <SelectItem value="google">
                            Google Cloud Storage
                          </SelectItem>
                          <SelectItem value="local">Local Storage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Retention Period</Label>
                      <Select defaultValue="90">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="365">1 year</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Compress backups</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Encrypt backups</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Manual Backup</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Create an immediate backup of all system data
                    </p>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <Database className="h-4 w-4 mr-2" />
                      Trigger Backup Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="h-5 w-5" />
                  <span>Backup Status & Recovery</span>
                </CardTitle>
                <CardDescription>
                  Current backup status and recovery options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Backups</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Successful</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Aug 25, 2025, 2:01 AM
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Successful</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Aug 24, 2025, 2:01 AM
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded bg-green-50 dark:bg-green-950/20">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Successful</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Aug 23, 2025, 2:01 AM
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Disaster Recovery</h4>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">Recovery Plan</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Download comprehensive disaster recovery procedures
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Plan
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <RotateCcw className="h-4 w-4" />
                        <span className="font-medium">
                          Point-in-Time Recovery
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Restore data to a specific point in time
                      </p>
                      <Button variant="outline" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Restore Data
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Cloud Storage Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Storage Used:</span>
                      <span className="font-medium">127 GB / 1 TB</span>
                    </div>
                    <Progress value={12.7} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Next cleanup: 60 backups will be removed on Sep 1, 2025
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* License & Legal Tab */}
        <TabsContent value="license" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>License & Legal Information</span>
              </CardTitle>
              <CardDescription>
                Software licensing, compliance, and legal documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Current License</h4>
                  <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Crown className="h-5 w-5 text-orange-500" />
                        <span className="font-semibold">
                          Enterprise License
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          License Key:
                        </span>
                        <span className="font-mono">NCF-ENT-2025-SCG-001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Valid Until:
                        </span>
                        <span>August 15, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          User Limit:
                        </span>
                        <span>100 active users</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Licensed To:
                        </span>
                        <span>Santos Construction Group</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h5 className="font-medium">License Features</h5>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Unlimited Projects</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Advanced Analytics & Reporting
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          API Access & Integrations
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Premium Support (24/7)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          White-label Customization
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">On-premise Deployment</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Compliance & Legal</h4>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileCheck className="h-4 w-4" />
                        <span className="font-medium">Terms of Service</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Last updated: August 15, 2025
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Terms
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4" />
                        <span className="font-medium">Privacy Policy</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Last updated: August 15, 2025
                      </p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Policy
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">
                          Data Processing Agreement
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        GDPR & Philippine Data Privacy Act compliant
                      </p>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download DPA
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Upload Custom Legal Documents</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Company Terms of Service
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Upload your organization's terms of service
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload PDF
                      </Button>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Compliance Policies
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Upload internal compliance documentation
                      </p>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Software Information</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Software Version:
                      </span>
                      <span className="font-medium">NephoraForge v2.1.3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Build Number:
                      </span>
                      <span className="font-medium">20250825.001</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Release Date:
                      </span>
                      <span className="font-medium">August 25, 2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Environment:
                      </span>
                      <span className="font-medium">Production</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Database Version:
                      </span>
                      <span className="font-medium">PostgreSQL 15.3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        API Version:
                      </span>
                      <span className="font-medium">v2.1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deployment:</span>
                      <span className="font-medium">Microsoft Azure</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uptime:</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">License Renewal</h4>
                <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Renewal Notice</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your license will expire on August 15, 2026. Contact your
                    account manager to renew.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Crown className="h-4 w-4 mr-2" />
                      Contact Sales
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
