// MEDDPICC qualification framework service
// Provides structured qualification tracking and scoring

export interface MEDDPICCData {
  metrics?: string // Quantifiable business impact
  economicBuyer?: {
    contactId?: string
    name?: string
    title?: string
    identified: boolean
  }
  decisionCriteria?: {
    defined: boolean
    criteria: string[]
    weights?: Record<string, number>
  }
  decisionProcess?: {
    mapped: boolean
    steps: Array<{
      step: string
      stakeholders: string[]
      timeline: string
    }>
  }
  paperProcess?: {
    understood: boolean
    requirements: string[]
    timeline: string
  }
  identifyPain?: {
    identified: boolean
    businessPains: string[]
    technicalPains: string[]
    personalPains: string[]
  }
  champion?: {
    contactId?: string
    name?: string
    influence: 'high' | 'medium' | 'low'
    commitment: 'high' | 'medium' | 'low'
  }
  competition?: {
    competitors: Array<{
      name: string
      strengths: string[]
      weaknesses: string[]
      status: 'active' | 'eliminated' | 'unknown'
    }>
    incumbentSolution?: string
  }
}

export class MEDDPICCService {
  // Calculate MEDDPICC completion score (0-100)
  static calculateScore(data: MEDDPICCData): number {
    let score = 0
    let maxScore = 0

    // Metrics (15 points)
    maxScore += 15
    if (data.metrics && data.metrics.trim() !== '') {
      score += 15
    }

    // Economic Buyer (20 points)
    maxScore += 20
    if (data.economicBuyer?.identified) {
      score += 20
    }

    // Decision Criteria (15 points)
    maxScore += 15
    if (data.decisionCriteria?.defined) {
      score += 15
    }

    // Decision Process (15 points)
    maxScore += 15
    if (data.decisionProcess?.mapped) {
      score += 15
    }

    // Paper Process (10 points)
    maxScore += 10
    if (data.paperProcess?.understood) {
      score += 10
    }

    // Identify Pain (15 points)
    maxScore += 15
    if (data.identifyPain?.identified) {
      score += 15
    }

    // Champion (10 points)
    maxScore += 10
    if (data.champion?.contactId && data.champion.influence === 'high') {
      score += 10
    } else if (data.champion?.contactId) {
      score += 5
    }

    return Math.round((score / maxScore) * 100)
  }

  // Get MEDDPICC health assessment
  static getHealthAssessment(data: MEDDPICCData): {
    score: number
    level: 'strong' | 'moderate' | 'weak'
    gaps: string[]
    recommendations: string[]
  } {
    const score = this.calculateScore(data)
    const gaps: string[] = []
    const recommendations: string[] = []

    // Identify gaps
    if (!data.metrics || data.metrics.trim() === '') {
      gaps.push('Metrics not defined')
      recommendations.push('Quantify the business impact and ROI of your solution')
    }

    if (!data.economicBuyer?.identified) {
      gaps.push('Economic Buyer not identified')
      recommendations.push('Identify who controls the budget for this purchase')
    }

    if (!data.decisionCriteria?.defined) {
      gaps.push('Decision Criteria not mapped')
      recommendations.push('Understand what criteria will be used to evaluate solutions')
    }

    if (!data.decisionProcess?.mapped) {
      gaps.push('Decision Process not understood')
      recommendations.push('Map out the decision-making process and timeline')
    }

    if (!data.paperProcess?.understood) {
      gaps.push('Paper Process not defined')
      recommendations.push('Understand legal, procurement, and approval processes')
    }

    if (!data.identifyPain?.identified) {
      gaps.push('Pain not clearly identified')
      recommendations.push('Dig deeper into business, technical, and personal pain points')
    }

    if (!data.champion?.contactId) {
      gaps.push('No internal champion')
      recommendations.push('Develop an internal advocate who will sell for you')
    }

    // Determine level
    let level: 'strong' | 'moderate' | 'weak'
    if (score >= 80) level = 'strong'
    else if (score >= 60) level = 'moderate'
    else level = 'weak'

    return { score, level, gaps, recommendations }
  }

  // Get next best action based on MEDDPICC status
  static getNextBestAction(data: MEDDPICCData): string {
    const assessment = this.getHealthAssessment(data)
    
    if (assessment.gaps.length === 0) {
      return 'All MEDDPICC elements complete - ready to close'
    }

    // Prioritize actions based on importance
    if (assessment.gaps.includes('Economic Buyer not identified')) {
      return 'Critical: Identify the economic buyer who controls the budget'
    }

    if (assessment.gaps.includes('No internal champion')) {
      return 'High priority: Develop an internal champion to advocate for your solution'
    }

    if (assessment.gaps.includes('Pain not clearly identified')) {
      return 'Important: Conduct discovery to identify specific business pains'
    }

    if (assessment.gaps.includes('Metrics not defined')) {
      return 'Define quantifiable metrics and ROI for the business case'
    }

    // Return first recommendation if no critical gaps
    return assessment.recommendations[0] || 'Continue qualification process'
  }

  // Validate opportunity readiness for next stage
  static validateStageReadiness(data: MEDDPICCData, targetStage: string): {
    ready: boolean
    blockers: string[]
  } {
    const blockers: string[] = []

    switch (targetStage.toLowerCase()) {
      case 'proposal':
        if (!data.identifyPain?.identified) {
          blockers.push('Pain not clearly identified')
        }
        if (!data.champion?.contactId) {
          blockers.push('No internal champion identified')
        }
        if (!data.decisionCriteria?.defined) {
          blockers.push('Decision criteria not understood')
        }
        break

      case 'negotiation':
        if (!data.economicBuyer?.identified) {
          blockers.push('Economic buyer not identified')
        }
        if (!data.decisionProcess?.mapped) {
          blockers.push('Decision process not mapped')
        }
        if (!data.metrics) {
          blockers.push('Business metrics not quantified')
        }
        break

      case 'closed_won':
        if (!data.paperProcess?.understood) {
          blockers.push('Paper process not understood')
        }
        break
    }

    return {
      ready: blockers.length === 0,
      blockers
    }
  }
}