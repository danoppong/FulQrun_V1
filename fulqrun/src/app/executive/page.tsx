import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ExecutiveCommandCenter } from '@/components/executive/command-center'

export default function ExecutivePage() {
  return (
    <DashboardLayout>
      <ExecutiveCommandCenter />
    </DashboardLayout>
  )
}