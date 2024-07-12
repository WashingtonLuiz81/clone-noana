import { apiClient } from '@/lib/api'

export async function fetchNotificationMessagesTotalizer(token?: string) {
  const endpoint = `/api/notification/messages_totalizer/`
  return apiClient<{ total: number }>({ endpoint, token })
}
