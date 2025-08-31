import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { IntegrationHub } from '@/components/integrations/integration-hub'

export default function IntegrationsPage() {
  return (
    <DashboardLayout>
      <IntegrationHub />
    </DashboardLayout>
  )
}