import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RepDashboard } from '@/components/dashboards/rep-dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  // Demo mode - show all dashboard types
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Demo Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-green-800">🎉 Welcome to FulQrun Demo!</h2>
          <p className="text-sm text-green-700 mb-3">
            You&apos;re now viewing the complete sales operations platform. Explore all features with interactive demo data.
          </p>
          <div className="flex gap-2">
            <Link href="/leads">
              <Button size="sm" variant="outline">View Leads</Button>
            </Link>
            <Link href="/opportunities">
              <Button size="sm" variant="outline">View Opportunities</Button>
            </Link>
            <Link href="/analytics">
              <Button size="sm" variant="outline">View Analytics</Button>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
          <p className="text-muted-foreground">
            Your complete sales operations command center
          </p>
        </div>

        {/* Default to Rep Dashboard for demo */}
        <RepDashboard />
      </div>
    </DashboardLayout>
  )
}