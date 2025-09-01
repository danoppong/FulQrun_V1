import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@/lib/supabase/server'
import { productionConfig } from '@/lib/config/production'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RepDashboard } from '@/components/dashboards/rep-dashboard'
import { ManagerDashboard } from '@/components/dashboards/manager-dashboard'
import { AdminDashboard } from '@/components/dashboards/admin-dashboard'

export default async function DashboardPage() {
  // Validate production environment
  try {
    productionConfig.validateEnvironment()
  } catch (error) {
    // Production environment not properly configured
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-2xl text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-800 mb-4">🚨 Production Configuration Required</h1>
            <p className="text-red-700 mb-4">
              This is the production branch. Please configure the following environment variables:
            </p>
            <ul className="text-left text-sm text-red-600 space-y-1 mb-4">
              <li>• NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from Clerk dashboard)</li>
              <li>• CLERK_SECRET_KEY (from Clerk dashboard)</li>
              <li>• NEXT_PUBLIC_SUPABASE_URL (from Supabase project)</li>
              <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY (from Supabase project)</li>
              <li>• SUPABASE_SERVICE_ROLE_KEY (from Supabase project)</li>
            </ul>
            <p className="text-xs text-red-600">
              Error: {(error as Error).message}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const user = await currentUser()
  
  if (!user) {
    redirect('/sign-in')
  }

  // Production mode - require database connection
  const supabase = await createClient()
  
  // Test database connection first
  try {
    await supabase.from('organizations').select('count').limit(1)
  } catch (dbError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-2xl text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-800 mb-4">🔌 Database Connection Failed</h1>
            <p className="text-red-700 mb-4">
              Unable to connect to Supabase database. Please check:
            </p>
            <ul className="text-left text-sm text-red-600 space-y-1 mb-4">
              <li>• Supabase project is running and accessible</li>
              <li>• NEXT_PUBLIC_SUPABASE_URL is correct</li>
              <li>• NEXT_PUBLIC_SUPABASE_ANON_KEY is valid</li>
              <li>• Database schema has been applied</li>
              <li>• Row Level Security policies are configured</li>
            </ul>
            <p className="text-xs text-red-600">
              Database Error: {(dbError as Error).message}
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  // Check if user exists in our database
  const { data: dbUser, error } = await supabase
    .from('users')
    .select('*, organizations(*)')
    .eq('clerk_id', user.id)
    .single()

  // If user doesn't exist, redirect to onboarding
  if (!dbUser) {
    if (error) {
      console.error('Database query error:', error)
    }
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
        {/* Production Success Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-green-800">✅ Production Mode</h2>
          <p className="text-sm text-green-700">
            Connected to production database with real user data and authentication.
          </p>
        </div>

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