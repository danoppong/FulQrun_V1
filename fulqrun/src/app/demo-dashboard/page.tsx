import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RepDashboard } from '@/components/dashboards/rep-dashboard'

export default function DemoDashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Demo Header */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800">🎯 FulQrun Demo Mode</h2>
          <p className="text-sm text-blue-700">
            You&apos;re viewing a live demo of the FulQrun sales operations platform. 
            All data is simulated for demonstration purposes.
          </p>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your FulQrun sales operations platform
          </p>
        </div>

        {/* Rep Dashboard Content */}
        <RepDashboard />
      </div>
    </DashboardLayout>
  )
}