import React, { useState, forwardRef, ForwardRefRenderFunction } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import Input, { InputProps } from './FormInput'

interface PasswordInputProps extends InputProps {
  error?: string
  placeholder?: string
}

const PasswordInput: ForwardRefRenderFunction<
  HTMLInputElement,
  PasswordInputProps
> = ({ error, placeholder = 'Senha', ...props }, ref) => {
  const [visiblePassword, setVisiblePassword] = useState(false)

  return (
    <div className="mt-1 relative">
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          placeholder={placeholder}
          type={visiblePassword ? 'text' : 'password'}
          className={`h-14 rounded-xl outline-none ${
            error ? 'border border-red-500' : ''
          }`}
        />

        {visiblePassword ? (
          <EyeClosedIcon
            className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
            onClick={() => setVisiblePassword(false)}
          />
        ) : (
          <EyeOpenIcon
            className="absolute inset-y-0 right-0 mr-3 my-auto h-7 w-7 text-gray-400 cursor-pointer"
            onClick={() => setVisiblePassword(true)}
          />
        )}
      </div>
      {error && (
        <p className="text-red-500 mt-2 text-sm font-medium">{error}</p>
      )}
    </div>
  )
}

export default forwardRef(PasswordInput)
