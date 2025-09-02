import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { TerritoryManagement } from '@/components/territory/territory-management'

export default function TerritoryPage() {
  return (
    <DashboardLayout>
      <TerritoryManagement />
    </DashboardLayout>
  )
}