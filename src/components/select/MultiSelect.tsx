import { useMemo, useCallback, useId } from "react"
import { TbX } from "react-icons/tb"
import { useMultiSelect } from "@/hooks"
import { AvatarSelect, SelectDropdown, SelectWrapper, InputSelect } from "./"
import {
  type SelectOption,
  type MultiSelectProps,
  type LabelDisplay,
} from "@/utils/types"

export function MultiSelect({
  value = [],
  error = false,
  disabled = false,
  helperText = "",
  findBy = "label",
  labelDisplay = "label",
  placeholder = "Seleccione...",
  ...props
}: MultiSelectProps) {
  const {
    isOpen,
    options,
    wrapperRef,
    inputRef,
    selectValue,
    handleFindInOptions,
    handleOpenOptions,
    handleSelectOption,
    handleClearOption,
  } = useMultiSelect({ ...props, value, findBy })
  const inputId = useId()

  return (
    <div ref={wrapperRef}>
      <SelectWrapper
        htmlFor={inputId}
        error={error}
        disabled={disabled}
        label={props.label}
        helperText={helperText}
        isMulti={value.length > 0 || selectValue.length > 0}
        onClick={handleOpenOptions}
        dropdown={
          <SelectDropdown
            disableActiveSelection
            items={options}
            isOpen={isOpen}
            helpertext={helperText}
            onSelect={handleSelectOption}
          />
        }
      >
        <MultiItems
          labelDisplay={labelDisplay}
          value={value.length > 0 ? value : selectValue}
          options={props.options}
          onClear={handleClearOption}
        />
        <InputSelect
          id={inputId}
          ref={inputRef}
          placeholder={props.label!}
          onChange={handleFindInOptions}
        />
      </SelectWrapper>
    </div>
  )
}

interface Props {
  value: string[]
  options: SelectOption[]
  labelDisplay?: LabelDisplay
  onClear: (key: string) => void
}

function MultiItems({
  value = [],
  options,
  labelDisplay = "both",
  onClear,
}: Props) {
  const filteredOptions = useMemo(() => {
    return options.filter((option) => value.includes(option.value))
  }, [value, options])

  const LiContent = useCallback(
    (item: SelectOption) => {
      if (labelDisplay === "avatar") {
        return <AvatarSelect alt={item.label} avatar={item.avatar} />
      }

      if (labelDisplay === "both") {
        return (
          <>
            <AvatarSelect alt={item.label} avatar={item.avatar} />
            {item.label}
          </>
        )
      }
      return item.label
    },
    [labelDisplay]
  )

  return (
    <ul className="flex flex-wrap items-center gap-1">
      {filteredOptions.map((item) => (
        <li
          key={item.value}
          className={`
            flex gap-2 items-center bg-gray-50 rounded-md shadow-md shadow-neutral-300/50 pl-2 text-xs border-t border-x overflow-hidden w-max
          `}
        >
          {LiContent(item)}
          <button
            className="h-7 w-7 grid place-content-center hover:bg-gray-200/60 transition text-gray-500"
            onClick={() => {
              onClear(item.value)
            }}
          >
            <TbX className="text-xl" />
          </button>
        </li>
      ))}
    </ul>
  )
}
