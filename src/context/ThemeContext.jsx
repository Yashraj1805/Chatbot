import { createContext, useContext, useEffect } from 'react'

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

// Light theme only. Dark mode has been removed — we make sure the `dark` class
// is never on <html> so all `dark:` utility classes stay inert.
export function ThemeProvider({ children }) {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {}, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}
