import { AlertTriangleIcon, CheckIcon } from 'lucide-react'
import { Button } from './ui/button'

interface ResolveAlertProps {
  status?: boolean
  resolveAlertFunction?: () => void
}

export default function ResolveAlert({
  status,
  resolveAlertFunction,
}: ResolveAlertProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border ${status ? 'border-green-600 bg-green-50' : 'border-status-error bg-red-50'}`}
    >
      <span
        className={`w-10 h-10 flex items-center justify-center rounded-xl ${status ? 'text-green-700 bg-green-200' : 'text-red-600 bg-red-100'}`}
      >
        {status ? <CheckIcon /> : <AlertTriangleIcon />}
      </span>

      <span className="flex-1 text-gray-900 text-base font-semibold">
        {status
          ? 'Este alerta já foi resolvido!'
          : 'Este alerta ainda não foi resolvido!'}
      </span>

      {!status && (
        <Button className="text-white" onClick={resolveAlertFunction}>
          Resolver Alerta
        </Button>
      )}
    </div>
  )
}
