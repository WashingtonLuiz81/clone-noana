import TabItem from './tabItem'

interface TabListProps {
  tabTitle: string
  setTabTitle: (tab: string) => void
  tabs: string[]
}

export default function TabList({ tabTitle, setTabTitle, tabs }: TabListProps) {
  return (
    <ul className="w-full flex items-center bg-gray-100">
      {tabs.map((tab) => (
        <TabItem
          key={tab}
          title={tab}
          isActive={tabTitle === tab}
          onClick={() => setTabTitle(tab)}
        />
      ))}
    </ul>
  )
}
