import { AppLayout } from "./components/AppLayout"
import { LoginPage } from "./components/LoginPage"
import { ThemeProvider } from "./components/ThemeProvider"
import { AuthProvider, useAuth } from "./components/AuthProvider"
import { NavigationProvider } from "./components/NavigationProvider"

function AppContent() {
  const { isAuthenticated, login } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />
  }

  return (
    <NavigationProvider>
      <AppLayout />
    </NavigationProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="nephoraforge-ui-theme">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  )
}