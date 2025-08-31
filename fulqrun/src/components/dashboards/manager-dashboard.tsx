import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, BarChart3 } from 'lucide-react'

export function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Team Performance</h2>
        <p className="text-muted-foreground">Monitor your team&apos;s sales performance and coaching opportunities</p>
      </div>

      {/* Team Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Team Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.45M</div>
            <p className="text-xs text-green-600">+12% vs last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team Quota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">$1.78M of $2M</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-green-600">+4% vs target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Team MEDDPICC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-yellow-600">Below 80% target</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Individual Performance
          </CardTitle>
          <CardDescription>Track each team member&apos;s performance against targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">Senior Sales Rep</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium">$425K</p>
                  <p className="text-xs text-muted-foreground">Pipeline</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">98%</p>
                  <p className="text-xs text-muted-foreground">Quota</p>
                </div>
                <div>
                  <p className="text-sm font-medium">85%</p>
                  <p className="text-xs text-muted-foreground">MEDDPICC</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium">Mike Chen</p>
                <p className="text-sm text-muted-foreground">Sales Rep</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm font-medium">$320K</p>
                  <p className="text-xs text-muted-foreground">Pipeline</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-600">72%</p>
                  <p className="text-xs text-muted-foreground">Quota</p>
                </div>
                <div>
                  <p className="text-sm font-medium">68%</p>
                  <p className="text-xs text-muted-foreground">MEDDPICC</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coaching Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Coaching Opportunities
          </CardTitle>
          <CardDescription>Team members who need attention or coaching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm font-medium text-yellow-800">Mike Chen - MEDDPICC Coaching Needed</p>
              <p className="text-sm text-yellow-700">Below 70% MEDDPICC score. Focus on champion development and pain identification.</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm font-medium text-blue-800">Team - Decision Process Training</p>
              <p className="text-sm text-blue-700">Only 45% of opportunities have mapped decision processes. Schedule training session.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}