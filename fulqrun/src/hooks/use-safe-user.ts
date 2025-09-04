'use client'

import { useState, useEffect } from 'react'
import { useUser, UserResource } from '@clerk/nextjs'

export function useSafeUser() {
  const { user, isLoaded } = useUser()
  const [safeData, setSafeData] = useState({
    isSignedIn: false,
    user: null as UserResource | null,
    isLoaded: false,
    isDemo: true
  })

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return

    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    const hasValidKey = publishableKey && 
      publishableKey !== 'your_clerk_publishable_key_here' &&
      publishableKey !== 'pk_test_demo_development_key' &&
      !publishableKey.includes('demo') &&
      publishableKey.length > 20

    if (!hasValidKey) {
      // Demo mode - no valid Clerk key
      setSafeData({
        isSignedIn: false,
        user: null,
        isLoaded: true,
        isDemo: true
      })
    } else {
      // Production mode - use real Clerk data
      setSafeData({
        isSignedIn: !!user,
        user: user,
        isLoaded: isLoaded,
        isDemo: false
      })
    }
  }, [user, isLoaded])

  return safeData
}