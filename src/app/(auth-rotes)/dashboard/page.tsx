// import { Avatar, AvatarFallback } from '@/components/ui/avatar'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Table, TableBody, TableRow, TableCell } from '@/components/ui/table'

export default function MasterUser() {
  return (
    <div className="bg-[#F4F7FE] min-h-screen">
      {/* <div className="flex flex-col">
        <header className="bg-[#6C5DD3] p-4 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Olá, Usuário Mestre!</h1>
            <Avatar>
              <img src="/placeholder.svg" alt="User Profile" />
              <AvatarFallback>UM</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="flex flex-grow">
          <aside className="w-60 bg-white p-4">
            <nav className="space-y-1">
              <Link
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-[#EDEBFE] hover:text-[#6C5DD3]"
                href="#"
                prefetch={false}
              >
                <BuildingIcon className="w-5 h-5" /> <span>Unidades</span>
              </Link>
              <Link
                className="flex items-center space-x-2 p-2 rounded-md bg-[#EDEBFE] text-[#6C5DD3]"
                href="#"
                prefetch={false}
              >
                <UsersIcon className="w-5 h-5" /> <span>Usuários</span>
              </Link>
            </nav>
          </aside>
          <main className="flex-grow p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Usuários</h2>
                <Button className="flex items-center space-x-2 bg-[#6C5DD3] text-white">
                  <PlusIcon className="w-4 h-4" />
                  <span>Adicionar</span>
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  className="px-4 py-2 rounded-md text-[#6C5DD3]"
                >
                  Cuidador Mestre
                </Button>
                <Button
                  variant="ghost"
                  className="px-4 py-2 rounded-md text-[#6C5DD3]"
                >
                  Cuidador Simples
                </Button>
                <Button
                  variant="ghost"
                  className="px-4 py-2 rounded-md text-[#6C5DD3]"
                >
                  Monitor
                </Button>
                <Button
                  variant="ghost"
                  className="px-4 py-2 rounded-md text-[#6C5DD3]"
                >
                  Beneficiário
                </Button>
              </div>
              <div className="bg-white p-4 rounded-md shadow">
                <h3 className="text-lg font-semibold mb-4">
                  Cuidadores Mestre
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <Button variant="ghost" className="text-[#6C5DD3]">
                      Nome
                    </Button>
                    <Button variant="ghost" className="text-[#6C5DD3]">
                      CPF
                    </Button>
                    <Button variant="ghost" className="text-[#6C5DD3]">
                      Email
                    </Button>
                    <Button variant="ghost" className="text-[#6C5DD3]">
                      Telefone
                    </Button>
                    <Button variant="ghost" className="text-[#6C5DD3]">
                      Unidade
                    </Button>
                  </div>
                  <Input
                    placeholder="Buscar Cuidador"
                    className="border rounded-md pl-2"
                  />
                </div>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar>
                            <img src="/placeholder.svg" alt="Arthur Martins" />
                            <AvatarFallback>AM</AvatarFallback>
                          </Avatar>
                          <span>Arthur Martins</span>
                        </div>
                      </TableCell>
                      <TableCell>1092.345.678-89</TableCell>
                      <TableCell>arthur@gmail.com</TableCell>
                      <TableCell>11 89887-8765</TableCell>
                      <TableCell>Nome da Unidade</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <EyeIcon className="w-4 h-4 text-[#6C5DD3]" />
                          <PencilIcon className="w-4 h-4 text-[#6C5DD3]" />
                          <TrashIcon className="w-4 h-4 text-[#6C5DD3]" />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex justify-center mt-4">
                  <Button variant="ghost" className="text-[#6C5DD3]">
                    Ver Mais
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div> */}
    </div>
  )
}

// function BuildingIcon(props: never) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
//       <path d="M9 22v-4h6v4" />
//       <path d="M8 6h.01" />
//       <path d="M16 6h.01" />
//       <path d="M12 6h.01" />
//       <path d="M12 10h.01" />
//       <path d="M12 14h.01" />
//       <path d="M16 10h.01" />
//       <path d="M16 14h.01" />
//       <path d="M8 10h.01" />
//       <path d="M8 14h.01" />
//     </svg>
//   )
// }

// function EyeIcon(props: never) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   )
// }

// function PencilIcon(props: never) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
//       <path d="m15 5 4 4" />
//     </svg>
//   )
// }

// function PlusIcon(props: never) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M5 12h14" />
//       <path d="M12 5v14" />
//     </svg>
//   )
// }

// function TrashIcon(props: ) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 6h18" />
//       <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
//       <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//     </svg>
//   )
// }

// function UsersIcon(props: never) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   )
// }
