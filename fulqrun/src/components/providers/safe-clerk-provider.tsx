'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface SafeClerkProviderProps {
  children: ReactNode
}

export function SafeClerkProvider({ children }: SafeClerkProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // Check if we have a valid Clerk key
  const hasValidKey = publishableKey && 
    publishableKey !== 'your_clerk_publishable_key_here' &&
    publishableKey !== 'pk_test_demo_development_key' &&
    !publishableKey.includes('demo') &&
    publishableKey.length > 20

  if (!hasValidKey) {
    // Demo mode - no Clerk provider
    return <>{children}</>
  }

  // Production mode - with Clerk provider
  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  )
}