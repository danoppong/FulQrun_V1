// Lead scoring service for automatic lead qualification
// Implements basic scoring rules that can be configured per organization

export interface ScoringCriteria {
  field: string
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'not_empty'
  value: string | number | boolean | null
  points: number
}

export interface ScoringRule {
  id: string
  name: string
  criteria: ScoringCriteria[]
  isActive: boolean
}

// Default scoring rules for MVP
export const defaultScoringRules: ScoringRule[] = [
  {
    id: 'company-size',
    name: 'Company Size Scoring',
    criteria: [
      { field: 'company_employees', operator: 'greater_than', value: 1000, points: 25 },
      { field: 'company_employees', operator: 'greater_than', value: 100, points: 15 },
      { field: 'company_employees', operator: 'greater_than', value: 50, points: 10 },
    ],
    isActive: true
  },
  {
    id: 'title-scoring',
    name: 'Job Title Scoring',
    criteria: [
      { field: 'title', operator: 'contains', value: 'CEO', points: 30 },
      { field: 'title', operator: 'contains', value: 'CTO', points: 25 },
      { field: 'title', operator: 'contains', value: 'VP', points: 20 },
      { field: 'title', operator: 'contains', value: 'Director', points: 15 },
      { field: 'title', operator: 'contains', value: 'Manager', points: 10 },
    ],
    isActive: true
  },
  {
    id: 'source-scoring',
    name: 'Lead Source Scoring',
    criteria: [
      { field: 'source', operator: 'equals', value: 'Referral', points: 25 },
      { field: 'source', operator: 'equals', value: 'Website', points: 15 },
      { field: 'source', operator: 'equals', value: 'Event', points: 20 },
      { field: 'source', operator: 'equals', value: 'Cold Outreach', points: 5 },
    ],
    isActive: true
  },
  {
    id: 'engagement-scoring',
    name: 'Engagement Scoring',
    criteria: [
      { field: 'email', operator: 'not_empty', value: null, points: 10 },
      { field: 'phone', operator: 'not_empty', value: null, points: 10 },
      { field: 'company_name', operator: 'not_empty', value: null, points: 5 },
    ],
    isActive: true
  }
]

export class LeadScoringService {
  // Calculate lead score based on rules
  static calculateScore(leadData: Record<string, unknown>, rules: ScoringRule[] = defaultScoringRules): number {
    let totalScore = 0

    rules.forEach(rule => {
      if (!rule.isActive) return

      rule.criteria.forEach(criterion => {
        const fieldValue = leadData[criterion.field]
        let matches = false

        switch (criterion.operator) {
          case 'equals':
            matches = fieldValue === criterion.value
            break
          case 'contains':
            if (fieldValue && typeof fieldValue === 'string' && typeof criterion.value === 'string') {
              matches = fieldValue.toLowerCase().includes(criterion.value.toLowerCase())
            }
            break
          case 'greater_than':
            if (fieldValue && typeof criterion.value === 'number') {
              matches = Number(fieldValue) > criterion.value
            }
            break
          case 'less_than':
            if (fieldValue && typeof criterion.value === 'number') {
              matches = Number(fieldValue) < criterion.value
            }
            break
          case 'not_empty':
            matches = Boolean(fieldValue && fieldValue.toString().trim() !== '')
            break
        }

        if (matches) {
          totalScore += criterion.points
        }
      })
    })

    // Cap score at 100
    return Math.min(totalScore, 100)
  }

  // Get score breakdown for transparency
  static getScoreBreakdown(leadData: Record<string, unknown>, rules: ScoringRule[] = defaultScoringRules): Array<{
    rule: string
    points: number
    reason: string
  }> {
    const breakdown: Array<{ rule: string; points: number; reason: string }> = []

    rules.forEach(rule => {
      if (!rule.isActive) return

      let rulePoints = 0
      const reasons: string[] = []

      rule.criteria.forEach(criterion => {
        const fieldValue = leadData[criterion.field]
        let matches = false
        let reason = ''

        switch (criterion.operator) {
          case 'equals':
            matches = fieldValue === criterion.value
            reason = matches ? `${criterion.field} equals ${criterion.value}` : ''
            break
          case 'contains':
            if (fieldValue && typeof fieldValue === 'string' && typeof criterion.value === 'string') {
              matches = fieldValue.toLowerCase().includes(criterion.value.toLowerCase())
              reason = matches ? `${criterion.field} contains ${criterion.value}` : ''
            }
            break
          case 'greater_than':
            if (fieldValue && typeof criterion.value === 'number') {
              matches = Number(fieldValue) > criterion.value
              reason = matches ? `${criterion.field} (${fieldValue}) > ${criterion.value}` : ''
            }
            break
          case 'less_than':
            if (fieldValue && typeof criterion.value === 'number') {
              matches = Number(fieldValue) < criterion.value
              reason = matches ? `${criterion.field} (${fieldValue}) < ${criterion.value}` : ''
            }
            break
          case 'not_empty':
            matches = Boolean(fieldValue && fieldValue.toString().trim() !== '')
            reason = matches ? `${criterion.field} provided` : ''
            break
        }

        if (matches) {
          rulePoints += criterion.points
          reasons.push(reason)
        }
      })

      if (rulePoints > 0) {
        breakdown.push({
          rule: rule.name,
          points: rulePoints,
          reason: reasons.join(', ')
        })
      }
    })

    return breakdown
  }

  // Determine lead quality based on score
  static getLeadQuality(score: number): 'hot' | 'warm' | 'cold' {
    if (score >= 70) return 'hot'
    if (score >= 40) return 'warm'
    return 'cold'
  }

  // Get recommended next action based on score and data
  static getRecommendedAction(leadData: Record<string, unknown>, score: number): string {
    if (score >= 70) {
      return 'High-priority lead - schedule immediate call'
    }
    if (score >= 40) {
      return 'Qualified lead - send personalized email'
    }
    if (!leadData.email) {
      return 'Find contact information'
    }
    if (!leadData.company_name) {
      return 'Research company background'
    }
    return 'Nurture with educational content'
  }
}