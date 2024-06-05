import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface AuthenticationResult {
  IdToken: string
  AccessToken: string
  RefreshToken: string
  ExpiresIn: number
}

interface AccessToken {
  AuthenticationResult: AuthenticationResult
}

interface ResponseToken {
  AccessToken: AccessToken
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
        const response = await fetch('https://admin.hml.noana.link/v1/auth/', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        const responseJson = await response.json()

        if (response.ok && !responseJson.__type) {
          return responseJson
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
      const responseToken: ResponseToken = token
      /// /!!!!!!!Aqui precisa tratar a condição de erro de login!!!!!
      user && (token.AccessToken = user)
      return token
    },
    async session({ session, token }) {
      session = token.AccessToken as never
      // console.log('session session: ', session)
      // console.log('session token: ', token)
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
