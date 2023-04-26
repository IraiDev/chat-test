import { useState, useEffect, useCallback } from "react"

export const useBrowserVisible = () => {
  const [isVisible, setIsVisible] = useState(true)

  const handleVisibilityChange = useCallback(() => {
    setIsVisible(!document.hidden)
  }, [])

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return isVisible
}
