'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Building2, 
  Contact, 
  Home, 
  Target, 
  Users, 
  Settings,
  TrendingUp,
  User,
  GitBranch,
  Brain,
  Zap,
  GraduationCap,
  Crown,
  Map,
  Heart,
  Mic
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Leads', href: '/leads', icon: Users },
  { name: 'Opportunities', href: '/opportunities', icon: Target },
  { name: 'Pipeline Builder', href: '/pipeline', icon: GitBranch },
  { name: 'Contacts', href: '/contacts', icon: Contact },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Customer Success', href: '/customer-success', icon: Heart },
  { name: 'Territory & Quota', href: '/territory', icon: Map },
  { name: 'Executive Center', href: '/executive', icon: Crown },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'AI Insights', href: '/ai-insights', icon: Brain },
  { name: 'Performance', href: '/performance', icon: TrendingUp },
  { name: 'Integrations', href: '/integrations', icon: Zap },
  { name: 'Learning', href: '/learning', icon: GraduationCap },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">FulQrun</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}