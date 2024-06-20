import { getUser, refreshAccessToken } from '@/lib/utils'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
        token.UserId = user.UserId
        token.IdToken = user.IdToken
        token.AccessToken = user.AccessToken
        token.RefreshToken = user.RefreshToken
        token.ExpiresIn = Date.now() + user.ExpiresIn * 1000
        token.FirstAccess = user.FirstAccess
        return await getUser(token)
      }

      if (Date.now() < token.ExpiresIn) {
        return await getUser(token)
      }

      // Caso o token de acesso tenha expirado, renovar usando o refresh_token
      token = await refreshAccessToken(token)
      return await getUser(token)
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...token.user,
        },
      }
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
