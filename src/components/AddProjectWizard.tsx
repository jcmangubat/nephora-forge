import { useState } from "react"
import { 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  X, 
  Calendar, 
  User, 
  MapPin, 
  Users, 
  Target, 
  DollarSign,
  Upload,
  CheckCircle,
  FileText,
  Building
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Separator } from "./ui/separator"
import { useNavigation, Project } from "./NavigationProvider"

interface ProjectFormData {
  // Project Metadata
  code: string
  name: string
  description: string
  status: "Planned" | "In Progress" | "Completed" | "On Hold"
  startDate: string
  endDate: string
  managerId: string
  
  // Location & Client
  clientName: string
  location: string
  
  // Team & Resources
  teamMembers: string[]
  estimatedTeamSize: number
  
  // Milestones
  milestones: Array<{ name: string; dueDate: string; description: string }>
  
  // Budget
  estimatedBudget: string
  currency: string
  
  // Attachments
  attachments: File[]
}

const initialFormData: ProjectFormData = {
  code: "",
  name: "",
  description: "",
  status: "Planned",
  startDate: "",
  endDate: "",
  managerId: "",
  clientName: "",
  location: "",
  teamMembers: [],
  estimatedTeamSize: 1,
  milestones: [{ name: "", dueDate: "", description: "" }],
  estimatedBudget: "",
  currency: "USD",
  attachments: []
}

const mockUsers = [
  { id: "1", name: "Sarah Chen", role: "Project Manager" },
  { id: "2", name: "John Smith", role: "Site Engineer" },
  { id: "3", name: "Mike Rodriguez", role: "Construction Supervisor" },
  { id: "4", name: "Lisa Wang", role: "Electrical Engineer" },
  { id: "5", name: "David Park", role: "Steel Worker" },
  { id: "6", name: "Emily Johnson", role: "Safety Inspector" }
]

const generateProjectCode = (): string => {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `PRJ-${year}-${random}`
}

export function AddProjectWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProjectFormData>({
    ...initialFormData,
    code: generateProjectCode()
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { navigateBack } = useNavigation()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Project name is required"
        if (!formData.startDate) newErrors.startDate = "Start date is required"
        if (!formData.endDate) newErrors.endDate = "End date is required"
        if (!formData.managerId) newErrors.managerId = "Project manager is required"
        if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
          newErrors.endDate = "End date must be after start date"
        }
        break
      case 2:
        if (!formData.clientName.trim()) newErrors.clientName = "Client name is required"
        if (!formData.location.trim()) newErrors.location = "Project location is required"
        break
      case 3:
        if (formData.estimatedTeamSize < 1) newErrors.estimatedTeamSize = "Team size must be at least 1"
        break
      case 4:
        // Final validation - check all required fields
        if (!formData.name.trim()) newErrors.name = "Project name is required"
        if (!formData.clientName.trim()) newErrors.clientName = "Client name is required"
        if (!formData.location.trim()) newErrors.location = "Project location is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { name: "", dueDate: "", description: "" }]
    }))
  }

  const updateMilestone = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) => 
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }))
  }

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    if (validateStep(4)) {
      // Create new project object
      const newProject: Project = {
        id: Date.now().toString(),
        code: formData.code,
        name: formData.name,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        progress: 0,
        phase: formData.status,
        manager: {
          name: mockUsers.find(u => u.id === formData.managerId)?.name || "Unknown",
          avatar: ""
        },
        teamSize: formData.estimatedTeamSize,
        budget: formData.estimatedBudget || "TBD",
        location: formData.location
      }

      // In a real app, you would save this to your backend
      console.log("Creating new project:", newProject)
      
      // Navigate back to projects page
      navigateBack()
    }
  }

  const handleSaveDraft = () => {
    // In a real app, you would save the draft to your backend
    console.log("Saving draft:", formData)
    navigateBack()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project-code">Project Code</Label>
                <Input
                  id="project-code"
                  value={formData.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                  placeholder="e.g., PRJ-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planned">Planned</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter project name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the project objectives and scope"
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date *</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  className={errors.startDate ? "border-red-500" : ""}
                />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date *</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-manager">Project Manager *</Label>
              <Select value={formData.managerId} onValueChange={(value) => handleInputChange("managerId", value)}>
                <SelectTrigger className={errors.managerId ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select project manager" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.filter(user => user.role.includes("Manager") || user.role.includes("Engineer")).map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} - {user.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.managerId && <p className="text-sm text-red-500">{errors.managerId}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="client-name">Client Name *</Label>
              <Input
                id="client-name"
                value={formData.clientName}
                onChange={(e) => handleInputChange("clientName", e.target.value)}
                placeholder="Enter client or company name"
                className={errors.clientName ? "border-red-500" : ""}
              />
              {errors.clientName && <p className="text-sm text-red-500">{errors.clientName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-location">Project Location *</Label>
              <Textarea
                id="project-location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter project address or location details"
                rows={3}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
              <p className="text-sm text-muted-foreground">
                Include full address, city, state, and any relevant location details
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Additional Location Details</CardTitle>
                <CardDescription>Optional information about the project site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="site-access">Site Access Notes</Label>
                    <Input
                      id="site-access"
                      placeholder="e.g., Gate code, contact person"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parking">Parking Information</Label>
                    <Input
                      id="parking"
                      placeholder="e.g., On-site parking available"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="team-size">Estimated Team Size *</Label>
              <Input
                id="team-size" 
                type="number"
                min="1"
                value={formData.estimatedTeamSize}
                onChange={(e) => handleInputChange("estimatedTeamSize", parseInt(e.target.value) || 1)}
                className={errors.estimatedTeamSize ? "border-red-500" : ""}
              />
              {errors.estimatedTeamSize && <p className="text-sm text-red-500">{errors.estimatedTeamSize}</p>}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Key Milestones</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMilestone}>
                  <Target className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </div>
              
              {formData.milestones.map((milestone, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Milestone {index + 1}</h4>
                        {formData.milestones.length > 1 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeMilestone(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Milestone Name</Label>
                          <Input
                            value={milestone.name}
                            onChange={(e) => updateMilestone(index, "name", e.target.value)}
                            placeholder="e.g., Foundation Complete"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Target Date</Label>
                          <Input
                            type="date"
                            value={milestone.dueDate}
                            onChange={(e) => updateMilestone(index, "dueDate", e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={milestone.description}
                          onChange={(e) => updateMilestone(index, "description", e.target.value)}
                          placeholder="Describe what constitutes completion of this milestone"
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Budget Information (Optional)</CardTitle>
                <CardDescription>You can add detailed budget information later</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimated Budget</Label>
                    <Input
                      id="budget"
                      value={formData.estimatedBudget}
                      onChange={(e) => handleInputChange("estimatedBudget", e.target.value)}
                      placeholder="e.g., $500,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Review Project Details</h3>
              <p className="text-muted-foreground">Please review all information before creating the project</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Code:</span>
                    <span className="font-mono">{formData.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary">{formData.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manager:</span>
                    <span>{mockUsers.find(u => u.id === formData.managerId)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>
                      {formData.startDate && formData.endDate && 
                        `${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Building className="h-4 w-4 mr-2" />
                    Client & Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Client:</span>
                    <span className="font-medium">{formData.clientName}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="text-sm mt-1">{formData.location}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Team & Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Size:</span>
                    <span>{formData.estimatedTeamSize} members</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Milestones:</span>
                    <span>{formData.milestones.filter(m => m.name.trim()).length} defined</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Budget
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Budget:</span>
                    <span>{formData.estimatedBudget || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span>{formData.currency}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {formData.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{formData.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const stepTitles = [
    "Project Details",
    "Location & Client", 
    "Team & Resources",
    "Review & Submit"
  ]

  const stepIcons = [FileText, MapPin, Users, CheckCircle]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={navigateBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          <div>
            <h1 className="text-orange-800 dark:text-orange-200">Create New Project</h1>
            <p className="text-muted-foreground">Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="ghost" onClick={navigateBack}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="flex items-center justify-between">
              {stepTitles.map((title, index) => {
                const StepIcon = stepIcons[index]
                const stepNumber = index + 1
                const isActive = stepNumber === currentStep
                const isCompleted = stepNumber < currentStep
                
                return (
                  <div key={title} className="flex flex-col items-center space-y-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isCompleted ? "bg-green-500 border-green-500 text-white" :
                      isActive ? "bg-orange-500 border-orange-500 text-white" :
                      "bg-background border-muted-foreground/30"
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span className={`text-xs text-center max-w-20 ${
                      isActive ? "font-medium" : "text-muted-foreground"
                    }`}>
                      {title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {(() => {
              const CurrentStepIcon = stepIcons[currentStep - 1]
              return <CurrentStepIcon className="h-5 w-5 mr-2" />
            })()}
            {stepTitles[currentStep - 1]}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter basic project information and timeline"}
            {currentStep === 2 && "Specify client details and project location"}
            {currentStep === 3 && "Define team requirements and key milestones"}
            {currentStep === 4 && "Review all details before creating the project"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex items-center space-x-2">
          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="bg-orange-500 hover:bg-orange-600">
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}