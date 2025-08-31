import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RepDashboard } from '@/components/dashboards/rep-dashboard'
import { ManagerDashboard } from '@/components/dashboards/manager-dashboard'
import { AdminDashboard } from '@/components/dashboards/admin-dashboard'

export default async function DashboardPage() {
  const user = await currentUser()
  
  // Check if this is demo mode (no authentication)
  if (!user) {
    // Demo mode dashboard
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Demo Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-800">🎯 Demo Mode</h2>
            <p className="text-sm text-blue-700">
              You&apos;re viewing the demo version. All data is simulated for demonstration purposes.
            </p>
          </div>

          {/* Welcome Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome to FulQrun!
            </h1>
            <p className="text-muted-foreground">
              Demo Organization • Sales Rep • Demo Territory
            </p>
          </div>

          {/* Demo Dashboard Content */}
          <RepDashboard />
        </div>
      </DashboardLayout>
    )
  }

  // Production mode with authentication
  try {
    const supabase = await createClient()
    
    // Check if user exists in our database
    const { data: dbUser, error } = await supabase
      .from('users')
      .select('*, organizations(*)')
      .eq('clerk_id', user.id)
      .single()

    // If user doesn't exist or database error, redirect to onboarding
    if (!dbUser || error) {
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
  } catch (error) {
    console.error('Dashboard error:', error)
    // Fallback to demo mode if database fails
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Database Error Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-yellow-800">⚠️ Database Connection Issue</h2>
            <p className="text-sm text-yellow-700">
              Unable to connect to database. Running in demo mode with sample data.
            </p>
          </div>

          {/* Welcome Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome, {user.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Demo Mode • Sales Representative
            </p>
          </div>

          {/* Demo Dashboard Content */}
          <RepDashboard />
        </div>
      </DashboardLayout>
    )
  }
}