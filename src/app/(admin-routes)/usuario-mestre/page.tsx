'use client'

import Header from '../_components/header'

export default function Dashboard() {
  return (
    <>
      <div className="w-[calc(100%-16rem)] bg-gray-50 border-l-[1px] border-[#E9E9EB] flex flex-col gap-10 py-10 px-8">
        <Header title="Alertas" breadcrumb={['Alertas', 'Últimos Alertas']} />

        {/* <CareUnits /> */}
      </div>
    </>
  )
}
