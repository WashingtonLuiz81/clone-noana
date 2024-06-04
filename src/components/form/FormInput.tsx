import React from 'react'
import {
  Input as ShadcnInput,
  InputProps as ShadcnInputProps,
} from '@/components/ui/input'

interface InputProps extends ShadcnInputProps {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="input-container">
        {label && <label htmlFor={props.id || props.name}>{label}</label>}
        <ShadcnInput ref={ref} {...props} />
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
