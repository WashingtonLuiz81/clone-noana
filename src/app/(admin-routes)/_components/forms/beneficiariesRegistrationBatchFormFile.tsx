import React, { useState, useCallback } from 'react'
import { usePapaParse } from 'react-papaparse'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDropzone } from 'react-dropzone'
import { UploadIcon, ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BeneficiariesRegistrationBatchFormFileProps {
  nextStep: () => void
}

interface CSVRow {
  fullName: string
  cpf: string
  birthDate: string
  areaCode: string
  phoneNumber: string
  postalCode: string
  address: string
  neighborhood: string
  number: string
  complement: string
  city: string
  state: string
}

const MAX_FILE_SIZE = 2 * 1024 * 1024

const csvSchema = z.object({
  file: z
    .instanceof(File, { message: 'É obrigatório escolher um arquivo' })
    .refine((file) => file.type === 'text/csv', {
      message: 'Apenas arquivos CSV são permitidos',
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: 'O arquivo deve ter no máximo 2MB',
    }),
})

type CSVSchema = z.infer<typeof csvSchema>

export default function BeneficiariesRegistrationBatchFormFile({
  nextStep,
}: BeneficiariesRegistrationBatchFormFileProps) {
  const [jsonResult, setJsonResult] = useState<CSVRow[]>([])
  const [fileName, setFileName] = useState<string | null>(null)
  const { readString } = usePapaParse()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CSVSchema>({
    resolver: zodResolver(csvSchema),
  })

  const handleFileRead = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onload = () => {
        const csvData = reader.result?.toString() || ''
        readString<CSVRow>(csvData, {
          header: true,
          complete: (results) => {
            setJsonResult(results.data)
          },
          skipEmptyLines: true,
        })
      }
      reader.readAsText(file)
    },
    [readString],
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setValue('file', file)
        setFileName(file.name)
        handleFileRead(file)
      }
    },
    [setValue, handleFileRead],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
  })

  const handleFileUpload = (data: CSVSchema) => {
    const file = data.file
    handleFileRead(file)
    console.log('jsonResult: ', jsonResult)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(handleFileUpload)}>
      <span className="text-gray-900 text-xl font-semibold mb-8 block mt-4">
        Agora, vincule o beneficiário à uma unidade e dispositivo
      </span>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-4 mb-4 rounded cursor-pointer ${
          isDragActive ? 'border-blue-500' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} {...register('file')} />

        <label
          htmlFor="csv-upload"
          className="flex flex-col items-center justify-center cursor-pointer py-11"
        >
          <div className="w-11 h-11 flex items-center justify-center bg-primary rounded text-white shadow-sm mb-4 border border-gray-200">
            <UploadIcon width={28} height={28} color="white" />
          </div>

          {isDragActive ? (
            <p className="text-base font-medium text-gray-900 mb-2">
              Solte o arquivo aqui...
            </p>
          ) : (
            <p className="text-base font-medium text-gray-900 mb-2">
              Clique ou arraste um arquivo para fazer upload
            </p>
          )}

          <span className="text-base font-normal text-gray-500">
            O arquivo em .xls deve ter no máximo 2MB
          </span>
        </label>
      </div>

      {fileName && <p className="mb-4">Arquivo selecionado: {fileName}</p>}
      {errors.file && <p className="text-red-500">{errors.file.message}</p>}

      <div className="flex justify-end mt-8">
        <Button
          type="submit"
          className="flex items-center space-x-2 text-white"
        >
          <span>Continuar</span>
          <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  )
}
