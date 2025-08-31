import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, TrendingUp, Target, DollarSign } from 'lucide-react'

// Mock data for MVP demonstration
const pipelineByStage = [
  { stage: 'Prospecting', count: 23, value: 580000, peakPhase: 'prospect' },
  { stage: 'Qualification', count: 18, value: 720000, peakPhase: 'engage' },
  { stage: 'Needs Analysis', count: 12, value: 480000, peakPhase: 'engage' },
  { stage: 'Proposal', count: 8, value: 640000, peakPhase: 'engage' },
  { stage: 'Negotiation', count: 6, value: 450000, peakPhase: 'acquire' },
]

const conversionMetrics = [
  { metric: 'Lead to Opportunity', rate: 18, target: 25 },
  { metric: 'Opportunity to Proposal', rate: 45, target: 50 },
  { metric: 'Proposal to Close', rate: 32, target: 35 },
  { metric: 'Overall Win Rate', rate: 28, target: 30 },
]

const peakPerformance = [
  { phase: 'Prospect', opportunities: 23, avgDays: 14, conversionRate: 65 },
  { phase: 'Engage', opportunities: 38, avgDays: 28, conversionRate: 42 },
  { phase: 'Acquire', opportunities: 6, avgDays: 21, conversionRate: 78 },
  { phase: 'Keep', customers: 28, retentionRate: 94, expansionRate: 23 },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Track your sales performance with PEAK methodology insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Pipeline Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.87M</div>
              <p className="text-xs text-green-600">+12.5% vs last quarter</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Target className="mr-2 h-4 w-4" />
                Win Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28%</div>
              <p className="text-xs text-green-600">+4.2% vs last quarter</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$87K</div>
              <p className="text-xs text-muted-foreground">Across all stages</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Sales Cycle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">63 days</div>
              <p className="text-xs text-red-600">+5 days vs target</p>
            </CardContent>
          </Card>
        </div>

        {/* Pipeline by Stage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Pipeline by Stage
            </CardTitle>
            <CardDescription>
              Distribution of opportunities across sales stages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pipelineByStage.map((stage, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      stage.peakPhase === 'prospect' ? 'bg-gray-400' :
                      stage.peakPhase === 'engage' ? 'bg-blue-400' :
                      'bg-green-400'
                    }`} />
                    <div>
                      <p className="font-medium">{stage.stage}</p>
                      <p className="text-sm text-muted-foreground">PEAK: {stage.peakPhase}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{stage.count} opportunities</p>
                    <p className="text-sm text-muted-foreground">${(stage.value / 1000).toFixed(0)}K value</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Metrics and PEAK Performance */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Conversion Metrics
              </CardTitle>
              <CardDescription>
                Conversion rates at each stage of your funnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversionMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.rate >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${(metric.rate / metric.target) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{metric.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PEAK Process Performance</CardTitle>
              <CardDescription>
                Performance metrics for each PEAK phase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {peakPerformance.map((phase, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{phase.phase}</h4>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        phase.phase === 'Prospect' ? 'bg-gray-100 text-gray-800' :
                        phase.phase === 'Engage' ? 'bg-blue-100 text-blue-800' :
                        phase.phase === 'Acquire' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {phase.phase}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <div>
                        <p>{phase.opportunities || phase.customers} {phase.opportunities ? 'opportunities' : 'customers'}</p>
                      </div>
                      <div>
                        <p>{phase.avgDays ? `${phase.avgDays} avg days` : `${phase.retentionRate}% retention`}</p>
                      </div>
                      <div>
                        <p>{phase.conversionRate ? `${phase.conversionRate}% conversion` : `${phase.expansionRate}% expansion`}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MEDDPICC Qualification Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>MEDDPICC Qualification Health</CardTitle>
            <CardDescription>
              How well your opportunities are qualified using MEDDPICC framework
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">73%</div>
                <p className="text-sm text-muted-foreground">Avg MEDDPICC Score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <p className="text-sm text-muted-foreground">Have Champions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">67%</div>
                <p className="text-sm text-muted-foreground">Economic Buyer Identified</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">45%</div>
                <p className="text-sm text-muted-foreground">Decision Criteria Defined</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">38%</div>
                <p className="text-sm text-muted-foreground">Paper Process Known</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">92%</div>
                <p className="text-sm text-muted-foreground">Pain Identified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}