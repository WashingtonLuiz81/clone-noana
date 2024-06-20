import {
  getUser,
  refreshAccessToken,
  UserToken,
  RefreshResult,
} from '@/lib/utils'
import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface CustomUser extends User {
  tokenInfo: {
    UserId: string
    IdToken: string
    AccessToken: string
    RefreshToken: string
    ExpiresIn: number
    FirstAccess: boolean
  }
}

// Type guard para verificar se o token é do tipo UserToken
function isUserToken(token: unknown): token is UserToken {
  if (typeof token === 'object' && token !== null) {
    const t = token as Record<string, unknown>
    return (
      typeof t.UserId === 'string' &&
      typeof t.IdToken === 'string' &&
      typeof t.AccessToken === 'string' &&
      typeof t.RefreshToken === 'string' &&
      typeof t.ExpiresIn === 'number' &&
      typeof t.FirstAccess === 'boolean'
    )
  }
  return false
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.NEXT_APP_API_URL}/auth/`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        const responseJson = await response.json()

        if (response.ok) {
          return responseJson.AuthenticationResult
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userToken: Omit<UserToken, 'user'> = {
          UserId: user.UserId,
          IdToken: user.IdToken,
          AccessToken: user.AccessToken,
          RefreshToken: user.RefreshToken,
          ExpiresIn: Date.now() + user.ExpiresIn * 1000,
          FirstAccess: user.FirstAccess,
        }
        const tokenWithUser = await getUser(userToken as UserToken)
        return {
          ...tokenWithUser,
          user: tokenWithUser.user,
        }
      }

      if (isUserToken(token)) {
        if (Date.now() < token.ExpiresIn) {
          const tokenWithUser = await getUser(token)
          return {
            ...tokenWithUser,
            user: tokenWithUser.user,
          }
        } else {
          const refreshedTokenResult: RefreshResult =
            await refreshAccessToken(token)

          if ('error' in refreshedTokenResult) {
            // Tratar o erro de renovação de token aqui
            console.error(
              'Erro ao renovar o token:',
              refreshedTokenResult.error,
            )
            // Retornar o token original, pois o refresh falhou
            return token
          }

          // Se a renovação for bem-sucedida, obtenha o usuário com o novo token
          const tokenWithUser = await getUser(refreshedTokenResult)
          return {
            ...tokenWithUser,
            user: tokenWithUser.user,
          }
        }
      }

      return token
    },
    async session({ session, token }) {
      const userToken = token as unknown as UserToken
      if (userToken && userToken.user) {
        session.user = {
          ...session.user,
          ...userToken.user,
        } as unknown as CustomUser
        ;(session.user as CustomUser).tokenInfo = {
          UserId: userToken.UserId,
          IdToken: userToken.IdToken,
          AccessToken: userToken.AccessToken,
          RefreshToken: userToken.RefreshToken,
          ExpiresIn: userToken.ExpiresIn,
          FirstAccess: userToken.FirstAccess,
        }
      }
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
