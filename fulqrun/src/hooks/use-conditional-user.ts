'use client'

import { useUser } from '@clerk/nextjs'

export function useConditionalUser() {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // Check if Clerk is properly configured
  const isClerkConfigured = publishableKey && 
    publishableKey !== 'your_clerk_publishable_key_here' &&
    publishableKey !== 'pk_test_demo_development_key' &&
    !publishableKey.includes('demo')

  let clerkData
  try {
    // Only call useUser if Clerk is configured
    clerkData = isClerkConfigured ? useUser() : null
  } catch (error) {
    // Handle case where useUser is called outside ClerkProvider
    clerkData = null
  }

  if (!isClerkConfigured || !clerkData) {
    // Return demo user data when Clerk is not configured
    return {
      isSignedIn: false,
      user: null,
      isLoaded: true,
      isDemo: true
    }
  }

  // Return real Clerk data when properly configured
  return {
    ...clerkData,
    isDemo: false
  }
}