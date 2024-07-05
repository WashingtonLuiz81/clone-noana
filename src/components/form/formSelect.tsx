// src/components/Select.tsx
import React from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form'

type Option = {
  value: string
  label: string
}

type SelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  options: Option[]
  value: string
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
  error?: FieldError
}

const FormSelect = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
  value,
  onChange,
  label,
  disabled,
  error,
}: SelectProps<TFieldValues>) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={value}
              onChange={(e) => {
                const selectedValue = e.target.value
                field.onChange(selectedValue)
                onChange(selectedValue)
              }}
              className="mt-1 block w-full py-2 px-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
              disabled={disabled}
            >
              <option value="" disabled>
                Selecione...
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>
    </div>
  )
}

export default FormSelect
