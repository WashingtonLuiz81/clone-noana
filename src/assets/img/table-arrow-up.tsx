// components/MyIcon.tsx

import React from 'react'

interface MyIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string
  className?: string // Permitindo uma classe personalizada
}

const TableArrowUp: React.FC<MyIconProps> = ({
  color = 'currentColor',
  className,
  ...props
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <path
      d="M7.87263 10.5C7.45275 10.5 7.24248 9.81864 7.53937 9.42015L12.0671 3.68527C12.2512 3.43824 12.5496 3.43824 12.7336 3.68527L17.2614 9.42015C17.5583 9.81864 17.348 10.5 16.9282 10.5L7.87263 10.5Z"
      fill={color}
      fillOpacity="0.4"
    />
  </svg>
)

export default TableArrowUp
