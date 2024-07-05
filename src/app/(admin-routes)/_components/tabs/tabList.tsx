import TabItem from './tabItem'

interface TabListProps {
  tabTitle: string
  setTabTitle: (tab: string) => void
  tabs: string[]
}

export default function TabList({ tabTitle, setTabTitle, tabs }: TabListProps) {
  return (
    <ul className="w-full flex items-center">
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
