import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { RepDashboard } from '@/components/dashboards/rep-dashboard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Demo Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-800">🎯 FulQrun Demo</h2>
          <p className="text-sm text-blue-700 mb-3">
            You&apos;re viewing the complete sales operations platform with demo data. 
            Explore all features including the new Phase 2 capabilities!
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link href="/leads">
              <Button size="sm" variant="outline">View Leads</Button>
            </Link>
            <Link href="/opportunities">
              <Button size="sm" variant="outline">View Opportunities</Button>
            </Link>
            <Link href="/pipeline">
              <Button size="sm" variant="outline">Pipeline Builder</Button>
            </Link>
            <Link href="/ai-insights">
              <Button size="sm" variant="outline">AI Insights</Button>
            </Link>
            <Link href="/integrations">
              <Button size="sm" variant="outline">Integrations</Button>
            </Link>
            <Link href="/learning">
              <Button size="sm" variant="outline">Learning Platform</Button>
            </Link>
          </div>
        </div>

        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to FulQrun!
          </h1>
          <p className="text-muted-foreground">
            Demo Organization • Sales Representative • West Coast Territory
          </p>
        </div>

        {/* Phase 2 Feature Highlights */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-4 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <h3 className="font-semibold text-blue-800 mb-2">🔧 Advanced Pipeline Builder</h3>
            <p className="text-sm text-blue-700">Drag-and-drop pipeline configuration with PEAK methodology integration</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <h3 className="font-semibold text-purple-800 mb-2">🧠 AI-Driven Insights</h3>
            <p className="text-sm text-purple-700">Predictive scoring, deal risk analysis, and next best action recommendations</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-br from-green-50 to-green-100">
            <h3 className="font-semibold text-green-800 mb-2">🔗 Integration Hub</h3>
            <p className="text-sm text-green-700">Connect Slack, DocuSign, Gong, Stripe and other sales tools</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-br from-orange-50 to-orange-100">
            <h3 className="font-semibold text-orange-800 mb-2">🎓 Learning Platform</h3>
            <p className="text-sm text-orange-700">PEAK and MEDDPICC certifications with micro-learning</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-br from-red-50 to-red-100">
            <h3 className="font-semibold text-red-800 mb-2">📊 Advanced Analytics</h3>
            <p className="text-sm text-red-700">Drill-down dashboards with team performance insights</p>
          </div>
          
          <div className="p-4 border rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
            <h3 className="font-semibold text-indigo-800 mb-2">🎨 Professional Themes</h3>
            <p className="text-sm text-indigo-700">Light/dark mode with customizable appearance settings</p>
          </div>
        </div>

        {/* Demo Dashboard Content */}
        <RepDashboard />
      </div>
    </DashboardLayout>
  )
}