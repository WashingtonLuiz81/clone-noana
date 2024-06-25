// components/MyIcon.tsx

import React from 'react'

interface MyIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string
  className?: string // Permitindo uma classe personalizada
}

const Magnifier: React.FC<MyIconProps> = ({
  color = 'currentColor',
  className,
  ...props
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
)

export default Magnifier
