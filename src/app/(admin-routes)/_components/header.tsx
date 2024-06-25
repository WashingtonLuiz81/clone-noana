'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

export default function Header() {
  return (
    <div>
      <span className="size-6 font-bold text-[#1F2638] italic">
        Unidades de Cuidado
      </span>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <div>
              <Link href="/" className="text-gray-400 size-3 font-medium">
                Unidades
              </Link>
            </div>
          </BreadcrumbItem>

          <BreadcrumbSeparator className="text-gray-400" />

          <BreadcrumbItem>
            <BreadcrumbPage>
              <span className="text-gray-500 size-3 font-medium">
                Unidades Cadastradas
              </span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
