'use client'

import React, { useState, ReactNode } from 'react'
import {
  PencilLineIcon,
  EyeIcon,
  MapPinIcon,
  PhoneCallIcon,
  Trash2Icon,
  UserCheckIcon,
  LockKeyholeIcon,
} from 'lucide-react'
import TableArrow from '@/assets/img/table-arrow'
import TableArrowUp from '@/assets/img/table-arrow-up'
import TableArrowDown from '@/assets/img/table-arrow-down'
import {
  monitorTableActions,
  unitTableActions,
  usersTableActions,
} from '@/lib/config'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

interface Column<T> {
  key: keyof T | 'Ações'
  label: string
  isAction?: boolean
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  persona?: string
  showSection: (section: string) => void
  openModal?: (section: string) => void
  onActionClick: (id: number, action: string) => void
}

interface SortConfig<T> {
  key: keyof T | 'Ações'
  direction: 'ascending' | 'descending'
}

interface IconMap {
  [key: string]: JSX.Element
}

const Table = <T extends { id: number }>({
  data,
  columns,
  showSection,
  onActionClick,
  persona,
  openModal,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const styleButtonAction = 'text-primary cursor-pointer'

  const actionsSorted =
    persona === 'monitor'
      ? monitorTableActions
      : persona === 'masterCaregiver'
        ? usersTableActions
        : persona === 'simpleCaregiver'
          ? usersTableActions
          : unitTableActions

  const handleActionClick = (id: number, action: string) => {
    onActionClick(id, action)
    if (action === 'call') {
      openModal && openModal(action)
    } else {
      showSection(action)
    }
  }

  const createIconMap = (id: number): IconMap => ({
    view: (
      <EyeIcon
        className={styleButtonAction}
        width="20"
        onClick={() => handleActionClick(id, 'view')}
      />
    ),
    list: (
      <UserCheckIcon
        className={styleButtonAction}
        width="20"
        onClick={() => handleActionClick(id, 'list')}
      />
    ),
    edit: (
      <PencilLineIcon
        className={styleButtonAction}
        width="20"
        onClick={() => handleActionClick(id, 'edit')}
      />
    ),
    call: (
      <PhoneCallIcon
        className={styleButtonAction}
        width="20"
        onClick={() => openModal && openModal('call')}
      />
    ),
    map: (
      <MapPinIcon
        className={styleButtonAction}
        width="20"
        onClick={() => handleActionClick(id, 'map')}
      />
    ),
    trash: (
      <Trash2Icon
        className={styleButtonAction}
        width="20"
        onClick={() => openModal && openModal('delete')}
      />
    ),
    lock: (
      <LockKeyholeIcon
        className={styleButtonAction}
        width="20"
        onClick={() => openModal && openModal('lock')}
      />
    ),
  })

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
      const iconMap = createIconMap(item.id)
      return (
        <div className="flex items-center gap-3">
          {actionsSorted.map((action, index) => (
            <React.Fragment key={index}>{iconMap[action]}</React.Fragment>
          ))}
        </div>
      )
    }

    const value = item[column.key as keyof T]

    if (column.key === 'Nome' && typeof value === 'string') {
      return (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={`https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg`}
              className="rounded-full w-8 h-8 max-w-8"
              alt={`${value}`}
              width={32}
              height={32}
            />
            <AvatarFallback className="w-8 h-8 flex-1">CN</AvatarFallback>
          </Avatar>
          {value}
        </div>
      )
    }

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
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index} className="border-b border-gray-200">
            {columns.map((column) => (
              <td
                key={column.key as string}
                className="px-6 py-4 whitespace-nowrap"
              >
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
