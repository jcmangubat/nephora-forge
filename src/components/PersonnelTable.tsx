import { useState } from "react"
import { MoreHorizontal, UserPlus, Search, HardHat, Shield, Wrench } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

const personnel = [
  {
    id: "1",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@nephoraforge.com",
    role: "Site Foreman",
    certification: "OSHA 30",
    status: "On Site",
    project: "Downtown Office Complex",
    lastActive: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Chua",
    email: "sarah.chen@nephoraforge.com",
    role: "Safety Inspector",
    certification: "CSP, CHST",
    status: "On Site",
    project: "Industrial Warehouse",
    lastActive: "30 minutes ago",
  },
  {
    id: "3",
    name: "David Thompson",
    email: "david.thompson@nephoraforge.com",
    role: "Equipment Operator",
    certification: "NCCCO Crane",
    status: "Off Duty",
    project: "Residential Complex",
    lastActive: "Yesterday",
  },
  {
    id: "4",
    name: "Lisa Williams",
    email: "lisa.williams@nephoraforge.com",
    role: "Project Manager",
    certification: "PMP, CCM",
    status: "On Site",
    project: "Bridge Construction",
    lastActive: "1 hour ago",
  },
  {
    id: "5",
    name: "Carlos Martinez",
    email: "carlos.martinez@nephoraforge.com",
    role: "Quality Control",
    certification: "ACI Certified",
    status: "Training",
    project: "Highway Expansion",
    lastActive: "4 hours ago",
  },
]

export function PersonnelTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPersonnel = personnel.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.project.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "On Site":
        return "default"
      case "Off Duty":
        return "secondary"
      case "Training":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getRoleIcon = (role: string) => {
    if (role.includes("Safety")) return Shield
    if (role.includes("Equipment") || role.includes("Operator")) return Wrench
    return HardHat
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Personnel Management</CardTitle>
            <CardDescription>Manage construction workers, certifications, and assignments</CardDescription>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Personnel
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search personnel, projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Certification</TableHead>
              <TableHead>Current Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPersonnel.map((person) => {
              const RoleIcon = getRoleIcon(person.role)
              return (
                <TableRow key={person.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <RoleIcon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div>{person.name}</div>
                        <div className="text-sm text-muted-foreground">{person.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{person.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{person.certification}</Badge>
                  </TableCell>
                  <TableCell>{person.project}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(person.status)}>
                      {person.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{person.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Update assignment</DropdownMenuItem>
                        <DropdownMenuItem>View certifications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Mark inactive</DropdownMenuItem>
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
  )
}