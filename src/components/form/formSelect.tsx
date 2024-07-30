import React from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

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
  error?: string
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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Listbox
            value={value}
            onChange={(selectedValue) => {
              field.onChange(selectedValue)
              onChange(selectedValue)
            }}
            disabled={disabled}
          >
            {({ open }) => (
              <>
                <div className="relative">
                  <Listbox.Button className="h-11 block w-full py-2 px-3 pr-10 border border-gray-200 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate text-base font-medium text-left text-gray-900">
                      {options.find((option) => option.value === value)
                        ?.label || 'Selecione...'}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {options.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          className={({ active }) =>
                            `cursor-default select-none relative py-2 pl-10 pr-4 ${
                              active ? 'bg-primary text-white' : 'text-gray-900'
                            }`
                          }
                          value={option.value}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {option.label}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                  <CheckIcon className="w-5 h-5" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        )}
      />
      {error && <p className="block mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default FormSelect
