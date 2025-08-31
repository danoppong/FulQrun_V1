'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MEDDPICCService } from '@/lib/services/meddpicc'
import { Loader2, Target, CheckCircle, XCircle } from 'lucide-react'

interface OpportunityFormData {
  name: string
  company_name: string
  value: number
  expected_close_date: string
  peak_stage: 'prospect' | 'engage' | 'acquire' | 'keep'
  stage: string
  
  // MEDDPICC fields
  metrics: string
  economic_buyer: string
  decision_criteria: string
  decision_process: string
  paper_process: string
  identify_pain: string
  champion: string
  competition: string
}

interface AddOpportunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpportunityAdded: (opportunity: OpportunityFormData & { meddpicc_score: number }) => void
}

export function AddOpportunityModal({ open, onOpenChange, onOpportunityAdded }: AddOpportunityModalProps) {
  const [formData, setFormData] = useState<OpportunityFormData>({
    name: '',
    company_name: '',
    value: 0,
    expected_close_date: '',
    peak_stage: 'prospect',
    stage: 'Prospecting',
    metrics: '',
    economic_buyer: '',
    decision_criteria: '',
    decision_process: '',
    paper_process: '',
    identify_pain: '',
    champion: '',
    competition: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof OpportunityFormData, string>>>({})

  // Calculate MEDDPICC score in real-time
  const meddpiccData = {
    metrics: formData.metrics,
    economicBuyer: { identified: !!formData.economic_buyer },
    decisionCriteria: { 
      defined: !!formData.decision_criteria,
      criteria: formData.decision_criteria ? [formData.decision_criteria] : []
    },
    decisionProcess: { 
      mapped: !!formData.decision_process,
      steps: formData.decision_process ? [{ step: formData.decision_process, stakeholders: [], timeline: '' }] : []
    },
    paperProcess: { 
      understood: !!formData.paper_process,
      requirements: formData.paper_process ? [formData.paper_process] : [],
      timeline: ''
    },
    identifyPain: { 
      identified: !!formData.identify_pain,
      businessPains: formData.identify_pain ? [formData.identify_pain] : [],
      technicalPains: [],
      personalPains: []
    },
    champion: { 
      contactId: formData.champion ? 'temp' : undefined,
      name: formData.champion,
      influence: 'high' as const,
      commitment: 'high' as const
    },
    competition: { 
      competitors: formData.competition ? [{ name: formData.competition, strengths: [], weaknesses: [], status: 'active' as const }] : []
    }
  }

  const meddpiccScore = MEDDPICCService.calculateScore(meddpiccData)
  const healthAssessment = MEDDPICCService.getHealthAssessment(meddpiccData)

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof OpportunityFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Opportunity name is required'
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required'
    }

    if (!formData.value || formData.value <= 0) {
      newErrors.value = 'Opportunity value must be greater than 0'
    }

    if (!formData.expected_close_date) {
      newErrors.expected_close_date = 'Expected close date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const opportunityWithScore = {
        ...formData,
        meddpicc_score: meddpiccScore
      }
      
      onOpportunityAdded(opportunityWithScore)
      
      // Reset form
      setFormData({
        name: '',
        company_name: '',
        value: 0,
        expected_close_date: '',
        peak_stage: 'prospect',
        stage: 'Prospecting',
        metrics: '',
        economic_buyer: '',
        decision_criteria: '',
        decision_process: '',
        paper_process: '',
        identify_pain: '',
        champion: '',
        competition: ''
      })
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error adding opportunity:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof OpportunityFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getMeddpiccIcon = (filled: boolean) => {
    return filled ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-400" />
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Opportunity</DialogTitle>
          <DialogDescription>
            Create a new sales opportunity with MEDDPICC qualification
          </DialogDescription>
        </DialogHeader>

        {/* Real-time MEDDPICC Score */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            <span className="text-sm font-medium">MEDDPICC Score:</span>
            <span className={`text-xl font-bold ${getScoreColor(meddpiccScore)}`}>
              {meddpiccScore}%
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {getMeddpiccIcon(!!formData.metrics)}
              <span>Metrics</span>
            </div>
            <div className="flex items-center gap-1">
              {getMeddpiccIcon(!!formData.economic_buyer)}
              <span>Economic Buyer</span>
            </div>
            <div className="flex items-center gap-1">
              {getMeddpiccIcon(!!formData.champion)}
              <span>Champion</span>
            </div>
            <div className="flex items-center gap-1">
              {getMeddpiccIcon(!!formData.identify_pain)}
              <span>Pain</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Opportunity Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Opportunity Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Opportunity Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                  placeholder="Enterprise CRM Implementation"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className={errors.company_name ? 'border-red-500' : ''}
                  placeholder="Acme Corp"
                />
                {errors.company_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.company_name}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="value">Opportunity Value ($) *</Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value || ''}
                  onChange={(e) => handleChange('value', parseInt(e.target.value) || 0)}
                  className={errors.value ? 'border-red-500' : ''}
                  placeholder="150000"
                />
                {errors.value && (
                  <p className="text-sm text-red-600 mt-1">{errors.value}</p>
                )}
              </div>
              <div>
                <Label htmlFor="peak_stage">PEAK Stage</Label>
                <select
                  id="peak_stage"
                  value={formData.peak_stage}
                  onChange={(e) => handleChange('peak_stage', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="prospect">Prospect</option>
                  <option value="engage">Engage</option>
                  <option value="acquire">Acquire</option>
                  <option value="keep">Keep</option>
                </select>
              </div>
              <div>
                <Label htmlFor="expected_close_date">Expected Close Date *</Label>
                <Input
                  id="expected_close_date"
                  type="date"
                  value={formData.expected_close_date}
                  onChange={(e) => handleChange('expected_close_date', e.target.value)}
                  className={errors.expected_close_date ? 'border-red-500' : ''}
                />
                {errors.expected_close_date && (
                  <p className="text-sm text-red-600 mt-1">{errors.expected_close_date}</p>
                )}
              </div>
            </div>
          </div>

          {/* MEDDPICC Qualification */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">MEDDPICC Qualification</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metrics">Metrics</Label>
                  <textarea
                    id="metrics"
                    value={formData.metrics}
                    onChange={(e) => handleChange('metrics', e.target.value)}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Quantifiable business impact (e.g., Reduce sales cycle by 30%, Increase productivity by 40%)"
                  />
                </div>

                <div>
                  <Label htmlFor="economic_buyer">Economic Buyer</Label>
                  <Input
                    id="economic_buyer"
                    value={formData.economic_buyer}
                    onChange={(e) => handleChange('economic_buyer', e.target.value)}
                    placeholder="CFO Sarah Williams"
                  />
                </div>

                <div>
                  <Label htmlFor="decision_criteria">Decision Criteria</Label>
                  <textarea
                    id="decision_criteria"
                    value={formData.decision_criteria}
                    onChange={(e) => handleChange('decision_criteria', e.target.value)}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="What criteria will be used to evaluate solutions?"
                  />
                </div>

                <div>
                  <Label htmlFor="decision_process">Decision Process</Label>
                  <textarea
                    id="decision_process"
                    value={formData.decision_process}
                    onChange={(e) => handleChange('decision_process', e.target.value)}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="How will the decision be made? Timeline and stakeholders?"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="paper_process">Paper Process</Label>
                  <textarea
                    id="paper_process"
                    value={formData.paper_process}
                    onChange={(e) => handleChange('paper_process', e.target.value)}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Legal, procurement, and approval processes"
                  />
                </div>

                <div>
                  <Label htmlFor="identify_pain">Identify Pain</Label>
                  <textarea
                    id="identify_pain"
                    value={formData.identify_pain}
                    onChange={(e) => handleChange('identify_pain', e.target.value)}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Business, technical, and personal pain points"
                  />
                </div>

                <div>
                  <Label htmlFor="champion">Champion</Label>
                  <Input
                    id="champion"
                    value={formData.champion}
                    onChange={(e) => handleChange('champion', e.target.value)}
                    placeholder="VP Sales Mike Johnson"
                  />
                </div>

                <div>
                  <Label htmlFor="competition">Competition</Label>
                  <Input
                    id="competition"
                    value={formData.competition}
                    onChange={(e) => handleChange('competition', e.target.value)}
                    placeholder="Salesforce, HubSpot, Status Quo"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* MEDDPICC Health Assessment */}
          {healthAssessment.gaps.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Qualification Gaps</h4>
              <div className="space-y-1">
                {healthAssessment.gaps.slice(0, 3).map((gap, index) => (
                  <p key={index} className="text-xs text-yellow-600">• {gap}</p>
                ))}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Opportunity...
                </>
              ) : (
                'Create Opportunity'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}