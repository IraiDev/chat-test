import { useClickOutside } from "../hooks/useClickOutside"

interface Props {
  btnComponent: React.ReactNode
  children: React.ReactNode
  open: boolean
  onClose: (value: boolean) => void
}

export const Popover = ({ btnComponent, children, open, onClose }: Props) => {
  const [popoverRef] = useClickOutside({ handler: onClose })

  return (
    <div ref={popoverRef} className="fixed bottom-5 left-5">
      <>{btnComponent}</>
      {open &&
        <main className="bg-neutral-200 dark:bg-neutral-700 border 
        border-neutral-50 dark:border-neutral-700 rounded-xl 
        overflow-hidden flex flex-col absolute bottom-[120%] 
        left-4 w-max shadow-xl"
        >
          {children}
        </main>
      }
    </div>
  )
}
