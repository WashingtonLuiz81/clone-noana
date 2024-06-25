// components/MyIcon.tsx

import React from 'react'

interface MyIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string
  className?: string // Permitindo uma classe personalizada
}

const TableArrowDown: React.FC<MyIconProps> = ({
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
      d="M16.9282 13.5C17.348 13.5 17.5583 14.1814 17.2614 14.5798L12.7336 20.3147C12.5496 20.5618 12.2512 20.5618 12.0671 20.3147L7.53937 14.5798C7.24248 14.1814 7.45275 13.5 7.87263 13.5L16.9282 13.5Z"
      fill={color}
      fillOpacity="0.4"
    />
  </svg>
)

export default TableArrowDown
