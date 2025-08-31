import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { AppNav } from '@/components/nav'

export const metadata: Metadata = {
  title: 'FulQrun',
  description: 'PEAK + MEDDPICC-native sales operations platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <AppNav />
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
