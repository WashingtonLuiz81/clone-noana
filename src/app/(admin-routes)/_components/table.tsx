'use client'

import React, { useState, ReactNode } from 'react'
import { format, parseISO } from 'date-fns'
import {
  PencilLineIcon,
  EyeIcon,
  MapPinIcon,
  PhoneCallIcon,
  Trash2Icon,
  UserCheckIcon,
  LockKeyholeIcon,
  FileTextIcon,
  AlertTriangleIcon,
  CheckIcon,
} from 'lucide-react'
import TableArrow from '@/assets/img/table-arrow'
import TableArrowUp from '@/assets/img/table-arrow-up'
import TableArrowDown from '@/assets/img/table-arrow-down'
import {
  alertsTableActions,
  Column,
  monitorTableActions,
  unitTableActions,
  usersTableActions,
} from '@/lib/config'
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'
import ProgressBar from '@/components/batteryLevel'

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  persona?: string
  showSection: (section: string) => void
  openModal?: (section: string) => void
  onActionClick: (id: number, action: string) => void
  isAlert?: boolean
}

interface SortConfig<T> {
  key: keyof T | 'Ações'
  direction: 'ascending' | 'descending'
}

interface IconMap {
  [key: string]: JSX.Element
}

const Table = <T extends { id: number; isResolved?: boolean }>({
  data,
  columns,
  showSection,
  onActionClick,
  persona,
  openModal,
  isAlert,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null)
  const styleButtonAction = 'cursor-pointer'

  const actionsSorted =
    persona === 'monitor'
      ? monitorTableActions
      : persona === 'masterCaregiver'
        ? usersTableActions
        : persona === 'simpleCaregiver'
          ? usersTableActions
          : persona === 'alerts'
            ? alertsTableActions
            : unitTableActions

  const handleActionClick = (id: number, action: string) => {
    onActionClick(id, action)
    if (action === 'call') {
      openModal && openModal(action)
    } else {
      showSection(action)
    }
  }

  const createIconMap = (id: number, isResolved?: boolean): IconMap => {
    const iconClass = `${styleButtonAction} ${isResolved ? 'text-primary' : !isAlert ? 'text-primary' : 'text-white'}`
    return {
      view: (
        <EyeIcon
          className={iconClass}
          width="20"
          onClick={() => handleActionClick(id, 'view')}
        />
      ),
      list: (
        <UserCheckIcon
          className={iconClass}
          width="20"
          onClick={() => handleActionClick(id, 'list')}
        />
      ),
      edit: (
        <PencilLineIcon
          className={iconClass}
          width="20"
          onClick={() => handleActionClick(id, 'edit')}
        />
      ),
      call: (
        <PhoneCallIcon
          className={iconClass}
          width="20"
          onClick={() => openModal && openModal('call')}
        />
      ),
      map: (
        <MapPinIcon
          className={iconClass}
          width="20"
          onClick={() => handleActionClick(id, 'map')}
        />
      ),
      trash: (
        <Trash2Icon
          className={iconClass}
          width="20"
          onClick={() => openModal && openModal('delete')}
        />
      ),
      lock: (
        <LockKeyholeIcon
          className={iconClass}
          width="20"
          onClick={() => openModal && openModal('lock')}
        />
      ),
      fileText: (
        <FileTextIcon
          className={iconClass}
          width="20"
          onClick={() => handleActionClick(id, 'fileText')}
        />
      ),
      alert: isResolved ? (
        <CheckIcon className={`${iconClass} cursor-text`} width="20" />
      ) : (
        <AlertTriangleIcon
          className={iconClass}
          width="20"
          onClick={() => openModal && openModal('alert')}
        />
      ),
    }
  }

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

  sortedData.sort((a, b) => (b.isResolved ? -1 : 1) - (a.isResolved ? -1 : 1))

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
      const iconMap = createIconMap(item.id, item.isResolved)
      return (
        <div className="flex items-center gap-3">
          {actionsSorted.map((action, index) => (
            <React.Fragment key={index}>{iconMap[action]}</React.Fragment>
          ))}
        </div>
      )
    }

    const value = item[column.key as keyof T]

    if (
      column.key === 'Nome' ||
      (column.key === 'beneficiaryName' && typeof value === 'string')
    ) {
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
          <>{value}</>
        </div>
      )
    }

    if (column.key === 'alertDateTime' && typeof value === 'string') {
      const parsedDate = parseISO(value)
      return format(parsedDate, 'dd/MM/yyyy HH:mm')
    }

    if (column.key === 'batteryPercentage' && typeof value === 'number') {
      const progressBarProps = !item.isResolved
        ? {
            value,
            containerClassName: 'bg-opacity-100 bg-red-50',
            color: '#FEF1F1',
          }
        : { value }

      return <ProgressBar {...progressBarProps} />
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
          <tr
            key={index}
            className={`border-b border-gray-200 ${
              isAlert && !item.isResolved && 'bg-red-500 text-white'
            }`}
          >
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
