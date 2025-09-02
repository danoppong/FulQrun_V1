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
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Crown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Globe,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3,
  Brain,
  Zap,
  Filter,
  Download
} from 'lucide-react'

// Mock global data for executive dashboard
const globalMetrics = {
  totalRevenue: 12500000,
  revenueGrowth: 23.5,
  totalCustomers: 342,
  customerGrowth: 18.2,
  globalPipeline: 8750000,
  pipelineGrowth: 15.8,
  avgDealSize: 87500,
  dealSizeGrowth: 12.3,
  globalWinRate: 32.4,
  winRateChange: 4.2,
  salesCycle: 63,
  cycleChange: -8.5
}

const regionalData = [
  { region: 'North America', revenue: 6500000, growth: 25, customers: 156, pipeline: 4200000 },
  { region: 'Europe', revenue: 3200000, growth: 18, customers: 89, pipeline: 2100000 },
  { region: 'APAC', revenue: 2100000, growth: 35, customers: 67, pipeline: 1800000 },
  { region: 'LATAM', revenue: 700000, growth: 42, customers: 30, pipeline: 650000 }
]

const revenueData = [
  { month: 'Jan', actual: 950000, target: 900000, forecast: 980000 },
  { month: 'Feb', actual: 1100000, target: 1000000, forecast: 1150000 },
  { month: 'Mar', actual: 1250000, target: 1100000, forecast: 1300000 },
  { month: 'Apr', actual: 1180000, target: 1200000, forecast: 1250000 },
  { month: 'May', actual: 1350000, target: 1250000, forecast: 1400000 },
  { month: 'Jun', actual: 1420000, target: 1300000, forecast: 1480000 }
]

const teamPerformance = [
  { team: 'Enterprise', quota: 8000000, achieved: 6800000, pipeline: 3200000, reps: 12 },
  { team: 'Mid-Market', quota: 4500000, achieved: 4100000, pipeline: 2100000, reps: 18 },
  { team: 'SMB', quota: 3000000, achieved: 2850000, pipeline: 1450000, reps: 25 },
  { team: 'Customer Success', quota: 2000000, achieved: 1950000, pipeline: 800000, reps: 8 }
]

const aiInsights = [
  {
    type: 'revenue_forecast',
    title: 'Q1 Revenue Forecast',
    insight: 'On track to exceed target by 8.5% based on current pipeline velocity',
    confidence: 87,
    impact: 'high',
    recommendation: 'Accelerate enterprise deals in pipeline'
  },
  {
    type: 'market_opportunity',
    title: 'APAC Expansion',
    insight: 'APAC showing 35% growth - opportunity for additional investment',
    confidence: 92,
    impact: 'high',
    recommendation: 'Consider expanding APAC sales team'
  },
  {
    type: 'competitive_threat',
    title: 'Competitive Analysis',
    insight: 'New competitor entering enterprise segment - 15% deal displacement risk',
    confidence: 78,
    impact: 'medium',
    recommendation: 'Strengthen enterprise value proposition'
  },
  {
    type: 'process_optimization',
    title: 'Sales Cycle Optimization',
    insight: 'MEDDPICC adoption reduced sales cycle by 12 days on average',
    confidence: 94,
    impact: 'high',
    recommendation: 'Expand MEDDPICC training to all teams'
  }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

export function ExecutiveCommandCenter() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('current_quarter')
  const [selectedRegion, setSelectedRegion] = useState('global')

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'revenue_forecast': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'market_opportunity': return <Target className="h-4 w-4 text-blue-600" />
      case 'competitive_threat': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'process_optimization': return <Zap className="h-4 w-4 text-purple-600" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      case 'low': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Crown className="mr-3 h-8 w-8 text-yellow-600" />
            Executive Command Center
          </h1>
          <p className="text-muted-foreground">
            Global sales performance, AI insights, and strategic recommendations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Executive Report
          </Button>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid gap-6 md:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(globalMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{globalMetrics.revenueGrowth}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Global Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(globalMetrics.globalPipeline / 1000000).toFixed(1)}M</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{globalMetrics.pipelineGrowth}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalMetrics.globalWinRate}%</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{globalMetrics.winRateChange}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(globalMetrics.avgDealSize / 1000).toFixed(0)}K</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{globalMetrics.dealSizeGrowth}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sales Cycle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalMetrics.salesCycle} days</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              {globalMetrics.cycleChange}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalMetrics.totalCustomers}</div>
            <p className="text-xs flex items-center text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +{globalMetrics.customerGrowth}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trend and Regional Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Revenue vs Target
            </CardTitle>
            <CardDescription>Monthly performance against targets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(2)}M`, '']} />
                <Bar dataKey="target" fill="#94a3b8" name="Target" />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Regional Performance
            </CardTitle>
            <CardDescription>Revenue and growth by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                  <div>
                    <p className="font-medium">{region.region}</p>
                    <p className="text-sm text-muted-foreground">{region.customers} customers</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(region.revenue / 1000000).toFixed(1)}M</p>
                    <p className="text-sm flex items-center text-green-600">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +{region.growth}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-600" />
            AI Strategic Insights
          </CardTitle>
          <CardDescription>
            Executive-level insights and strategic recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getImpactColor(insight.impact)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <h3 className="font-semibold">{insight.title}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">{insight.confidence}% confidence</span>
                    <div className={`w-2 h-2 rounded-full ${
                      insight.confidence > 90 ? 'bg-green-500' :
                      insight.confidence > 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
                
                <p className="text-sm mb-3">{insight.insight}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {insight.impact} impact
                  </span>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
                
                <div className="mt-2 p-2 bg-white/50 rounded text-xs">
                  <strong>Recommendation:</strong> {insight.recommendation}
                </div>
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
            Global Team Performance
          </CardTitle>
          <CardDescription>
            Performance across all sales teams and regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamPerformance.map((team, index) => {
              const quotaPercentage = Math.round((team.achieved / team.quota) * 100)
              const pipelineCoverage = (team.pipeline / (team.quota - team.achieved)) * 100
              
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{team.team} Team</h3>
                      <p className="text-sm text-muted-foreground">{team.reps} representatives</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${(team.achieved / 1000000).toFixed(1)}M / ${(team.quota / 1000000).toFixed(1)}M</p>
                      <p className={`text-sm ${quotaPercentage >= 100 ? 'text-green-600' : quotaPercentage >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {quotaPercentage}% to quota
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-medium">${(team.pipeline / 1000000).toFixed(1)}M</p>
                      <p className="text-muted-foreground">Pipeline</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{Math.round(pipelineCoverage)}%</p>
                      <p className="text-muted-foreground">Coverage</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">${Math.round(team.achieved / team.reps / 1000)}K</p>
                      <p className="text-muted-foreground">Per Rep</p>
                    </div>
                  </div>

                  {/* Team Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          quotaPercentage >= 100 ? 'bg-green-500' :
                          quotaPercentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(quotaPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Revenue Trend Analysis
          </CardTitle>
          <CardDescription>
            Monthly revenue performance vs targets and forecasts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => [`$${(value as number / 1000000).toFixed(2)}M`, '']} />
              <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" name="Target" />
              <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="forecast" stroke="#10b981" strokeDasharray="3 3" name="Forecast" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}