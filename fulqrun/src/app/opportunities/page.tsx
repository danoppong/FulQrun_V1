'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddOpportunityModal } from '@/components/modals/add-opportunity-modal'
import { Plus, Search, Filter, Target } from 'lucide-react'

// Mock data for MVP demonstration
const opportunities = [
  {
    id: '1',
    name: 'Enterprise CRM Implementation',
    company: 'Acme Corp',
    value: 150000,
    peakStage: 'engage',
    stage: 'Proposal',
    probability: 60,
    closeDate: '2024-02-15',
    meddpicc: {
      metrics: 'Reduce sales cycle by 30%',
      economicBuyer: 'CFO Sarah Williams',
      champion: 'VP Sales Mike Johnson',
      hasDecisionCriteria: true,
      hasDecisionProcess: true,
      painIdentified: true
    }
  },
  {
    id: '2',
    name: 'Sales Process Automation',
    company: 'TechStart Inc',
    value: 75000,
    peakStage: 'acquire',
    stage: 'Negotiation',
    probability: 80,
    closeDate: '2024-02-08',
    meddpicc: {
      metrics: 'Increase productivity by 40%',
      economicBuyer: 'CEO John Smith',
      champion: 'Sales Director Lisa Chen',
      hasDecisionCriteria: true,
      hasDecisionProcess: true,
      painIdentified: true
    }
  },
  {
    id: '3',
    name: 'Multi-location Deployment',
    company: 'Global Systems',
    value: 300000,
    peakStage: 'engage',
    stage: 'Needs Analysis',
    probability: 40,
    closeDate: '2024-03-01',
    meddpicc: {
      metrics: 'Standardize processes across 5 regions',
      economicBuyer: 'COO David Brown',
      champion: 'Regional Manager Anna Garcia',
      hasDecisionCriteria: false,
      hasDecisionProcess: false,
      painIdentified: true
    }
  }
]

const getPeakStageColor = (stage: string) => {
  switch (stage) {
    case 'prospect': return 'bg-gray-100 text-gray-800'
    case 'engage': return 'bg-blue-100 text-blue-800'
    case 'acquire': return 'bg-green-100 text-green-800'
    case 'keep': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getMeddpiccScore = (meddpicc: {
  metrics?: string
  economicBuyer?: string
  champion?: string
  hasDecisionCriteria?: boolean
  hasDecisionProcess?: boolean
  painIdentified?: boolean
}) => {
  const criteria = [
    meddpicc.metrics,
    meddpicc.economicBuyer,
    meddpicc.champion,
    meddpicc.hasDecisionCriteria,
    meddpicc.hasDecisionProcess,
    meddpicc.painIdentified
  ]
  const completed = criteria.filter(Boolean).length
  return Math.round((completed / criteria.length) * 100)
}

export default function OpportunitiesPage() {
  const [isAddOpportunityModalOpen, setIsAddOpportunityModalOpen] = useState(false)
  const [opportunitiesData, setOpportunitiesData] = useState(opportunities)

  const handleOpportunityAdded = (newOpportunity: {
    name: string
    company_name: string
    value: number
    peak_stage: 'prospect' | 'engage' | 'acquire' | 'keep'
    stage: string
    expected_close_date: string
    metrics: string
    economic_buyer: string
    champion: string
    decision_criteria: string
    decision_process: string
    identify_pain: string
  }) => {
    const opportunity = {
      id: Date.now().toString(),
      name: newOpportunity.name,
      company: newOpportunity.company_name,
      value: newOpportunity.value,
      peakStage: newOpportunity.peak_stage,
      stage: newOpportunity.stage,
      probability: newOpportunity.peak_stage === 'prospect' ? 10 : 
                   newOpportunity.peak_stage === 'engage' ? 40 :
                   newOpportunity.peak_stage === 'acquire' ? 70 : 90,
      closeDate: newOpportunity.expected_close_date,
      meddpicc: {
        metrics: newOpportunity.metrics,
        economicBuyer: newOpportunity.economic_buyer,
        champion: newOpportunity.champion,
        hasDecisionCriteria: !!newOpportunity.decision_criteria,
        hasDecisionProcess: !!newOpportunity.decision_process,
        painIdentified: !!newOpportunity.identify_pain
      }
    }
    setOpportunitiesData(prev => [opportunity, ...prev])
  }
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Opportunities</h1>
            <p className="text-muted-foreground">
              Manage your sales pipeline with PEAK methodology and MEDDPICC qualification
            </p>
          </div>
          <Button onClick={() => setIsAddOpportunityModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Opportunity
          </Button>
        </div>

        {/* Pipeline Overview */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Target className="mr-2 h-4 w-4" />
                Total Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.45M</div>
              <p className="text-xs text-muted-foreground">47 opportunities</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Weighted Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.38M</div>
              <p className="text-xs text-muted-foreground">Probability adjusted</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Quarter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$525K</div>
              <p className="text-xs text-muted-foreground">Expected to close</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">MEDDPICC Avg</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73%</div>
              <p className="text-xs text-muted-foreground">Qualification score</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities by name, company, or stage..."
                  className="pl-9"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                PEAK Stage
              </Button>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                MEDDPICC
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Opportunities Table */}
        <Card>
          <CardHeader>
            <CardTitle>Active Opportunities</CardTitle>
            <CardDescription>
              Track your deals through the PEAK process with MEDDPICC qualification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunitiesData.map((opp) => {
                const meddpiccScore = getMeddpiccScore(opp.meddpicc)
                return (
                  <div key={opp.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{opp.name}</h3>
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getPeakStageColor(opp.peakStage)}`}>
                            PEAK: {opp.peakStage.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p><strong>Company:</strong> {opp.company}</p>
                            <p><strong>Stage:</strong> {opp.stage}</p>
                          </div>
                          <div>
                            <p><strong>Value:</strong> ${opp.value.toLocaleString()}</p>
                            <p><strong>Close Date:</strong> {opp.closeDate}</p>
                          </div>
                        </div>

                        {/* MEDDPICC Summary */}
                        <div className="mt-3 p-3 bg-muted rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">MEDDPICC Qualification</span>
                            <span className={`text-sm font-medium ${meddpiccScore >= 80 ? 'text-green-600' : meddpiccScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {meddpiccScore}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <p><strong>Metrics:</strong> {opp.meddpicc.metrics}</p>
                              <p><strong>Economic Buyer:</strong> {opp.meddpicc.economicBuyer}</p>
                              <p><strong>Champion:</strong> {opp.meddpicc.champion}</p>
                            </div>
                            <div>
                              <p><strong>Decision Criteria:</strong> {opp.meddpicc.hasDecisionCriteria ? '✓' : '✗'}</p>
                              <p><strong>Decision Process:</strong> {opp.meddpicc.hasDecisionProcess ? '✓' : '✗'}</p>
                              <p><strong>Pain Identified:</strong> {opp.meddpicc.painIdentified ? '✓' : '✗'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <p className="text-lg font-semibold">{opp.probability}%</p>
                          <p className="text-sm text-muted-foreground">probability</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Add Opportunity Modal */}
        <AddOpportunityModal
          open={isAddOpportunityModalOpen}
          onOpenChange={setIsAddOpportunityModalOpen}
          onOpportunityAdded={handleOpportunityAdded}
        />
      </div>
    </DashboardLayout>
  )
}