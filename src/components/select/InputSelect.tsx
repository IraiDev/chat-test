/* eslint-disable react/display-name */
import React, { forwardRef } from "react"
import { type ReactRef } from "../../utils/types"

interface Props {
  id: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputSelect = forwardRef(
  ({ id, placeholder, onChange }: Props, ref: ReactRef) => {
    return (
      <input
        id={id}
        className={`peer h-8 max-w-2xl border-none bg-transparent p-0 
        placeholder-transparent focus:border-transparent dark:text-neutral-50
        focus:outline-none focus:ring-0 sm:text-sm cursor-pointer
      `}
        ref={ref}
        type="text"
        name={`input-select-${id}`}
        placeholder={placeholder}
        autoCorrect="off"
        autoComplete="off"
        onChange={onChange}
      />
    )
  }
)
