'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'

export function AppNav() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-medium">FulQrun</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/leads" className="hover:underline">Leads</Link>
          <Link href="/opportunities" className="hover:underline">Opportunities</Link>
          <Link href="/contacts" className="hover:underline">Contacts</Link>
          <Link href="/companies" className="hover:underline">Companies</Link>
          <Link href="/analytics" className="hover:underline">Analytics</Link>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Sign in</button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  )
}
