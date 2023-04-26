import { useEffect } from "react"
import { useDeviceStore } from "../store/DeviceStore"

export const useMobile = () => {
  const { device, setDevice } = useDeviceStore()

  const handleFocus = () => {
    if (!device.isIos) return
    setDevice("isKeyboardOpen", !device.isFireFox)
  }

  const handleBlur = () => {
    if (!device.isIos) return
    setDevice("isKeyboardOpen", !device.isFireFox)
  }

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile =
      /mobile|android|ios|iphone|ipad|ipod|windows phone|iemobile|wpdesktop/.test(
        userAgent
      )
    const isIos = /ios|iphone|ipad|ipod/.test(userAgent)
    setDevice("isMobile", isMobile)
    setDevice("isIos", isIos)
    setDevice("isFireFox", /Firefox\//i.test(userAgent))
  }, [])

  useEffect(() => {
    if (device.isIos) return
    const handleResize = () => {
      const windowHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight
      const documentHeight = document.documentElement.clientHeight

      setDevice(
        "isKeyboardOpen",
        device.isFireFox ? windowHeight > documentHeight : windowHeight < documentHeight
      )
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return { ...device, handleBlur, handleFocus }
}
