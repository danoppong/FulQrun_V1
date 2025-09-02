'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Map,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  BarChart3,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Settings
} from 'lucide-react'

interface Territory {
  id: string
  name: string
  region: string
  assignedRep: string
  quota: number
  achieved: number
  accounts: number
  pipeline: number
  coverage: number // percentage
  lastUpdated: string
}

interface QuotaForecast {
  period: string
  target: number
  forecast: number
  confidence: number
  factors: string[]
  risks: string[]
  opportunities: string[]
}

const mockTerritories: Territory[] = [
  {
    id: '1',
    name: 'West Coast Enterprise',
    region: 'US West',
    assignedRep: 'Sarah Johnson',
    quota: 2000000,
    achieved: 1650000,
    accounts: 45,
    pipeline: 850000,
    coverage: 78,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    name: 'East Coast Mid-Market',
    region: 'US East',
    assignedRep: 'Mike Chen',
    quota: 1500000,
    achieved: 980000,
    accounts: 62,
    pipeline: 620000,
    coverage: 85,
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    name: 'Central SMB',
    region: 'US Central',
    assignedRep: 'Lisa Williams',
    quota: 1200000,
    achieved: 1150000,
    accounts: 89,
    pipeline: 450000,
    coverage: 92,
    lastUpdated: '2024-01-13'
  },
  {
    id: '4',
    name: 'EMEA Enterprise',
    region: 'Europe',
    assignedRep: 'John Davis',
    quota: 1800000,
    achieved: 1200000,
    accounts: 38,
    pipeline: 720000,
    coverage: 65,
    lastUpdated: '2024-01-12'
  }
]

const mockForecast: QuotaForecast[] = [
  {
    period: 'Q1 2024',
    target: 6500000,
    forecast: 6200000,
    confidence: 85,
    factors: ['Strong pipeline', 'Historical performance', 'Market conditions'],
    risks: ['Economic uncertainty', 'Competitive pressure'],
    opportunities: ['New product launch', 'Market expansion']
  },
  {
    period: 'Q2 2024',
    target: 7000000,
    forecast: 7350000,
    confidence: 78,
    factors: ['Pipeline growth', 'Team expansion', 'Product improvements'],
    risks: ['Seasonal slowdown', 'Team onboarding'],
    opportunities: ['Enterprise deals', 'Partnership channel']
  }
]

export function TerritoryManagement() {
  const [territories, setTerritories] = useState<Territory[]>(mockTerritories)
  const [selectedTerritory, setSelectedTerritory] = useState<Territory | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddingTerritory, setIsAddingTerritory] = useState(false)

  const totalQuota = territories.reduce((sum, t) => sum + t.quota, 0)
  const totalAchieved = territories.reduce((sum, t) => sum + t.achieved, 0)
  const totalPipeline = territories.reduce((sum, t) => sum + t.pipeline, 0)
  const avgCoverage = territories.reduce((sum, t) => sum + t.coverage, 0) / territories.length

  const handleEditTerritory = (territory: Territory) => {
    setSelectedTerritory(territory)
    setIsEditModalOpen(true)
  }

  const handleAddTerritory = () => {
    setSelectedTerritory({
      id: Date.now().toString(),
      name: '',
      region: '',
      assignedRep: '',
      quota: 0,
      achieved: 0,
      accounts: 0,
      pipeline: 0,
      coverage: 0,
      lastUpdated: new Date().toISOString()
    })
    setIsAddingTerritory(true)
    setIsEditModalOpen(true)
  }

  const handleSaveTerritory = (updatedTerritory: Territory) => {
    if (isAddingTerritory) {
      setTerritories(prev => [...prev, updatedTerritory])
    } else {
      setTerritories(prev => prev.map(t => 
        t.id === updatedTerritory.id ? updatedTerritory : t
      ))
    }
    setIsEditModalOpen(false)
    setSelectedTerritory(null)
    setIsAddingTerritory(false)
  }

  const getQuotaAttainmentColor = (achieved: number, quota: number) => {
    const percentage = (achieved / quota) * 100
    if (percentage >= 100) return 'text-green-600'
    if (percentage >= 80) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return 'text-green-600'
    if (coverage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Territory & Quota Management</h1>
          <p className="text-muted-foreground">
            Manage sales territories, quotas, and forecasting across regions
          </p>
        </div>
        <Button onClick={handleAddTerritory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Territory
        </Button>
      </div>

      {/* Global Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="mr-2 h-4 w-4" />
              Total Quota
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalQuota / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">{territories.length} territories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Achieved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalAchieved / 1000000).toFixed(1)}M</div>
            <p className={`text-xs ${getQuotaAttainmentColor(totalAchieved, totalQuota)}`}>
              {Math.round((totalAchieved / totalQuota) * 100)}% of quota
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalPipeline / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-blue-600">Weighted forecast</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgCoverage)}%</div>
            <p className={`text-xs ${getCoverageColor(avgCoverage)}`}>Territory coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Territory Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Map className="mr-2 h-5 w-5" />
            Territory Performance
          </CardTitle>
          <CardDescription>
            Individual territory performance and quota attainment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {territories.map((territory) => {
              const quotaPercentage = Math.round((territory.achieved / territory.quota) * 100)
              const pipelineMultiple = territory.pipeline / (territory.quota - territory.achieved)
              
              return (
                <div key={territory.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{territory.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {territory.region}
                        </span>
                        {quotaPercentage >= 100 && (
                          <Award className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p><strong>Rep:</strong> {territory.assignedRep}</p>
                          <p><strong>Accounts:</strong> {territory.accounts}</p>
                        </div>
                        <div>
                          <p><strong>Quota:</strong> ${(territory.quota / 1000).toFixed(0)}K</p>
                          <p><strong>Achieved:</strong> ${(territory.achieved / 1000).toFixed(0)}K</p>
                        </div>
                        <div>
                          <p><strong>Pipeline:</strong> ${(territory.pipeline / 1000).toFixed(0)}K</p>
                          <p><strong>Coverage:</strong> {territory.coverage}%</p>
                        </div>
                        <div>
                          <p className={`font-medium ${getQuotaAttainmentColor(territory.achieved, territory.quota)}`}>
                            {quotaPercentage}% to quota
                          </p>
                          <p className="text-muted-foreground">
                            {pipelineMultiple.toFixed(1)}x pipeline coverage
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditTerritory(territory)}>
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="mr-1 h-3 w-3" />
                        Analytics
                      </Button>
                    </div>
                  </div>

                  {/* Quota Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Quota Progress</span>
                      <span className="text-xs font-medium">{quotaPercentage}%</span>
                    </div>
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

      {/* Quota Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Weighted Pipeline Forecasting
          </CardTitle>
          <CardDescription>
            AI-powered quota forecasting with confidence intervals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockForecast.map((forecast, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{forecast.period}</h3>
                    <p className="text-sm text-muted-foreground">
                      Target: ${(forecast.target / 1000000).toFixed(1)}M • 
                      Forecast: ${(forecast.forecast / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${forecast.forecast >= forecast.target ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.round((forecast.forecast / forecast.target) * 100)}% to target
                    </p>
                    <p className="text-xs text-muted-foreground">{forecast.confidence}% confidence</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-green-800 mb-1">Success Factors:</p>
                    <ul className="space-y-1">
                      {forecast.factors.map((factor, i) => (
                        <li key={i} className="text-green-700 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-red-800 mb-1">Risk Factors:</p>
                    <ul className="space-y-1">
                      {forecast.risks.map((risk, i) => (
                        <li key={i} className="text-red-700 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-blue-800 mb-1">Opportunities:</p>
                    <ul className="space-y-1">
                      {forecast.opportunities.map((opp, i) => (
                        <li key={i} className="text-blue-700 flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {opp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Forecast Confidence Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Forecast Confidence</span>
                    <span className="text-xs font-medium">{forecast.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        forecast.confidence >= 80 ? 'bg-green-500' :
                        forecast.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${forecast.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Territory Edit Modal */}
      {selectedTerritory && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isAddingTerritory ? 'Add New Territory' : 'Edit Territory'}
              </DialogTitle>
              <DialogDescription>
                Configure territory details, quota, and assignments
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="territory-name">Territory Name</Label>
                  <Input
                    id="territory-name"
                    value={selectedTerritory.name}
                    onChange={(e) => setSelectedTerritory(prev => prev ? { ...prev, name: e.target.value } : null)}
                    placeholder="West Coast Enterprise"
                  />
                </div>
                <div>
                  <Label htmlFor="territory-region">Region</Label>
                  <select
                    id="territory-region"
                    value={selectedTerritory.region}
                    onChange={(e) => setSelectedTerritory(prev => prev ? { ...prev, region: e.target.value } : null)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select Region</option>
                    <option value="US West">US West</option>
                    <option value="US East">US East</option>
                    <option value="US Central">US Central</option>
                    <option value="Europe">Europe</option>
                    <option value="APAC">APAC</option>
                    <option value="LATAM">LATAM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assigned-rep">Assigned Rep</Label>
                  <Input
                    id="assigned-rep"
                    value={selectedTerritory.assignedRep}
                    onChange={(e) => setSelectedTerritory(prev => prev ? { ...prev, assignedRep: e.target.value } : null)}
                    placeholder="Sales Representative"
                  />
                </div>
                <div>
                  <Label htmlFor="territory-quota">Annual Quota ($)</Label>
                  <Input
                    id="territory-quota"
                    type="number"
                    value={selectedTerritory.quota}
                    onChange={(e) => setSelectedTerritory(prev => prev ? { ...prev, quota: parseInt(e.target.value) || 0 } : null)}
                    placeholder="2000000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="accounts-count">Account Count</Label>
                  <Input
                    id="accounts-count"
                    type="number"
                    value={selectedTerritory.accounts}
                    onChange={(e) => setSelectedTerritory(prev => prev ? { ...prev, accounts: parseInt(e.target.value) || 0 } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="coverage-percentage">Coverage %</Label>
                  <Input
                    id="coverage-percentage"
                    type="number"
                    min="0"
                    max="100"
                    value={selectedTerritory.coverage}
                    onChange={(e) => setSelectedTerritory(prev => prev ? { ...prev, coverage: parseInt(e.target.value) || 0 } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="current-pipeline">Current Pipeline ($)</Label>
                  <Input
                    id="current-pipeline"
                    type="number"
                    value={selectedTerritory.pipeline}
                    onChange={(e) => setSelectedTerritory(prev => prev ? { ...prev, pipeline: parseInt(e.target.value) || 0 } : null)}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => selectedTerritory && handleSaveTerritory(selectedTerritory)}>
                {isAddingTerritory ? 'Add Territory' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}