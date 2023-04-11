import React from "react"

interface Props {
  btnComponent: React.ReactNode
  children: React.ReactNode
  open: boolean
}

export const Popover = ({ btnComponent, children, open }: Props) => {
  return (
    <div className="fixed bottom-5 left-5">
      <>{btnComponent}</>
      {open && (
        <main
          className="bg-neutral-50 dark:bg-neutral-800 border 
          border-neutral-50 dark:border-neutral-800 rounded-xl 
          overflow-hidden flex flex-col absolute bottom-[120%] 
          left-4 w-max shadow-xl"
        >
          {children}
        </main>
      )}
    </div>
  )
}
