import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Clock, Award } from 'lucide-react'

export function RepDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">My Performance</h2>
        <p className="text-muted-foreground">Your personal sales metrics and targets</p>
      </div>

      {/* Personal Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="mr-2 h-4 w-4" />
              My Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$485K</div>
            <p className="text-xs text-green-600">+15% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quota Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">$201K of $300K</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Activities This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-blue-600">8 above target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="mr-2 h-4 w-4" />
              MEDDPICC Avg
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-green-600">+5% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* My Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>My Active Opportunities</CardTitle>
          <CardDescription>Opportunities you own, organized by PEAK stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Enterprise CRM - Acme Corp</p>
                <p className="text-sm text-muted-foreground">Engage • Proposal Stage</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$150K</p>
                <p className="text-sm text-muted-foreground">60% prob</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Sales Automation - TechStart</p>
                <p className="text-sm text-muted-foreground">Acquire • Negotiation</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$75K</p>
                <p className="text-sm text-muted-foreground">80% prob</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Next Actions
          </CardTitle>
          <CardDescription>Recommended actions based on MEDDPICC analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm font-medium text-red-800">High Priority</p>
              <p className="text-sm text-red-700">Identify economic buyer for Global Systems deal</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm font-medium text-yellow-800">Medium Priority</p>
              <p className="text-sm text-yellow-700">Follow up on proposal with Acme Corp</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm font-medium text-green-800">On Track</p>
              <p className="text-sm text-green-700">TechStart negotiation progressing well</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}