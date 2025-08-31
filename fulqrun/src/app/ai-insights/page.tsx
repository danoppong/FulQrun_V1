import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AdvancedAnalytics } from '@/components/analytics/advanced-analytics'

export default function AIInsightsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Insights & Analytics</h1>
          <p className="text-muted-foreground">
            Advanced analytics with AI-powered insights and predictive recommendations
          </p>
        </div>
        
        <AdvancedAnalytics />
      </div>
    </DashboardLayout>
  )
}