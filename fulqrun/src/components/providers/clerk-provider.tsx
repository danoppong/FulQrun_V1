'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface ConditionalClerkProviderProps {
  children: ReactNode
}

export function ConditionalClerkProvider({ children }: ConditionalClerkProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // Check if Clerk is properly configured
  const isClerkConfigured = publishableKey && 
    publishableKey !== 'your_clerk_publishable_key_here' &&
    publishableKey !== 'pk_test_demo_development_key' &&
    !publishableKey.includes('demo')

  if (!isClerkConfigured) {
    // Return children without Clerk provider for demo mode
    console.log('Clerk not configured - running in demo mode')
    return <>{children}</>
  }

  // Return children wrapped with Clerk provider for production
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  )
}