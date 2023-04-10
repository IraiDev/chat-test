import { useId } from 'react'
import { FieldHelper } from './FieldHelper'
import { type TextareaProps } from '@/utils/types'
import { FieldWrapper } from './FieldWrapper'

export function Textarea(props: TextareaProps) {
  const { error = false, disabled = false, helperText = '', label, placeholder = label, rows = 7, ...rest } = props
  const textareaId = useId()

  return (
    <div className='space-y-1'>
      <FieldWrapper disabled={disabled} error={error} htmlFor={textareaId}>
        <textarea
          {...rest}
          rows={rows}
          id={textareaId}
          disabled={disabled}
          placeholder={placeholder}
          className="peer w-full border-none bg-transparent pt-2 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        ></textarea>

        <span
          className={`absolute left-3 top-1 text-xs text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs w-full block peer-focus:text-indigo-500
          ${disabled ? 'bg-neutral-100' : 'bg-white'}
        `}>
          {label}:
        </span>
      </FieldWrapper>
      <FieldHelper
        isError={error}
        helperText={helperText}
        maxLength={props.maxLength}
        currentLength={props.value?.length} />
    </div>
  )
}
