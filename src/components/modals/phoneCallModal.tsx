import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface CallBeneficiaryModalProps {
  onClose: () => void
}

const PhoneCallModal = ({ onClose }: CallBeneficiaryModalProps) => {
  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[390px] h-60 p-10 bg-gradient-to-b from-purple-900 to-purple-800 text-white rounded-lg border-none">
        <div className="flex items-center p-2 gap-9 ">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://img.freepik.com/vetores-premium/ilustracao-de-avatar-de-empresario-retrato-de-usuario-de-desenho-animado-icone-de-perfil-de-usuario_118339-5507.jpg" />
            <AvatarFallback>LA</AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-2xl font-semibold">
              Laís Alves
            </DialogTitle>
            <DialogDescription className="text-sm text-purple-200 font-medium">
              laisalves@gmail.com
            </DialogDescription>
            <p className="text-xs font-medium text-purple-200">
              +55 11 98765 7840
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PhoneCallModal
