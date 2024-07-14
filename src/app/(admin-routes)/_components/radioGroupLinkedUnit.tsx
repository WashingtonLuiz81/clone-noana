import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Option {
  id: string
  label: string
}

interface RadioGroupProps {
  options: Option[]
  name: string
  selected: string
  setSelected?: (value: string) => void
  error?: string
  register?: UseFormRegisterReturn
  readOnly?: boolean // Adiciona a prop readOnly
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  selected,
  setSelected,
  error,
  register,
  readOnly = false, // Valor padrão é false
}) => {
  return (
    <div className="pb-10 border-b-[1px] border-gray-200">
      <ul className="flex items-center gap-4">
        {options.map((option) => (
          <li
            key={option.id}
            className={`min-w-32 bg-white p-4 rounded-xl border-[1px] hover:border-primary ${
              selected === option.id
                ? 'border-primary text-primary'
                : 'border-gray-200 text-gray-900'
            }`}
          >
            <input
              type="radio"
              id={option.id}
              {...register}
              value={option.id}
              checked={selected === option.id}
              onChange={(e) => {
                if (!readOnly && setSelected) {
                  setSelected(e.target.value)
                  register?.onChange(e) // Chama a função onChange do react-hook-form, se register for fornecido
                }
              }}
              className="hidden"
              disabled={readOnly} // Desabilita o input se readOnly for true
            />
            <label
              htmlFor={option.id}
              className={`flex flex-col gap-6 ${readOnly ? '' : 'cursor-pointer'}`}
            >
              <span
                className={`w-5 h-5 block rounded-full shadow border ${
                  selected === option.id
                    ? 'bg-white border-primary border-[5px]'
                    : 'bg-gray-100 border-[rgba(26,26,26,0.1)]'
                } shadow`}
              ></span>
              <span className="text-base font-medium">{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
      {!readOnly && error && <span className="text-red-500">{error}</span>}
    </div>
  )
}
