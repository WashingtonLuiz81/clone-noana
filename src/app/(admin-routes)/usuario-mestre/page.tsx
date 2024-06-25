'use client'

import Header from '../_components/header'
import Hospital from '@/assets/img/hospital'
import Magnifier from '@/assets/img/magnifier'
import { Input } from '@/components/ui/input'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import Table from '../_components/table'
import { useState, useMemo } from 'react'

interface Person {
  Nome: string
  'Text Label': string
  'E-mail': string
  Telefone: string
}

export interface Column<T> {
  key: keyof T | 'Ações'
  label: string
  isAction?: boolean
}

const data: Person[] = [
  {
    Nome: 'João',
    'Text Label': 'Lorem ipsum',
    'E-mail': 'joao@example.com',
    Telefone: '(00) 1234-5678',
  },
  {
    Nome: 'Maria',
    'Text Label': 'Dolor sit amet',
    'E-mail': 'maria@example.com',
    Telefone: '(11) 9876-5432',
  },
  {
    Nome: 'José',
    'Text Label': 'Consectetur adipiscing elit',
    'E-mail': 'jose@example.com',
    Telefone: '(22) 2468-1357',
  },
]

const columns: Column<Person>[] = [
  { key: 'Nome', label: 'Nome' },
  { key: 'Text Label', label: 'Text Label' },
  { key: 'E-mail', label: 'E-mail' },
  { key: 'Telefone', label: 'Telefone' },
  { key: 'Ações', label: 'Ações', isAction: true },
]

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery])

  return (
    <div className="w-[calc(100%-16rem)] bg-gray-50 border-l-[1px] border-[#E9E9EB] flex flex-col gap-10 py-10 px-8">
      <Header />

      <section>
        <header className="flex items-center justify-between mb-6">
          <div className="flex flex-auto items-center gap-2">
            <Hospital className="text-primary" />
            <span className="flex-1 size-5 font-semibold italic text-[#1A1A1A]">
              Unidades Cadastradas
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Magnifier className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

              <Input
                placeholder="Buscar Unidade"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg text-sm"
              />
            </div>

            <Button className="flex items-center gap-2 bg-primary text-gray-50 shadow-xl">
              <PlusIcon />
              <span className="text-white font-semibold">Adicionar</span>
            </Button>
          </div>
        </header>

        <Table data={filteredData} columns={columns} />
      </section>
    </div>
  )
}
