type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface FetchOptions {
  method?: HttpMethod
  token?: string | null
}

const fetchApi = async <T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { method = 'GET', token = null } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    console.error('Fetch API Error:', error)
    throw error
  }
}

// Uso da função para a URL fornecida:
fetchApi('http://admin.hml.noana.link/v1/notification/messages_totalizer/')
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
