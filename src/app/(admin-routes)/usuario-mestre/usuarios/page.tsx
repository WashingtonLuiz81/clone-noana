'use client'

import { useState } from 'react'
import Header from '../../_components/header'
import TabList from '../../_components/tabs/tabList'
import MasterCaregiver from '../../_components/tabs/contentTabs/masterCaregiver'
import SimpleCaregiver from '../../_components/tabs/contentTabs/simpleCaregiver'
import Monitor from '../../_components/tabs/contentTabs/monitor'
import Recipient from '../../_components/tabs/contentTabs/recipient'

export default function UsersPage() {
  const [tabTitle, setTabTitle] = useState('Cuidador Mestre')

  const tabs = [
    'Cuidador Mestre',
    'Cuidador Simples',
    'Monitor',
    'Beneficiário',
  ]
  return (
    <div className="w-[calc(100%-16rem)] bg-gray-50 border-l-[1px] border-[#E9E9EB] flex flex-col gap-10 py-10 px-8">
      <Header title="Usuários" breadcrumb={['Usuários', tabTitle]} />

      <div className="max-w-xl bg-gray-100 rounded-xl border border-gray-200">
        <TabList
          tabTitle={tabTitle}
          setTabTitle={(title) => setTabTitle(title)}
          tabs={tabs}
        />
      </div>

      {tabTitle === 'Cuidador Mestre' && <MasterCaregiver />}
      {tabTitle === 'Cuidador Simples' && <SimpleCaregiver />}
      {tabTitle === 'Monitor' && <Monitor />}
      {tabTitle === 'Beneficiário' && <Recipient />}
    </div>
  )
}
