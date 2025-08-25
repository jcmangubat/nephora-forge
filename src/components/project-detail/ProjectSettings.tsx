import { useState } from "react"
import { 
  Settings, 
  Save, 
  AlertTriangle,
  Lock,
  Users,
  Calendar,
  DollarSign,
  MapPin,
  Edit,
  Trash2
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import { Project } from "../NavigationProvider"

interface ProjectSettingsProps {
  project: Project
}

export function ProjectSettings({ project }: ProjectSettingsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    location: project.location,
    budget: project.budget,
    phase: project.phase,
    manager: project.manager.name,
    teamSize: project.teamSize.toString(),
    startDate: project.startDate,
    endDate: project.endDate
  })

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    taskAssignments: true,
    deadlineAlerts: true,
    statusChanges: false,
    teamUpdates: true
  })

  const [permissions, setPermissions] = useState({
    publicView: false,
    teamEdit: true,
    guestAccess: false,
    exportData: true
  })

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false)
  }

  const handleReset = () => {
    setFormData({
      name: project.name,
      description: project.description,
      location: project.location,
      budget: project.budget,
      phase: project.phase,
      manager: project.manager.name,
      teamSize: project.teamSize.toString(),
      startDate: project.startDate,
      endDate: project.endDate
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Project Settings</h2>
          <p className="text-muted-foreground">Configure project preferences and permissions</p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Basic project details and configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-location">Location</Label>
                <Input
                  id="project-location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-budget">Budget</Label>
                <Input
                  id="project-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-phase">Project Phase</Label>
              <Select value={formData.phase} onValueChange={(value) => setFormData(prev => ({ ...prev, phase: value }))} disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Team & Access */}
        <Card>
          <CardHeader>
            <CardTitle>Team & Access</CardTitle>
            <CardDescription>Manage team settings and access permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-manager">Project Manager</Label>
              <Input
                id="project-manager"
                value={formData.manager}
                onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="team-size">Team Size</Label>
              <Input
                id="team-size"
                type="number"
                value={formData.teamSize}
                onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value }))}
                disabled={!isEditing}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Access Permissions</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-view">Public View</Label>
                    <p className="text-sm text-muted-foreground">Allow public viewing of project</p>
                  </div>
                  <Switch
                    id="public-view"
                    checked={permissions.publicView}
                    onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, publicView: checked }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="team-edit">Team Edit Access</Label>
                    <p className="text-sm text-muted-foreground">Allow team members to edit project</p>
                  </div>
                  <Switch
                    id="team-edit"
                    checked={permissions.teamEdit}
                    onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, teamEdit: checked }))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="guest-access">Guest Access</Label>
                    <p className="text-sm text-muted-foreground">Allow guest users to view project</p>
                  </div>
                  <Switch
                    id="guest-access"
                    checked={permissions.guestAccess}
                    onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, guestAccess: checked }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure when and how you receive project notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Email Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-updates">Project Updates</Label>
                    <p className="text-sm text-muted-foreground">General project status updates</p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailUpdates: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="task-assignments">Task Assignments</Label>
                    <p className="text-sm text-muted-foreground">When tasks are assigned to you</p>
                  </div>
                  <Switch
                    id="task-assignments"
                    checked={notifications.taskAssignments}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, taskAssignments: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="deadline-alerts">Deadline Alerts</Label>
                    <p className="text-sm text-muted-foreground">Upcoming deadlines and overdue items</p>
                  </div>
                  <Switch
                    id="deadline-alerts"
                    checked={notifications.deadlineAlerts}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, deadlineAlerts: checked }))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Team Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="status-changes">Status Changes</Label>
                    <p className="text-sm text-muted-foreground">When project status is updated</p>
                  </div>
                  <Switch
                    id="status-changes"
                    checked={notifications.statusChanges}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, statusChanges: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="team-updates">Team Updates</Label>
                    <p className="text-sm text-muted-foreground">Team member additions or changes</p>
                  </div>
                  <Switch
                    id="team-updates"
                    checked={notifications.teamUpdates}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, teamUpdates: checked }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for this project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <div>
              <h4 className="font-medium text-red-600 dark:text-red-400">Archive Project</h4>
              <p className="text-sm text-muted-foreground">Archive this project and remove it from active projects</p>
            </div>
            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400">
              Archive
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <div>
              <h4 className="font-medium text-red-600 dark:text-red-400">Delete Project</h4>
              <p className="text-sm text-muted-foreground">Permanently delete this project and all associated data</p>
            </div>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}