import { createContext, useContext, useState, ReactNode } from "react"

type Page = "dashboard" | "projects" | "personnel" | "equipment" | "safety" | "quality" | "analytics" | "users" | "settings" | "maintenance" | "project-detail" | "add-project"

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
  navigateToAddProject: () => void
  navigateBack: () => void
  previousPage: Page | null
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
  const [previousPage, setPreviousPage] = useState<Page | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const navigateToProject = (project: Project) => {
    setPreviousPage(currentPage)
    setSelectedProject(project)
    setCurrentPage("project-detail")
  }

  const navigateToAddProject = () => {
    setPreviousPage(currentPage)
    setSelectedProject(null)
    setCurrentPage("add-project")
  }

  const navigateBack = () => {
    if (currentPage === "project-detail" || currentPage === "add-project") {
      setSelectedProject(null)
      setCurrentPage("projects")
    } else if (previousPage) {
      setCurrentPage(previousPage)
      setPreviousPage(null)
    } else {
      setCurrentPage("dashboard")
    }
  }

  const handleSetCurrentPage = (page: Page) => {
    setPreviousPage(currentPage)
    setCurrentPage(page)
    if (page !== "project-detail" && page !== "add-project") {
      setSelectedProject(null)
    }
  }

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      setCurrentPage: handleSetCurrentPage, 
      selectedProject, 
      setSelectedProject,
      navigateToProject,
      navigateToAddProject,
      navigateBack,
      previousPage
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export type { Project }