interface ProgressBarProps {
  value: number
  containerClassName?: string
  color?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  containerClassName = '',
  color = '#52525B',
}) => {
  const getColorClass = (value: number) => {
    if (value >= 80) return 'bg-green-500'
    if (value >= 60) return 'bg-yellow-500'
    if (value >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const combinedContainerClassName = `relative w-14 h-2 rounded overflow-hidden bg-gray-200 ${containerClassName}`
  const progressClassName = `absolute h-full left-0 top-0 ${getColorClass(value)}`

  return (
    <div className="flex items-center gap-3">
      <div className={combinedContainerClassName}>
        <div style={{ width: `${value}%` }} className={progressClassName} />
      </div>
      <span className="text-sm font-medium" style={{ color }}>
        {value}%
      </span>
    </div>
  )
}

export default ProgressBar
