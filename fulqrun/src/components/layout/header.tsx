'use client'

import { useUser, UserButton } from '@clerk/nextjs'
import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlobalSearch } from '@/components/search/global-search'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { usePathname } from 'next/navigation'

export function Header() {
  const { isSignedIn } = useUser()
  const pathname = usePathname()
  const isDemoMode = pathname?.startsWith('/demo')

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center space-x-4">
        <GlobalSearch />
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        
        {isDemoMode ? (
          // Demo mode - show demo user
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              <p className="font-medium">Demo User</p>
            </div>
          </div>
        ) : isSignedIn ? (
          // Authenticated user
          <UserButton afterSignOutUrl="/" />
        ) : (
          // Not authenticated - show sign in button
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              <p className="font-medium">Guest</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}