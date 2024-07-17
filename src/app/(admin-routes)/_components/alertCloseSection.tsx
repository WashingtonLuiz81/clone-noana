import { Button } from '@/components/ui/button'

interface AlertCloseSectionProps {
  handleExitAction: (action: boolean) => boolean
}

export const AlertCloseSection: React.FC<AlertCloseSectionProps> = ({
  handleExitAction,
}) => {
  return (
    <div className="fixed right-0 left-0 top-0 h-screen bg-black bg-opacity-10 z-50">
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-white bg-opacity-70 blur-xl z-0" />
      <div className="relative flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4 mt-24 z-10 mx-6">
        <div>
          <p className="text-base font-medium text-gray-700">
            Tem certeza que deseja fechar?
          </p>
          <p className="text-base font-medium text-gray-700">
            Se você fechar agora, os dados inseridos não serão salvos.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="w-28 text-sm font-semibold bg-gray-100 text-gray-900 hover:bg-gray-100 shadow-sm"
            onClick={() => handleExitAction(false)}
          >
            Cancelar
          </Button>
          <Button
            className="w-36 text-sm font-semibold bg-status-error text-white hover:bg-status-error shadow-sm"
            onClick={() => handleExitAction(true)}
          >
            Fechar Agora
          </Button>
        </div>
      </div>
    </div>
  )
}
