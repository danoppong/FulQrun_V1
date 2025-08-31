'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'

interface AuthContextType {
  isSignedIn: boolean
  user: Record<string, unknown> | null
  isLoaded: boolean
  isDemo: boolean
}

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  user: null,
  isLoaded: true,
  isDemo: true
})

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // Check if Clerk is properly configured
  const isClerkConfigured = publishableKey && 
    publishableKey !== 'your_clerk_publishable_key_here' &&
    publishableKey !== 'pk_test_demo_development_key' &&
    !publishableKey.includes('demo')

  if (!isClerkConfigured) {
    // Demo mode context
    const demoContext: AuthContextType = {
      isSignedIn: false,
      user: null,
      isLoaded: true,
      isDemo: true
    }

    return (
      <AuthContext.Provider value={demoContext}>
        {children}
      </AuthContext.Provider>
    )
  }

  // Production mode - use Clerk data
  return <ClerkAuthProvider>{children}</ClerkAuthProvider>
}

function ClerkAuthProvider({ children }: { children: ReactNode }) {
  const clerkData = useUser()

  const contextValue: AuthContextType = {
    ...clerkData,
    isDemo: false
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}