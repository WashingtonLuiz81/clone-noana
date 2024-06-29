import classNames from 'classnames'

interface TabItemProps {
  title: string
  isActive: boolean
  onClick: () => void
}

export default function TabItem({ title, isActive, onClick }: TabItemProps) {
  return (
    <li
      className="h-11 flex items-center flex-grow cursor-pointer"
      onClick={onClick}
    >
      <span
        className={classNames('py-2 px-4 w-full font-medium rounded-[10px]', {
          'bg-white font-semibold': isActive,
        })}
      >
        {title}
      </span>
    </li>
  )
}
