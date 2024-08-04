'use client'

import Header from '../../_components/header'
import CareUnits from '../../_components/tabs/contentTabs/careUnits'

export default function Unit() {
  return (
    <>
      <div className="w-[calc(100%-16rem)] bg-gray-50 border-l-[1px] border-[#E9E9EB] flex flex-col gap-10 py-10 px-8">
        <Header
          title="Unidades de Cuidado"
          breadcrumb={['Unidades', 'Unidades Cadastradas']}
        />

        <CareUnits />
      </div>
    </>
  )
}
