import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/demo(.*)',
  '/demo-dashboard',
  '/preview',
  '/sign-in(.*)',
  '/sign-up(.*)',
])

// Check if we have valid Clerk keys
const hasValidClerkKeys = () => {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  return publishableKey && 
    publishableKey !== 'your_clerk_publishable_key_here' &&
    publishableKey !== 'pk_test_demo_development_key' &&
    !publishableKey.includes('demo') &&
    publishableKey.length > 20
}

export default async function middleware(req: Request) {
  // If no valid Clerk keys, allow all routes in demo mode
  if (!hasValidClerkKeys()) {
    return NextResponse.next()
  }

  // Use Clerk middleware only if we have valid keys
  return clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect()
    }
  })(req)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}