'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 

  Filter,
  Download,
  Calendar,
  Target,
  DollarSign,
  Users,
  Clock,
  Zap
} from 'lucide-react'

// Mock data for advanced analytics
const pipelineData = [
  { stage: 'Prospecting', count: 23, value: 580000, conversion: 65, avgDays: 14 },
  { stage: 'Qualification', count: 18, value: 720000, conversion: 72, avgDays: 21 },
  { stage: 'Needs Analysis', count: 12, value: 480000, conversion: 58, avgDays: 28 },
  { stage: 'Proposal', count: 8, value: 640000, conversion: 75, avgDays: 14 },
  { stage: 'Negotiation', count: 6, value: 450000, conversion: 83, avgDays: 21 },
  { stage: 'Closed Won', count: 5, value: 375000, conversion: 100, avgDays: 1 }
]

const velocityData = [
  { month: 'Jan', avgDays: 67, deals: 12, target: 60 },
  { month: 'Feb', avgDays: 63, deals: 15, target: 60 },
  { month: 'Mar', avgDays: 58, deals: 18, target: 60 },
  { month: 'Apr', avgDays: 55, deals: 22, target: 60 },
  { month: 'May', avgDays: 52, deals: 25, target: 60 },
  { month: 'Jun', avgDays: 48, deals: 28, target: 60 }
]

const meddpiccHealthData = [
  { element: 'Metrics', completion: 73, target: 90 },
  { element: 'Economic Buyer', completion: 89, target: 95 },
  { element: 'Decision Criteria', completion: 45, target: 80 },
  { element: 'Decision Process', completion: 38, target: 75 },
  { element: 'Paper Process', completion: 52, target: 70 },
  { element: 'Identify Pain', completion: 92, target: 95 },
  { element: 'Champion', completion: 67, target: 85 },
  { element: 'Competition', completion: 34, target: 60 }
]

const repPerformanceData = [
  { name: 'Sarah J.', pipeline: 485000, quota: 120, meddpicc: 85, activities: 89 },
  { name: 'Mike C.', pipeline: 320000, quota: 72, meddpicc: 68, activities: 76 },
  { name: 'Lisa W.', pipeline: 425000, quota: 95, meddpicc: 78, activities: 92 },
  { name: 'John D.', pipeline: 380000, quota: 88, meddpicc: 82, activities: 84 }
]

export function AdvancedAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('last_quarter')
  const [drillDownData, setDrillDownData] = useState<Record<string, unknown> | null>(null)

  const handleDrillDown = (data: any) => {
    setDrillDownData(data)
  }

  const exportData = () => {
    // In production, this would generate and download a report
    alert('Analytics report exported successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
            <option value="last_quarter">Last Quarter</option>
            <option value="last_year">Last Year</option>
          </select>
          
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Pipeline Velocity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48 days</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -20% vs last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +4.2% vs last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">MEDDPICC Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs flex items-center text-yellow-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -5% vs target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.2M</div>
            <p className="text-xs text-muted-foreground">Forecasted Q1 close</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pipeline Funnel with Drill-down */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Pipeline Funnel Analysis
            </CardTitle>
            <CardDescription>Click any stage to drill down into details</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'count' ? `${value} opportunities` : `$${(value as number / 1000).toFixed(0)}K`,
                    name === 'count' ? 'Count' : 'Value'
                  ]}
                />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  onClick={handleDrillDown}
                  className="cursor-pointer hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sales Velocity Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Sales Velocity Trend
            </CardTitle>
            <CardDescription>Average days to close over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} days`, 'Avg Days to Close']} />
                <Line type="monotone" dataKey="avgDays" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* MEDDPICC Health Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            MEDDPICC Qualification Health
          </CardTitle>
          <CardDescription>
            Completion rates for each MEDDPICC element across your pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {meddpiccHealthData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.element}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.completion}% / {item.target}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.completion >= item.target ? 'bg-green-500' : 
                        item.completion >= item.target * 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(item.completion / item.target) * 100}%` }}
                    />
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="ml-4">
                  Drill Down
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Team Performance Matrix
          </CardTitle>
          <CardDescription>
            Individual performance across key metrics with AI insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {repPerformanceData.map((rep, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{rep.name}</h3>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">AI Score: 82</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold">${(rep.pipeline / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">Pipeline</p>
                  </div>
                  <div>
                    <p className={`text-lg font-semibold ${
                      rep.quota >= 100 ? 'text-green-600' : 
                      rep.quota >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {rep.quota}%
                    </p>
                    <p className="text-xs text-muted-foreground">Quota</p>
                  </div>
                  <div>
                    <p className={`text-lg font-semibold ${
                      rep.meddpicc >= 80 ? 'text-green-600' : 
                      rep.meddpicc >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {rep.meddpicc}%
                    </p>
                    <p className="text-xs text-muted-foreground">MEDDPICC</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{rep.activities}</p>
                    <p className="text-xs text-muted-foreground">Activities</p>
                  </div>
                </div>

                {/* AI Insights for Rep */}
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                  <p className="font-medium text-blue-800 mb-1">AI Recommendation:</p>
                  <p className="text-blue-700">
                    {rep.meddpicc < 70 
                      ? 'Focus on MEDDPICC qualification training'
                      : rep.quota < 80 
                      ? 'Increase activity volume and pipeline development'
                      : 'Strong performer - consider mentoring role'
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Drill-down Modal */}
      {drillDownData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Drill-down Analysis: {drillDownData.stage}</CardTitle>
              <CardDescription>Detailed breakdown and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded">
                    <p className="text-2xl font-bold">{drillDownData.count}</p>
                    <p className="text-sm text-muted-foreground">Opportunities</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded">
                    <p className="text-2xl font-bold">${(drillDownData.value / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">AI Insights:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Average time in stage: {drillDownData.avgDays} days</li>
                    <li>• Conversion rate: {drillDownData.conversion}%</li>
                    <li>• Recommended actions: Focus on MEDDPICC completion</li>
                    <li>• Risk factors: 3 opportunities over 30 days in stage</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={() => setDrillDownData(null)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}