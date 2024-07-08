import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface CustomUser {
  userId: string
  name: string
  email: string
  lastName: string
  profile: string
  firstAccess: boolean
  avatar: string
  idToken: string
}

export interface UserToken {
  user: CustomUser
  UserId: string
  IdToken: string
  AccessToken: string
  RefreshToken: string
  ExpiresIn: number
  FirstAccess: boolean
}

export interface RefreshAccessTokenError {
  error: string
}

export type RefreshResult = UserToken | RefreshAccessTokenError

export const refreshAccessToken = async (
  token: UserToken,
): Promise<RefreshResult> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RefreshToken: token.RefreshToken,
        }),
      },
    )

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw new Error('Failed to refresh access token')
    }

    return {
      ...token,
      AccessToken: refreshedTokens.AccessToken,
      IdToken: refreshedTokens.IdToken,
      RefreshToken: refreshedTokens.RefreshToken ?? token.RefreshToken,
      ExpiresIn: Date.now() + refreshedTokens.ExpiresIn * 1000,
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error refreshing access token:', error.message)
    } else {
      console.error('Error refreshing access token:', error)
    }
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const getUser = async (token: UserToken) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/person/person`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.IdToken}`,
    },
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user data')
  }

  const fetchedUser = await res.json()

  return {
    ...token,
    user: {
      userId: fetchedUser[0].user.uuid,
      name: fetchedUser[0].name,
      email: fetchedUser[0].user.email,
      lastName: fetchedUser[0].last_name,
      profile: fetchedUser[0].profile,
      firstAccess: fetchedUser[0].is_first_access,
      avatar: fetchedUser[0].avatar,
      idToken: token.IdToken,
    },
  }
}
