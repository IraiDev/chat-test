import { createPortal } from "react-dom"
import { Backdrop } from "./Backdrop"
import { ModalWrapper } from "./ModalWrapper"
import { ModalHeader } from "./ModalHeader"

const MODAL_ROOT = document.getElementById("modal-root")
const WIDTH_SIZE = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  base: "",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
}

export interface ModalProps {
  onClose: (value: boolean) => void
  isOpen: boolean
  title?: string
  maxWidth?: keyof typeof WIDTH_SIZE
  hideCloseBtn?: boolean
  children: React.ReactNode
}

export function Modal({
  children,
  isOpen,
  onClose,
  maxWidth = "md",
  title,
  hideCloseBtn,
}: ModalProps) {
  return createPortal(
    <Backdrop isOpen={isOpen}>
      <ModalWrapper isOpen={isOpen} maxWidth={WIDTH_SIZE[maxWidth]}>
        <ModalHeader
          onClose={onClose}
          hideCloseBtn={hideCloseBtn}
          title={title}
        />
        <>{children}</>
      </ModalWrapper>
    </Backdrop>,
    MODAL_ROOT!
  )
}
