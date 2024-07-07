import React from 'react'
import {
  Input as ShadcnInput,
  InputProps as ShadcnInputProps,
} from '@/components/ui/input'

interface InputProps extends ShadcnInputProps {
  label?: string
  error?: string
  readOnly?: boolean // Adicionar readOnly como uma propriedade opcional
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  label,
  error,
  readOnly,
  ...props
}) => {
  const isReadOnly = readOnly || false
  const inputRef = React.useRef<HTMLInputElement>(null) // Inicializa a ref corretamente

  return (
    <div className="input-container">
      {label && (
        <label
          className="block mb-3 text-sm font-medium text-gray-700"
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      )}
      <ShadcnInput
        ref={inputRef} // Utiliza a ref corretamente
        {...props}
        readOnly={isReadOnly}
        className={`w-full mt-1 px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 ${
          isReadOnly ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
        }`}
      />
      {error && !isReadOnly && (
        <span className="block mt-1 text-red-500">{error}</span>
      )}
    </div>
  )
}

Input.displayName = 'Input'

export default Input
