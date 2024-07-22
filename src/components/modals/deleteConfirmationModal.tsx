import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'

interface DeleteConfirmationModalProps {
  label: string
  onClose: () => void
}

export default function DeleteConfirmationModal({
  onClose,
  label,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[590px] p-8 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white rounded-md shadow-md border-gray-900">
          <Trash2Icon className="w-6 h-6 text-red-600" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Deletar {label}?
          </DialogTitle>

          <DialogDescription className="mt-2 text-lg font-medium text-gray-950/70">
            Tem certeza que deseja deletar este usuário?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1 p-6 bg-gray-100 text-lg font-semibold"
          >
            Cancelar
          </Button>

          <Button
            variant="destructive"
            className="flex-1 p-6 bg-red-600 text-white text-lg font-semibold"
          >
            Sim, Deletar Agora
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
