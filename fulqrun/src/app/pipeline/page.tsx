import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { PipelineBuilder } from '@/components/pipeline/pipeline-builder'

export default function PipelinePage() {
  return (
    <DashboardLayout>
      <PipelineBuilder />
    </DashboardLayout>
  )
}