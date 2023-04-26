import React from "react"
import { useTransition, animated } from "@react-spring/web"
import { useMobile } from "../hooks/useMobile"

interface Props {
  btnComponent: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
}

export const Popover = ({ btnComponent, children, isOpen }: Props) => {
  const { isKeyboardOpen } = useMobile()
  const transition = useTransition(isOpen, {
    from: { opacity: 0, transform: "scale(0.8)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.8)" },
  })

  return (
    <div className="fixed bottom-2 left-3 z-[50]">
      <>{btnComponent}</>
      {transition(
        (style, item) =>
          item && (
            <animated.main
              style={style}
              className={`bg-neutral-50 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-50 rounded-xl overflow-hidden flex flex-col absolute bottom-[120%] left-0 max-w-sm w-[95vw] shadow-xl origin-bottom-left z-[999] max-h-[calc(100vh-50px)] sm:max-h-[calc(100vh-70px)]
              ${isKeyboardOpen ? "h-[44vh]" : "h-[600px]"}
              `}
            >
              {children}
            </animated.main>
          )
      )}
    </div>
  )
}
