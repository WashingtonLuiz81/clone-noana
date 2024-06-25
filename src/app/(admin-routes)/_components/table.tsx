'use client'

import { useState, ReactNode } from 'react'

import {
  PencilLineIcon,
  EyeIcon,
  MapPinIcon,
  PhoneCallIcon,
  Trash2Icon,
  UserCheckIcon,
} from 'lucide-react'
import TableArrow from '@/assets/img/table-arrow'
import TableArrowUp from '@/assets/img/table-arrow-up'
import TableArrowDown from '@/assets/img/table-arrow-down'

interface Column<T> {
  key: keyof T | 'Ações'
  label: string
  isAction?: boolean
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
}

interface SortConfig<T> {
  key: keyof T | 'Ações'
  direction: 'ascending' | 'descending'
}

const Table = <T,>({ data, columns }: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const styleButtonAction = 'text-primary cursor-pointer'

  const sortedData = [...data]
  if (sortConfig !== null && sortConfig.key !== 'Ações') {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T]
      const bValue = b[sortConfig.key as keyof T]

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }

      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  const requestSort = (key: keyof T | 'Ações') => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const renderCell = (item: T, column: Column<T>): ReactNode => {
    if (column.key === 'Ações') {
      return (
        <div className="flex items-center gap-3">
          <EyeIcon className={styleButtonAction} width="20" />
          <UserCheckIcon className={styleButtonAction} width="20" />
          <PencilLineIcon className={styleButtonAction} width="20" />
          <PhoneCallIcon className={styleButtonAction} width="20" />
          <MapPinIcon className={styleButtonAction} width="20" />
          <Trash2Icon className={styleButtonAction} width="20" />
        </div>
      )
    }

    const value = item[column.key as keyof T]
    if (typeof value === 'string' || typeof value === 'number') {
      return value
    }

    return JSON.stringify(value)
  }

  return (
    <table className="min-w-full bg-white shadow-sm rounded-xl border border-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key as string}
              onClick={() => column.key !== 'Ações' && requestSort(column.key)}
              className="px-6 py-3 tracking-wider cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-auto text-left text-gray-900 text-base font-medium select-none">
                  {column.label}
                </span>
                {!sortConfig && column.key !== 'Ações' && (
                  <TableArrow color="#1A1A1A" />
                )}
                {sortConfig &&
                  sortConfig.key === column.key &&
                  column.key !== 'Ações' && (
                    <span>
                      {sortConfig.direction === 'ascending' ? (
                        <TableArrowUp />
                      ) : (
                        <TableArrowDown />
                      )}
                    </span>
                  )}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white ">
        {sortedData.map((item, index) => (
          <tr className="even:bg-gray-50 border border-gray-200" key={index}>
            {columns.map((column) => (
              <td
                key={column.key as string}
                className="px-6 py-4 whitespace-nowrap"
              >
                <span className="text-gray-500 text-sm italic font-medium">
                  {renderCell(item, column)}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
