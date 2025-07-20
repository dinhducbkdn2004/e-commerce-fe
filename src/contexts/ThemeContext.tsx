import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

// Helper function to check if we're in browser
const isBrowser = typeof window !== 'undefined'

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = (): Theme => {
  if (!isBrowser) return 'light'
  const savedTheme = localStorage.getItem('theme') as Theme
  return savedTheme || 'light'
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [isDark, setIsDark] = useState(() => getInitialTheme() === 'dark')

  // Handle theme changes and DOM updates
  useEffect(() => {
    if (!isBrowser) return

    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove('dark')

    const shouldBeDark = theme === 'dark'

    if (shouldBeDark) {
      root.classList.add('dark')
    }

    setIsDark(shouldBeDark)

    // Always save theme to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }
