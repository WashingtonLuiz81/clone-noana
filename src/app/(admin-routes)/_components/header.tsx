'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

interface HeaderPageProps {
  title: string
  breadcrumb: string[]
}

export default function Header({ title, breadcrumb }: HeaderPageProps) {
  return (
    <div>
      <span className="text-2xl font-bold text-[#1F2638]">{title}</span>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <div>
              <Link href="/" className="text-gray-400 size-3 font-medium">
                {breadcrumb[0]}
              </Link>
            </div>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-gray-400" />

          <BreadcrumbItem>
            <BreadcrumbPage>
              <span className="text-gray-500 size-3 font-medium">
                {breadcrumb[1]}
              </span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
