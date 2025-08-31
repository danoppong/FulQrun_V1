'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { LeadScoringService } from '@/lib/services/lead-scoring'
import { Loader2, Star } from 'lucide-react'

interface LeadFormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  company_name: string
  title: string
  source: string
  notes: string
  company_employees?: number
  company_revenue?: number
  [key: string]: string | number | undefined
}

interface AddLeadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLeadAdded: (lead: LeadFormData & { score: number }) => void
}

export function AddLeadModal({ open, onOpenChange, onLeadAdded }: AddLeadModalProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company_name: '',
    title: '',
    source: 'Website',
    notes: '',
    company_employees: undefined,
    company_revenue: undefined
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<LeadFormData>>({})

  // Calculate lead score in real-time
  const leadScore = LeadScoringService.calculateScore(formData)
  const leadQuality = LeadScoringService.getLeadQuality(leadScore)

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {}

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required'
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Company name is required'
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
      
      const leadWithScore = {
        ...formData,
        score: leadScore
      }
      
      onLeadAdded(leadWithScore)
      
      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company_name: '',
        title: '',
        source: 'Website',
        notes: '',
        company_employees: undefined,
        company_revenue: undefined
      })
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error adding lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof LeadFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getQualityBadge = (quality: string) => {
    const colors = {
      hot: 'bg-red-100 text-red-800',
      warm: 'bg-yellow-100 text-yellow-800',
      cold: 'bg-gray-100 text-gray-800'
    }
    return colors[quality as keyof typeof colors] || colors.cold
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Enter lead information to start the qualification process
          </DialogDescription>
        </DialogHeader>

        {/* Real-time Lead Score */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Lead Score:</span>
            <span className={`text-lg font-bold ${getScoreColor(leadScore)}`}>
              {leadScore}
            </span>
          </div>
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getQualityBadge(leadQuality)}`}>
            {leadQuality.toUpperCase()}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
                className={errors.first_name ? 'border-red-500' : ''}
              />
              {errors.first_name && (
                <p className="text-sm text-red-600 mt-1">{errors.first_name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
                className={errors.last_name ? 'border-red-500' : ''}
              />
              {errors.last_name && (
                <p className="text-sm text-red-600 mt-1">{errors.last_name}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Company Information */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Company Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleChange('company_name', e.target.value)}
                  className={errors.company_name ? 'border-red-500' : ''}
                />
                {errors.company_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.company_name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="VP of Sales, CTO, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="company_employees">Company Size (Employees)</Label>
                <Input
                  id="company_employees"
                  type="number"
                  value={formData.company_employees || ''}
                  onChange={(e) => handleChange('company_employees', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 250"
                />
              </div>
              <div>
                <Label htmlFor="company_revenue">Annual Revenue ($)</Label>
                <Input
                  id="company_revenue"
                  type="number"
                  value={formData.company_revenue || ''}
                  onChange={(e) => handleChange('company_revenue', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 10000000"
                />
              </div>
            </div>
          </div>

          {/* Lead Source */}
          <div>
            <Label htmlFor="source">Lead Source</Label>
            <select
              id="source"
              value={formData.source}
              onChange={(e) => handleChange('source', e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Outreach">Cold Outreach</option>
              <option value="Event">Event</option>
              <option value="Social Media">Social Media</option>
              <option value="Partner">Partner</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Trade Show">Trade Show</option>
            </select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Additional notes about this lead..."
            />
          </div>

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
                  Adding Lead...
                </>
              ) : (
                'Add Lead'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}