import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RepDashboard } from '@/components/dashboards/rep-dashboard'
import { ManagerDashboard } from '@/components/dashboards/manager-dashboard'
import { AdminDashboard } from '@/components/dashboards/admin-dashboard'

export default async function DashboardPage() {
  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  const supabase = await createClient()
  
  // Check if user exists in our database
  const { data: dbUser } = await supabase
    .from('users')
    .select('*, organizations(*)')
    .eq('clerk_id', user.id)
    .single()

  // If user doesn't exist, redirect to onboarding
  if (!dbUser) {
    redirect('/onboarding')
  }

  const renderDashboard = () => {
    switch (dbUser.role) {
      case 'manager':
        return <ManagerDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <RepDashboard />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-muted-foreground">
            {dbUser.organizations?.name} • {dbUser.role} • {dbUser.territory || 'No territory assigned'}
          </p>
        </div>

        {/* Role-based Dashboard Content */}
        {renderDashboard()}
      </div>
    </DashboardLayout>
  )
}