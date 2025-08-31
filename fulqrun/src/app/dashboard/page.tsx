import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RepDashboard } from '@/components/dashboards/rep-dashboard'
import { ManagerDashboard } from '@/components/dashboards/manager-dashboard'
import { AdminDashboard } from '@/components/dashboards/admin-dashboard'

export default function DashboardPage() {
  // In production, this would come from user context
  const userRole = 'rep' as 'rep' | 'manager' | 'admin'

  const renderDashboard = () => {
    switch (userRole) {
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
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your FulQrun sales operations platform
          </p>
        </div>

        {/* Role-based Dashboard Content */}
        {renderDashboard()}
      </div>
    </DashboardLayout>
  )
}