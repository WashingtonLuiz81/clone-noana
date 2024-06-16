/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Token {
    userId: string
    name: number
    lastName: string
    profile: string
    firstAccess: boolean
    idToken: string
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { Session } from 'next-auth'
// import { JWT } from 'next-auth/jwt'

// declare module 'next-auth' {
//   interface Session {
//     userId: string
//     name: number
//     lastName: string
//     profile: string
//     firstAccess: boolean
//     idToken: string
//     accessToken: string
//     refreshToken: string
//     expiresIn: number
//   }

//   interface User {
//     userId: string
//     name: number
//     lastName: string
//     profile: string
//     firstAccess: boolean
//     idToken: string
//     accessToken: string
//     refreshToken: string
//     expiresIn: number
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     userId: string
//     name: number
//     lastName: string
//     profile: string
//     firstAccess: boolean
//     idToken: string
//     accessToken: string
//     refreshToken: string
//     expiresIn: number
//   }
// }
