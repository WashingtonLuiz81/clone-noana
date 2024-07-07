import 'next-auth'

declare module 'next-auth' {
  interface User {
    UserId: string
    IdToken: string
    AccessToken: string
    RefreshToken: string
    ExpiresIn: number
    FirstAccess: boolean
  }

  interface Session {
    user: User
    expires: string
  }

  interface JWT {
    UserId: string
    IdToken: string
    AccessToken: string
    RefreshToken: string
    ExpiresIn: number
    FirstAccess: boolean
    expires: string
  }
}
