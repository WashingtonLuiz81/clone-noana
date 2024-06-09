// utils/api.ts

interface RequestOptions {
  method?: string
  headers?: HeadersInit
  body?: unknown
}

/**
 * Faz uma chamada à API com autenticação Bearer.
 * @param {string} url - A URL da API.
 * @param {any} token - O token de autenticação Bearer.
 * @param {RequestOptions} options - Opções adicionais para a requisição (opcional).
 * @returns {Promise<any>} - A resposta da API.
 */
export const apiRequest = async (
  url: string,
  token: string,
  options: RequestOptions = {},
): Promise<unknown> => {
  const defaultHeaders: HeadersInit = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: defaultHeaders,
    body: options.body ? JSON.stringify(options.body) : null,
  }

  if (config.method === 'GET' || config.method === 'HEAD') {
    delete config.body // GET e HEAD não devem ter um corpo
  }

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/${url}`, config)
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Erro na chamada à API:', error)
    throw error
  }
}
