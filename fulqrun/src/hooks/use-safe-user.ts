'use client'

import { useState, useEffect } from 'react'

export function useSafeUser() {
  const [safeData, setSafeData] = useState({
    isSignedIn: false,
    user: null,
    isLoaded: true,
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
      // Demo mode
      setSafeData({
        isSignedIn: false,
        user: null,
        isLoaded: true,
        isDemo: true
      })
    } else {
      // In production, we would use real Clerk data
      // For now, return demo data to avoid hook violations
      setSafeData({
        isSignedIn: false,
        user: null,
        isLoaded: true,
        isDemo: true
      })
    }
  }, [])

  return safeData
}