import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { LockKeyholeIcon } from 'lucide-react'
import { PasswordInput } from '../form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface ChangePasswordModalProps {
  onClose: () => void
}

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(9, 'A nova senha deve ter no mínimo 9 caracteres')
      .regex(/[a-z]/, 'A nova senha deve conter pelo menos uma letra minúscula')
      .regex(/[A-Z]/, 'A nova senha deve conter pelo menos uma letra maiúscula')
      .regex(/\d/, 'A nova senha deve conter pelo menos um número')
      .regex(/[^a-zA-Z0-9]/, 'A nova senha deve conter pelo menos um símbolo'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  })

type PasswordSchema = z.infer<typeof passwordSchema>

export default function ChangePasswordModal({
  onClose,
}: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = (data: PasswordSchema) => {
    console.log(data)
    onClose()
  }

  return (
    <Dialog defaultOpen onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[590px] p-8 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-white rounded-xl shadow-md border-gray-900">
          <LockKeyholeIcon className="w-6 h-6 text-primary" />
        </div>

        <DialogHeader className="flex flex-col gap-3 mb-8">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Alterar Senha
          </DialogTitle>

          <DialogDescription className="text-lg font-medium text-gray-700 text-opacity-70">
            Deseja alterar a senha deste usuário?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="mt-1 relative">
              <div className="relative">
                <PasswordInput
                  {...register('newPassword')}
                  placeholder="Nova Senha"
                  error={errors.newPassword?.message}
                />
              </div>
            </div>

            <div className="mt-1 relative">
              <div className="relative">
                <PasswordInput
                  {...register('confirmPassword')}
                  placeholder="Confirmar Nova Senha"
                  error={errors.confirmPassword?.message}
                />
              </div>
            </div>
          </div>

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
              disabled={!isValid}
            >
              Salvar Nova Senha
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
