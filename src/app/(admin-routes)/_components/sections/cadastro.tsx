import * as React from 'react'
import Input from '@/components/form/FormInput'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Cadastro() {
  return (
    <>
      <div className="flex flex-col items-start px-5 py-5 justify-center border bg-gray-100">
        <h1 className="text-2xl py-10">Cadastrar Unidade de Cuidado</h1>
        <div className="w-full  max-w-4xl p-8 bg-white rounded-md shadow-md">
          <h2 className="text-xl font-semibold">
            Preencha os dados da Unidade
          </h2>
          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome da Unidade</label>
                <Input
                  className="h-10 rounded-xl outline-none"
                  placeholder="Nome da Unidade"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ">
                  Telefone de Contato
                </label>
                <Input
                  className="h-10 rounded-xl outline-none"
                  placeholder="Telefone de Contato"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">E-mail de contato</label>
                <Input
                  className="h-10 rounded-xl outline-none"
                  placeholder="E-mail de contato"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CEP</label>
                <Input
                  className="h-10 rounded-xl outline-none"
                  placeholder="CEP"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço</label>
                <Input
                  className="h-10 rounded-xl outline-none"
                  placeholder="Endereço"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Complemento</label>
                <Input
                  className="h-10 rounded-xl outline-none"
                  placeholder="Complemento"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Estado</label>
                <Select>
                  <SelectTrigger className="w-[385px]">
                    <SelectValue placeholder="Selecione o Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estado</SelectLabel>
                      <SelectItem value="São Paulo">São Paulo</SelectItem>
                      <SelectItem value="Paraná">Paraná</SelectItem>
                      <SelectItem value="Santa Catarina">
                        Santa Catarina
                      </SelectItem>
                      <SelectItem value="Rio Grande do Sul">
                        Rio Grande do Sul
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cidade</label>
                <Select>
                  <SelectTrigger className="w-[385px]">
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cidade</SelectLabel>
                      <SelectItem value="São Paulo">São Paulo</SelectItem>
                      <SelectItem value="Curitiba">Curitiba</SelectItem>
                      <SelectItem value="Florianopólis">
                        Florianopólis
                      </SelectItem>
                      <SelectItem value="Porto Alegre">Porto Alegre</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-purple-600 text-white">
                Cadastrar Unidade
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
