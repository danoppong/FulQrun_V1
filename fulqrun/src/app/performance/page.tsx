import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Clock, Award } from 'lucide-react'

// Mock data for CSTPV performance tracking
const cstpvMetrics = {
  calls: {
    total: 145,
    target: 120,
    quality: 78, // percentage
    conversionRate: 23
  },
  socialSelling: {
    linkedinConnections: 89,
    socialTouches: 234,
    socialSourcing: 34, // percentage of pipeline
    engagementRate: 12
  },
  territory: {
    coverage: 87, // percentage
    penetration: 23, // percentage
    newAccounts: 12,
    accountGrowth: 15
  },
  pipeline: {
    value: 2450000,
    target: 2000000,
    weightedValue: 1380000,
    velocity: 63 // days
  },
  volume: {
    leadsGenerated: 156,
    opportunitiesCreated: 47,
    meetingsBooked: 89,
    proposalsSent: 23
  }
}

const performanceGoals = [
  { metric: 'Monthly Calls', current: 145, target: 120, unit: 'calls' },
  { metric: 'Pipeline Value', current: 2450000, target: 2000000, unit: 'currency' },
  { metric: 'New Opportunities', current: 47, target: 40, unit: 'count' },
  { metric: 'Win Rate', current: 28, target: 30, unit: 'percentage' },
]

const weeklyActivity = [
  { week: 'Week 1', calls: 32, meetings: 18, emails: 89, proposals: 4 },
  { week: 'Week 2', calls: 28, meetings: 22, emails: 76, proposals: 6 },
  { week: 'Week 3', calls: 35, meetings: 19, emails: 94, proposals: 8 },
  { week: 'Week 4', calls: 38, meetings: 25, emails: 102, proposals: 5 },
]

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance</h1>
          <p className="text-muted-foreground">
            Track your CSTPV (Calls, Social, Territory, Pipeline, Volume) performance metrics
          </p>
        </div>

        {/* CSTPV Overview */}
        <div className="grid gap-6 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cstpvMetrics.calls.total}</div>
              <p className="text-xs text-green-600">
                +{cstpvMetrics.calls.total - cstpvMetrics.calls.target} vs target
              </p>
              <p className="text-xs text-muted-foreground">
                {cstpvMetrics.calls.quality}% quality
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Social</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cstpvMetrics.socialSelling.linkedinConnections}</div>
              <p className="text-xs text-blue-600">LinkedIn connections</p>
              <p className="text-xs text-muted-foreground">
                {cstpvMetrics.socialSelling.socialSourcing}% of pipeline
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Territory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cstpvMetrics.territory.coverage}%</div>
              <p className="text-xs text-green-600">Coverage</p>
              <p className="text-xs text-muted-foreground">
                {cstpvMetrics.territory.newAccounts} new accounts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(cstpvMetrics.pipeline.value / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-green-600">
                +${((cstpvMetrics.pipeline.value - cstpvMetrics.pipeline.target) / 1000000).toFixed(1)}M vs target
              </p>
              <p className="text-xs text-muted-foreground">
                {cstpvMetrics.pipeline.velocity} day cycle
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cstpvMetrics.volume.leadsGenerated}</div>
              <p className="text-xs text-blue-600">Leads generated</p>
              <p className="text-xs text-muted-foreground">
                {cstpvMetrics.volume.opportunitiesCreated} opportunities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Performance Goals
            </CardTitle>
            <CardDescription>
              Track progress against your monthly and quarterly targets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceGoals.map((goal, index) => {
                const percentage = (goal.current / goal.target) * 100
                const isOnTrack = percentage >= 100
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{goal.metric}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-48 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${isOnTrack ? 'bg-green-500' : 'bg-yellow-500'}`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {goal.unit === 'currency' 
                          ? `$${(goal.current / 1000000).toFixed(1)}M` 
                          : goal.unit === 'percentage'
                          ? `${goal.current}%`
                          : goal.current.toLocaleString()
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Target: {goal.unit === 'currency' 
                          ? `$${(goal.target / 1000000).toFixed(1)}M` 
                          : goal.unit === 'percentage'
                          ? `${goal.target}%`
                          : goal.target.toLocaleString()
                        }
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Breakdown */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Weekly Activity
              </CardTitle>
              <CardDescription>
                Your activity levels across the past 4 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyActivity.map((week, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <p className="font-medium mb-2">{week.week}</p>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div className="text-center">
                        <p className="font-medium">{week.calls}</p>
                        <p className="text-muted-foreground">Calls</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{week.meetings}</p>
                        <p className="text-muted-foreground">Meetings</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{week.emails}</p>
                        <p className="text-muted-foreground">Emails</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{week.proposals}</p>
                        <p className="text-muted-foreground">Proposals</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Performance Insights
              </CardTitle>
              <CardDescription>
                AI-driven insights to improve your performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm font-medium text-green-800">🎯 Strength</p>
                  <p className="text-sm text-green-700">
                    Your call volume is 21% above target. Great consistency!
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm font-medium text-yellow-800">⚠️ Opportunity</p>
                  <p className="text-sm text-yellow-700">
                    Win rate is 2% below target. Focus on MEDDPICC qualification.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm font-medium text-blue-800">💡 Recommendation</p>
                  <p className="text-sm text-blue-700">
                    Increase social selling activities. Only 34% of pipeline from social sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}