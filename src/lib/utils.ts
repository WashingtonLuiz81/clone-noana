import { type ClassValue, clsx } from 'clsx'
import { JWT } from 'next-auth/jwt'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const refreshAccessToken = async (token: JWT) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_APP_API_URL}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RefreshToken: token.refreshToken,
        }),
      },
    )

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      AccessToken: refreshedTokens.AccessToken,
      IdToken: refreshedTokens.IdToken,
      RefreshToken: refreshedTokens.RefreshToken ?? token.refreshToken, // Fall back to old refresh token
      ExpiresIn: Date.now() + refreshedTokens.ExpiresIn * 1000,
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export const getUser = async (token: { IdToken: never }) => {
  const res = await fetch(`${process.env.NEXT_APP_API_URL}/person/person`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.IdToken}`,
    },
  })

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
