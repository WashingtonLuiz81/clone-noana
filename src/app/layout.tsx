'use client'
import { Poppins } from 'next/font/google'
import './globals.css'
import NextAuthSessionProvider from '@/providers/sessionProvider'
import Head from './head'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt_BR">
      <Head />
      <body className={`${poppins.className} antialiased`}>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  )
}
