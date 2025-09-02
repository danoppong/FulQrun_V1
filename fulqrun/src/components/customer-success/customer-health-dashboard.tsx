'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Users,
  Calendar,
  Target,
  RefreshCw,
  Filter,
  Download,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Zap
} from 'lucide-react'
import { CustomerHealthService, type CustomerHealthMetrics, type ChurnRiskAlert, type UpsellOpportunity } from '@/lib/services/customer-success/health-scoring'

// Mock customer data for Phase 3 demonstration
const mockCustomers = [
  {
    id: '1',
    name: 'Acme Corp',
    tier: 'Enterprise',
    arr: 150000,
    renewalDate: '2024-08-15',
    csm: 'Sarah Johnson',
    healthScore: 85,
    riskLevel: 'low',
    trend: 'improving'
  },
  {
    id: '2',
    name: 'TechStart Inc',
    tier: 'Growth',
    arr: 75000,
    renewalDate: '2024-06-30',
    csm: 'Mike Chen',
    healthScore: 92,
    riskLevel: 'low',
    trend: 'stable'
  },
  {
    id: '3',
    name: 'Global Systems',
    tier: 'Enterprise',
    arr: 300000,
    renewalDate: '2024-05-20',
    csm: 'Lisa Williams',
    healthScore: 45,
    riskLevel: 'critical',
    trend: 'declining'
  },
  {
    id: '4',
    name: 'Innovation Labs',
    tier: 'Professional',
    arr: 50000,
    renewalDate: '2024-07-10',
    csm: 'John Davis',
    healthScore: 68,
    riskLevel: 'medium',
    trend: 'stable'
  }
]

export function CustomerHealthDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('current_quarter')
  const [customers, setCustomers] = useState(mockCustomers)
  const [churnAlerts, setChurnAlerts] = useState<ChurnRiskAlert[]>([])
  const [upsellOpportunities, setUpsellOpportunities] = useState<UpsellOpportunity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Generate churn alerts and upsell opportunities
    const alerts: ChurnRiskAlert[] = []
    const opportunities: UpsellOpportunity[] = []

    customers.forEach(customer => {
      if (customer.riskLevel === 'high' || customer.riskLevel === 'critical') {
        alerts.push({
          customerId: customer.id,
          companyName: customer.name,
          riskScore: 100 - customer.healthScore,
          riskLevel: customer.riskLevel,
          triggerEvents: ['Declining usage', 'Support escalations'],
          earlyWarningSignals: ['Reduced login frequency', 'Feature abandonment'],
          recommendedActions: ['Schedule intervention call', 'Implement success plan'],
          timeToChurn: customer.riskLevel === 'critical' ? 30 : 90,
          preventionPlaybook: ['Executive engagement', 'Process optimization']
        })
      }

      if (customer.healthScore >= 80) {
        opportunities.push({
          customerId: customer.id,
          companyName: customer.name,
          opportunityType: 'expansion',
          estimatedValue: customer.arr * 0.3,
          probability: 75,
          timeframe: '3-6 months',
          triggers: ['High satisfaction', 'Growing usage'],
          requirements: ['ROI analysis', 'Expansion proposal'],
          recommendedApproach: ['Present growth metrics', 'Propose additional licenses']
        })
      }
    })

    setChurnAlerts(alerts)
    setUpsellOpportunities(opportunities)
  }, [customers])

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    if (score >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'declining': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <TrendingUp className="h-4 w-4 text-gray-600" />
    }
  }

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const totalARR = customers.reduce((sum, customer) => sum + customer.arr, 0)
  const atRiskARR = customers
    .filter(c => c.riskLevel === 'high' || c.riskLevel === 'critical')
    .reduce((sum, customer) => sum + customer.arr, 0)
  const expansionPotential = upsellOpportunities.reduce((sum, opp) => sum + opp.estimatedValue, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Success</h1>
          <p className="text-muted-foreground">
            Monitor customer health, predict renewals, and identify expansion opportunities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Avg Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-green-600">+5% vs last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total ARR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalARR / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">{customers.length} customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">At-Risk ARR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${(atRiskARR / 1000).toFixed(0)}K</div>
            <p className="text-xs text-red-600">{churnAlerts.length} alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expansion Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${(expansionPotential / 1000).toFixed(0)}K</div>
            <p className="text-xs text-green-600">{upsellOpportunities.length} opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Churn Risk Alerts */}
      {churnAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
              Churn Risk Alerts
            </CardTitle>
            <CardDescription>
              Customers requiring immediate attention to prevent churn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {churnAlerts.map((alert, index) => (
                <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-red-800">{alert.companyName}</h3>
                      <p className="text-sm text-red-700">Risk Score: {alert.riskScore}% • {alert.timeToChurn} days predicted</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(alert.riskLevel)}`}>
                      {alert.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-red-800 mb-1">Trigger Events:</p>
                      <ul className="space-y-1">
                        {alert.triggerEvents.map((event, i) => (
                          <li key={i} className="text-red-700">• {event}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-red-800 mb-1">Recommended Actions:</p>
                      <ul className="space-y-1">
                        {alert.recommendedActions.slice(0, 2).map((action, i) => (
                          <li key={i} className="text-red-700">• {action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Bell className="mr-2 h-3 w-3" />
                      Create Alert
                    </Button>
                    <Button size="sm">
                      <Calendar className="mr-2 h-3 w-3" />
                      Schedule Intervention
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Customer Health Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Customer Health Overview
              </CardTitle>
              <CardDescription>
                Real-time health monitoring across your customer base
              </CardDescription>
            </div>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="current_quarter">Current Quarter</option>
              <option value="last_quarter">Last Quarter</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="last_year">Last Year</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <div key={customer.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{customer.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {customer.tier}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getRiskLevelColor(customer.riskLevel)}`}>
                        {customer.riskLevel}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <p><strong>ARR:</strong> ${(customer.arr / 1000).toFixed(0)}K</p>
                        <p><strong>CSM:</strong> {customer.csm}</p>
                      </div>
                      <div>
                        <p><strong>Renewal:</strong> {new Date(customer.renewalDate).toLocaleDateString()}</p>
                        <p><strong>Days to Renewal:</strong> {Math.ceil((new Date(customer.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))}</p>
                      </div>
                      <div>
                        <p className="flex items-center gap-1">
                          <strong>Health:</strong> 
                          <span className={getHealthScoreColor(customer.healthScore)}>
                            {customer.healthScore}%
                          </span>
                        </p>
                        <p className="flex items-center gap-1">
                          <strong>Trend:</strong> {getTrendIcon(customer.trend)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Health Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Score Visualization */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Customer Health Score</span>
                    <span className="text-xs font-medium">{customer.healthScore}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        customer.healthScore >= 80 ? 'bg-green-500' :
                        customer.healthScore >= 60 ? 'bg-yellow-500' :
                        customer.healthScore >= 40 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${customer.healthScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upsell Opportunities */}
      {upsellOpportunities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-green-600" />
              Expansion Opportunities
            </CardTitle>
            <CardDescription>
              High-health customers ready for upsell and expansion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upsellOpportunities.map((opportunity, index) => (
                <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-green-800">{opportunity.companyName}</h3>
                      <p className="text-sm text-green-700">
                        {opportunity.opportunityType} • ${(opportunity.estimatedValue / 1000).toFixed(0)}K potential • {opportunity.probability}% probability
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full border border-green-200">
                      {opportunity.timeframe}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-green-800 mb-1">Triggers:</p>
                      <ul className="space-y-1">
                        {opportunity.triggers.map((trigger, i) => (
                          <li key={i} className="text-green-700">• {trigger}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-green-800 mb-1">Next Steps:</p>
                      <ul className="space-y-1">
                        {opportunity.recommendedApproach.slice(0, 2).map((step, i) => (
                          <li key={i} className="text-green-700">• {step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button size="sm">
                      <Target className="mr-2 h-3 w-3" />
                      Create Opportunity
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="mr-2 h-3 w-3" />
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Renewal Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Renewal Pipeline
          </CardTitle>
          <CardDescription>
            Upcoming renewals with health-based predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customers
              .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
              .map((customer) => {
                const daysToRenewal = Math.ceil((new Date(customer.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                const renewalProbability = customer.healthScore >= 80 ? 95 : customer.healthScore >= 60 ? 80 : customer.healthScore >= 40 ? 60 : 30
                
                return (
                  <div key={customer.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        daysToRenewal <= 30 ? 'bg-red-500' :
                        daysToRenewal <= 90 ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(customer.renewalDate).toLocaleDateString()} • {daysToRenewal} days
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-medium">${(customer.arr / 1000).toFixed(0)}K</p>
                      <p className={`text-sm ${renewalProbability >= 80 ? 'text-green-600' : renewalProbability >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {renewalProbability}% renewal probability
                      </p>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      {renewalProbability < 70 && (
                        <Button size="sm">
                          <Zap className="mr-1 h-3 w-3" />
                          Intervene
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}