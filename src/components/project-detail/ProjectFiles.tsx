import { useState } from "react"
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  Download, 
  Eye, 
  MoreHorizontal,
  Search,
  Filter,
  Folder
} from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu"
import { Project } from "../NavigationProvider"

interface ProjectFile {
  id: string
  name: string
  type: string
  size: string
  category: string
  uploadedBy: string
  uploadedAt: string
  url: string
}

interface ProjectFilesProps {
  project: Project
}

const mockFiles: ProjectFile[] = [
  {
    id: "1",
    name: "Architectural_Plans_v2.pdf",
    type: "pdf",
    size: "15.2 MB",
    category: "Plans",
    uploadedBy: "Sarah Chua",
    uploadedAt: "2024-08-20",
    url: "#"
  },
  {
    id: "2", 
    name: "Site_Survey_Report.pdf",
    type: "pdf",
    size: "8.7 MB",
    category: "Reports",
    uploadedBy: "John dela Cruz",
    uploadedAt: "2024-08-18",
    url: "#"
  },
  {
    id: "3",
    name: "Foundation_Photos.zip",
    type: "zip",
    size: "45.1 MB",
    category: "Photos",
    uploadedBy: "Mike Rodriguez",
    uploadedAt: "2024-08-22",
    url: "#"
  },
  {
    id: "4",
    name: "Safety_Protocols.pdf",
    type: "pdf", 
    size: "2.3 MB",
    category: "Safety",
    uploadedBy: "Lisa Wang",
    uploadedAt: "2024-08-15",
    url: "#"
  },
  {
    id: "5",
    name: "Material_Specifications.xlsx",
    type: "xlsx",
    size: "1.8 MB",
    category: "Specifications",
    uploadedBy: "Lara David",
    uploadedAt: "2024-08-19",
    url: "#"
  }
]

const categories = ["All", "Plans", "Reports", "Photos", "Safety", "Specifications", "Contracts"]

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf": return <FileText className="h-8 w-8 text-red-500" />
    case "jpg": case "jpeg": case "png": case "gif": return <Image className="h-8 w-8 text-blue-500" />
    case "zip": case "rar": return <File className="h-8 w-8 text-yellow-500" />
    case "xlsx": case "xls": case "csv": return <File className="h-8 w-8 text-green-500" />
    default: return <File className="h-8 w-8 text-gray-500" />
  }
}

export function ProjectFiles({ project }: ProjectFilesProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFiles = mockFiles.filter(file => {
    const matchesCategory = selectedCategory === "All" || file.category === selectedCategory
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalFiles = mockFiles.length
  const totalSize = mockFiles.reduce((sum, file) => {
    const size = parseFloat(file.size.replace(/[^\d.]/g, ''))
    return sum + size
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Files & Documents</h2>
          <p className="text-muted-foreground">Manage project files and documentation</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Upload className="h-4 w-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* File Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalFiles}</div>
              <p className="text-sm text-muted-foreground">Total Files</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{totalSize.toFixed(1)} MB</div>
              <p className="text-sm text-muted-foreground">Total Size</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{categories.length - 1}</div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <p className="text-sm text-muted-foreground">Recent Uploads</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredFiles.map(file => (
          <Card key={file.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    <p className="text-sm text-muted-foreground">{file.size}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="space-y-2">
                <Badge variant="secondary">{file.category}</Badge>
                <div className="text-xs text-muted-foreground">
                  <p>Uploaded by {file.uploadedBy}</p>
                  <p>{new Date(file.uploadedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Overview */}
      <Card>
        <CardHeader>
          <CardTitle>File Categories</CardTitle>
          <CardDescription>Organization of project documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {categories.slice(1).map(category => {
              const categoryFiles = mockFiles.filter(f => f.category === category)
              return (
                <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-orange-500" />
                    <span>{category}</span>
                  </div>
                  <Badge variant="secondary">{categoryFiles.length}</Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}