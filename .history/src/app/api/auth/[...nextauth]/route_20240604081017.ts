import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'


interface AuthenticationResult {
  IdToken: string;
  AccessToken: string;
  RefreshToken: string;
  ExpiresIn: number;
}
interface AuthResponse {
  authenticationResult: AuthenticationResult;
}

interface Token {
  authenticationResult: AuthenticationResult;
}


const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials:any) {
        const response = await fetch('https://admin.hml.noana.link/v1/auth/', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })

        const responseJson = await response.json()

        if (response.ok && responseJson) {
       
          console.log(responseJson.AuthenticationResult.IdToken)
          return responseJson.AuthenticationResult.IdToken;
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token: Token, user }) {
      console.log('token: ', token)
      console.log('user: ', user)

      user && (token.AccessToken = user)
      return token
    },
    async session({ session, token }) {
      // console.log('Session: ', session)
      // console.log('Token session: ', token)
      session = token.AccessToken as never
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }
