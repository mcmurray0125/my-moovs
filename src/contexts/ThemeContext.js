import React, { useContext, useState, useEffect } from 'react'

const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light')
  
    function toggleTheme() {
      return (
        setTheme((oldTheme) => (oldTheme === 'light' ? 'dark' : 'light'))
        )
    }

    const value = { 
        theme,
        toggleTheme
    }

  return (
    <ThemeContext.Provider value={value}>
        {children}
    </ThemeContext.Provider>
  )
}
