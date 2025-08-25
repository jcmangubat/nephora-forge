import { createContext, useContext, useState, ReactNode } from "react"

type Page = "dashboard" | "projects" | "personnel" | "equipment" | "safety" | "quality" | "analytics" | "users" | "settings" | "maintenance" | "project-detail"

interface Project {
  id: string
  code: string
  name: string
  description: string
  startDate: string
  endDate: string
  progress: number
  phase: "Planning" | "In Progress" | "On Hold" | "Completed"
  manager: {
    name: string
    avatar?: string
  }
  teamSize: number
  budget: string
  location: string
}

interface NavigationContextType {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  navigateToProject: (project: Project) => void
  navigateBack: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}

interface NavigationProviderProps {
  children: ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const navigateToProject = (project: Project) => {
    setSelectedProject(project)
    setCurrentPage("project-detail")
  }

  const navigateBack = () => {
    setSelectedProject(null)
    setCurrentPage("projects")
  }

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      setCurrentPage, 
      selectedProject, 
      setSelectedProject,
      navigateToProject,
      navigateBack
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export type { Project }