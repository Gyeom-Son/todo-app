import { useEffect, useState } from 'react'

// Keeps a piece of state in sync with localStorage so data survives a page reload.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage can be unavailable (private mode, quota exceeded). The app still works in memory.
    }
  }, [key, value])

  return [value, setValue]
}
