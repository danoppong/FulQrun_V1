import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Demo middleware - allows all routes for preview
export function middleware(_request: NextRequest) {
  // For demo purposes, allow all routes
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}