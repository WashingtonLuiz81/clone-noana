import React from 'react'
import InputMask from 'react-input-mask'

export interface InputProps extends React.ComponentProps<'input'> {
  label?: string
  error?: string | undefined
  readOnly?: boolean
}

const FormInputMask = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, readOnly, ...props }, ref) => {
    const isReadOnly = readOnly || false

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
        <InputMask
          {...props}
          readOnly={isReadOnly}
          className={`w-full mt-1 px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300 ${
            isReadOnly ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
          } ${error ? 'border border-red-500' : ''}`}
          ref={ref as React.Ref<any>} // <== aqui
        />
        {error && !isReadOnly && (
          <span className="block mt-1 text-red-500">{error}</span>
        )}
      </div>
    )
  },
)

FormInputMask.displayName = 'FormInputMask'

export default FormInputMask
