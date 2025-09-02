import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { CustomerHealthDashboard } from '@/components/customer-success/customer-health-dashboard'

export default function CustomerSuccessPage() {
  return (
    <DashboardLayout>
      <CustomerHealthDashboard />
    </DashboardLayout>
  )
}