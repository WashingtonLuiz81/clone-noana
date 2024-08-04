import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { InfoIcon } from 'lucide-react'

interface DeleteConfirmationModalProps {
  label: string
  onClose: () => void
}

export default function InfoDeleteUnitCareModal({
  onClose,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[590px] p-8 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white rounded-md shadow-md border-gray-900">
          <InfoIcon className="w-6 h-6 text-red-600" />
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Está unidade não pode ser deletada!
          </DialogTitle>

          <DialogDescription className="mt-2 text-lg font-medium text-gray-950/70">
            Para deletar, você precisa desvincular todos os Beneficiários.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 mt-4" onClick={() => onClose()}>
          <Button
            variant="destructive"
            className="flex-1 p-6 bg-primary text-white text-lg font-semibold"
          >
            Ok, entendi!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
