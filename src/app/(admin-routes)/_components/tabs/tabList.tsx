import TabItem from './tabItem'

interface TabListProps {
  tabTitle: string
  setTabTitle: (tab: string) => void
}

export default function TabList({ tabTitle, setTabTitle }: TabListProps) {
  const tabs = [
    'Cuidador Mestre',
    'Cuidador Simples',
    'Monitor',
    'Beneficiário',
  ]

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
