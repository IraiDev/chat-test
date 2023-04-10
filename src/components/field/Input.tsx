import { type InputProps } from "@/utils/types"
import { useId } from "react"
import { FieldAdorment } from "./FieldAdorment"
import { FieldHelper } from "./FieldHelper"
import { FieldWrapper } from "./FieldWrapper"

interface Props extends InputProps {
  startAdorment?: React.ReactNode
  endAdorment?: React.ReactNode
}

export function Input(props: Props) {
  const {
    error = false,
    helperText = "",
    label,
    type = "text",
    placeholder = label,
    disabled = false,
    ...rest
  } = props
  const inputId = useId()

  return (
    <div className="space-y-1">
      <FieldWrapper disabled={disabled} error={error} htmlFor={inputId}>
        <FieldAdorment icon={props.startAdorment} />
        <input
          {...rest}
          id={inputId}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent 
          focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        />

        <span
          className={`absolute left-3 top-3 -translate-y-1/2 text-xs text-neutral-400 
          transition-all peer-focus:top-3 peer-focus:text-xs peer-focus:text-neutral-500 
          ${
            props.startAdorment !== undefined
              ? ""
              : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm "
          }
        `}
        >
          {label}:
        </span>
        <FieldAdorment alignCenter icon={props.endAdorment} />
      </FieldWrapper>
      <FieldHelper
        isError={error}
        helperText={helperText}
        maxLength={props.maxLength}
        currentLength={props.value?.length}
      />
    </div>
  )
}
