export interface ApiClientOptions {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  token?: string
}

export async function apiClient<T>({
  endpoint,
  method = 'GET',
  body,
  token,
}: ApiClientOptions): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
