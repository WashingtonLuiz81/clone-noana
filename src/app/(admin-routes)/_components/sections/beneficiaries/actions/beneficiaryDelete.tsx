import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'

export default function BeneficiaryDelete() {
  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[590px] p-8 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white rounded-md shadow-md border-gray-900">
          <TrashIcon className="w-6 h-6 text-red-600" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Deletar Beneficiário?
          </DialogTitle>
          <DialogDescription className="mt-2 text-lg font-medium text-gray-950/70">
            Tem certeza que deseja deletar este usuário?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex mt-4">
          <Button
            variant="outline"
            className="mr-2 p-6 bg-gray-100 text-lg font-semibold"
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            className="p-6 bg-red-600 text-white text-lg font-semibold"
          >
            Sim, Deletar Agora
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
