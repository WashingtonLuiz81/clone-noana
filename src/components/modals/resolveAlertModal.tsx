import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangleIcon } from 'lucide-react'

interface ResolveAlertModalProps {
  onClose: () => void
}

export default function ResolveAlertModal({ onClose }: ResolveAlertModalProps) {
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[590px] p-8 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white rounded-xl shadow-md border-gray-900">
          <AlertTriangleIcon className="w-6 h-6 text-primary" />
        </div>

        <DialogHeader className="flex flex-col gap-3 mb-8">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Resolver Alerta
          </DialogTitle>

          <DialogDescription className="text-lg font-medium text-gray-700 text-opacity-70">
            Alterar o status desse alerta para resolvido ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 mt-8">
          <Button
            type="button"
            variant="outline"
            className="flex-1 p-6 bg-gray-100 text-lg font-semibold border-gray-200"
            onClick={onClose}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="destructive"
            className="flex-1 p-6 bg-primary text-white text-lg font-semibold"
          >
            Sim, Alerta Resolvido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
