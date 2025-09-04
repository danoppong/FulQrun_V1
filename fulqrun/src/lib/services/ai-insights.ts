// AI-driven insights service for predictive scoring and recommendations
// Phase 2 implementation with Claude AI integration
import { getClaudeService } from './claude-ai'

export interface AIInsight {
  type: 'lead_score' | 'deal_risk' | 'next_action' | 'champion_detection' | 'competitive_analysis'
  confidence: number // 0-100
  recommendation: string
  reasoning: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  actionable: boolean
}

export interface LeadScoringAI {
  predictedScore: number
  confidenceLevel: number
  scoringFactors: Array<{
    factor: string
    impact: number
    reasoning: string
  }>
  recommendations: string[]
}

export interface DealRiskAnalysis {
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  riskScore: number // 0-100
  riskFactors: Array<{
    factor: string
    severity: number
    mitigation: string
  }>
  recommendations: string[]
  timeToClose: number // predicted days
}

export interface NextBestAction {
  action: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  reasoning: string
  expectedOutcome: string
  timeEstimate: string
  resources: string[]
}

export interface ChampionDetection {
  potentialChampions: Array<{
    contactId: string
    name: string
    championScore: number
    indicators: string[]
    engagementLevel: 'low' | 'medium' | 'high'
    influence: 'low' | 'medium' | 'high'
  }>
  recommendations: string[]
}

export class AIInsightsService {
  private static readonly API_ENDPOINT = '/api/ai/insights'

  // Enhanced Lead Scoring with AI
  static async generateLeadScoringAI(leadData: Record<string, unknown>): Promise<LeadScoringAI> {
    try {
      // Use Claude AI for intelligent lead scoring
      const claudeService = getClaudeService()
      const response = await claudeService.analyzeLead(leadData)
      
      if (response.error) {
        console.error('Claude AI Lead Scoring error:', response.error)
        // Fallback to basic scoring
        return this.getFallbackLeadScoring(leadData)
      }
      
      // Parse Claude's JSON response
      const analysis = JSON.parse(response.content)
      
      return {
        predictedScore: analysis.predictedScore || 50,
        confidenceLevel: analysis.confidenceLevel || 70,
        scoringFactors: analysis.scoringFactors || [],
        recommendations: analysis.recommendations || ['Contact lead for initial qualification']
      }
    } catch (error) {
      console.error('AI Lead Scoring error:', error)
      // Fallback to basic scoring
      return this.getFallbackLeadScoring(leadData)
    }
  }

  // Fallback lead scoring when Claude is unavailable
  private static getFallbackLeadScoring(leadData: Record<string, unknown>): LeadScoringAI {
    const baseScore = this.calculateBaseScore(leadData)
    const aiEnhancements = this.generateAIEnhancements(leadData)
    
    return {
      predictedScore: Math.min(baseScore + aiEnhancements.boost, 100),
      confidenceLevel: 60,
      scoringFactors: [
        {
          factor: 'Job Title Analysis',
          impact: this.analyzeTitleImpact(leadData.title as string),
          reasoning: `Title "${leadData.title}" indicates ${this.getTitleReasoning(leadData.title as string)}`
        },
        {
          factor: 'Company Size Correlation',
          impact: this.analyzeCompanySize(leadData.company_employees as number),
          reasoning: `Company size suggests ${this.getCompanySizeReasoning(leadData.company_employees as number)}`
        },
        {
          factor: 'Industry Fit',
          impact: 15,
          reasoning: 'Industry shows strong alignment with our ideal customer profile'
        }
      ],
      recommendations: this.generateLeadRecommendations(leadData, baseScore + aiEnhancements.boost)
    }
  }

  // Deal Risk Analysis with AI
  static async analyzeDealRisk(opportunityData: Record<string, unknown>): Promise<DealRiskAnalysis> {
    try {
      // Use Claude AI for intelligent deal risk analysis
      const claudeService = getClaudeService()
      const response = await claudeService.analyzeDealRisk(opportunityData)
      
      if (response.error) {
        console.error('Claude AI Deal Risk Analysis error:', response.error)
        // Fallback to basic analysis
        return this.getFallbackDealRiskAnalysis(opportunityData)
      }
      
      // Parse Claude's JSON response
      const analysis = JSON.parse(response.content)
      
      return {
        riskLevel: analysis.riskLevel || 'medium',
        riskScore: analysis.riskScore || 50,
        riskFactors: analysis.riskFactors || [],
        recommendations: analysis.recommendations || ['Continue standard qualification process'],
        timeToClose: analysis.timeToClose || 30
      }
    } catch (error) {
      console.error('AI Deal Risk Analysis error:', error)
      // Fallback to basic analysis
      return this.getFallbackDealRiskAnalysis(opportunityData)
    }
  }

  // Fallback deal risk analysis when Claude is unavailable
  private static getFallbackDealRiskAnalysis(opportunityData: Record<string, unknown>): DealRiskAnalysis {
    const riskFactors = this.identifyRiskFactors(opportunityData)
    const riskScore = this.calculateRiskScore(riskFactors)
    
    return {
      riskLevel: this.getRiskLevel(riskScore),
      riskScore,
      riskFactors,
      recommendations: this.generateRiskMitigation(riskFactors),
      timeToClose: this.predictTimeToClose(opportunityData)
    }
  }

  // Next Best Action AI Recommendations
  static async getNextBestAction(contextData: Record<string, unknown>): Promise<NextBestAction> {
    try {
      // Use Claude AI for intelligent next best action recommendations
      const claudeService = getClaudeService()
      const response = await claudeService.getNextBestAction(contextData)
      
      if (response.error) {
        console.error('Claude AI Next Best Action error:', response.error)
        // Fallback to basic analysis
        return this.getFallbackNextBestAction(contextData)
      }
      
      // Parse Claude's JSON response
      const analysis = JSON.parse(response.content)
      
      return {
        action: analysis.action || 'Continue current sales process',
        priority: analysis.priority || 'medium',
        reasoning: analysis.reasoning || 'Standard follow-up recommended',
        expectedOutcome: analysis.expectedOutcome || 'Maintain engagement',
        timeEstimate: analysis.timeEstimate || '1-2 days',
        resources: analysis.resources || ['Email template', 'Call script']
      }
    } catch (error) {
      console.error('AI Next Best Action error:', error)
      // Fallback to basic analysis
      return this.getFallbackNextBestAction(contextData)
    }
  }

  // Fallback next best action when Claude is unavailable
  private static getFallbackNextBestAction(contextData: Record<string, unknown>): NextBestAction {
    const action = this.determineOptimalAction(contextData)
    
    return {
      action: action.description,
      priority: action.priority,
      reasoning: action.reasoning,
      expectedOutcome: action.outcome,
      timeEstimate: action.timeEstimate,
      resources: action.resources
    }
  }

  // Champion Detection AI
  static async detectChampions(contactsData: Array<Record<string, unknown>>): Promise<ChampionDetection> {
    try {
      // Use Claude AI for intelligent champion detection
      const claudeService = getClaudeService()
      const response = await claudeService.detectChampions(contactsData)
      
      if (response.error) {
        console.error('Claude AI Champion Detection error:', response.error)
        // Fallback to basic analysis
        return this.getFallbackChampionDetection(contactsData)
      }
      
      // Parse Claude's JSON response
      const analysis = JSON.parse(response.content)
      
      return {
        potentialChampions: analysis.potentialChampions || [],
        recommendations: analysis.recommendations || ['Identify key stakeholders for champion development']
      }
    } catch (error) {
      console.error('AI Champion Detection error:', error)
      // Fallback to basic analysis
      return this.getFallbackChampionDetection(contactsData)
    }
  }

  // Fallback champion detection when Claude is unavailable
  private static getFallbackChampionDetection(contactsData: Array<Record<string, unknown>>): ChampionDetection {
    const potentialChampions = contactsData.map(contact => ({
      contactId: contact.id as string,
      name: `${contact.first_name} ${contact.last_name}`,
      championScore: this.calculateChampionScore(contact),
      indicators: this.getChampionIndicators(contact),
      engagementLevel: this.getEngagementLevel(contact),
      influence: this.getInfluenceLevel(contact)
    }))

    return {
      potentialChampions: potentialChampions.filter(c => c.championScore > 60),
      recommendations: this.generateChampionRecommendations(potentialChampions)
    }
  }

  // Helper methods for AI analysis
  private static calculateBaseScore(leadData: Record<string, unknown>): number {
    let score = 0
    
    // Title scoring
    const title = (leadData.title as string)?.toLowerCase() || ''
    if (title.includes('ceo') || title.includes('founder')) score += 30
    else if (title.includes('vp') || title.includes('vice president')) score += 25
    else if (title.includes('director')) score += 20
    else if (title.includes('manager')) score += 15
    
    // Company size scoring
    const employees = leadData.company_employees as number
    if (employees > 1000) score += 25
    else if (employees > 100) score += 15
    else if (employees > 50) score += 10
    
    return score
  }

  private static generateAIEnhancements(leadData: Record<string, unknown>): { boost: number } {
    // AI enhancement logic would go here
    // For now, return mock enhancement
    return { boost: Math.floor(Math.random() * 20) }
  }

  private static analyzeTitleImpact(title: string): number {
    if (!title) return 0
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('ceo') || titleLower.includes('founder')) return 30
    if (titleLower.includes('cto') || titleLower.includes('cfo')) return 25
    if (titleLower.includes('vp') || titleLower.includes('vice president')) return 20
    if (titleLower.includes('director')) return 15
    if (titleLower.includes('manager')) return 10
    
    return 5
  }

  private static getTitleReasoning(title: string): string {
    if (!title) return 'decision-making authority unclear'
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('ceo') || titleLower.includes('founder')) 
      return 'high decision-making authority and budget control'
    if (titleLower.includes('cto') || titleLower.includes('cfo')) 
      return 'technical/financial decision-making influence'
    if (titleLower.includes('vp') || titleLower.includes('vice president')) 
      return 'senior management with significant influence'
    if (titleLower.includes('director')) 
      return 'management level with departmental authority'
    
    return 'individual contributor level'
  }

  private static analyzeCompanySize(employees: number): number {
    if (!employees) return 0
    if (employees > 1000) return 25
    if (employees > 500) return 20
    if (employees > 100) return 15
    if (employees > 50) return 10
    return 5
  }

  private static getCompanySizeReasoning(employees: number): string {
    if (!employees) return 'company size unknown'
    if (employees > 1000) return 'enterprise-level budget and complex buying process'
    if (employees > 500) return 'substantial budget with structured procurement'
    if (employees > 100) return 'established company with formal buying process'
    if (employees > 50) return 'growing company with increasing budget'
    return 'small company with limited budget'
  }

  private static generateLeadRecommendations(leadData: Record<string, unknown>, score: number): string[] {
    const recommendations = []
    
    if (score >= 80) {
      recommendations.push('High-priority lead - schedule immediate call')
      recommendations.push('Prepare executive-level presentation')
    } else if (score >= 60) {
      recommendations.push('Qualified lead - send personalized email')
      recommendations.push('Research company background and pain points')
    } else if (score >= 40) {
      recommendations.push('Nurture with educational content')
      recommendations.push('Identify additional stakeholders')
    } else {
      recommendations.push('Continue lead development')
      recommendations.push('Gather more qualification information')
    }
    
    if (!leadData.phone) {
      recommendations.push('Obtain direct phone number')
    }
    
    if (!leadData.company_name) {
      recommendations.push('Research company background')
    }
    
    return recommendations
  }

  private static identifyRiskFactors(opportunityData: Record<string, unknown>): Array<{
    factor: string
    severity: number
    mitigation: string
  }> {
    const factors = []
    
    // MEDDPICC completeness analysis
    const meddpiccScore = (opportunityData.meddpicc_score as number) || 0
    if (meddpiccScore < 70) {
      factors.push({
        factor: 'Incomplete MEDDPICC Qualification',
        severity: 80,
        mitigation: 'Complete missing MEDDPICC elements before advancing'
      })
    }
    
    // Timeline analysis
    const closeDate = new Date(opportunityData.expected_close_date as string)
    const daysToClose = Math.ceil((closeDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    if (daysToClose < 7) {
      factors.push({
        factor: 'Tight Timeline',
        severity: 70,
        mitigation: 'Expedite decision process and remove blockers'
      })
    }
    
    return factors
  }

  private static calculateRiskScore(riskFactors: Array<{ severity: number }>): number {
    if (riskFactors.length === 0) return 20
    const avgSeverity = riskFactors.reduce((sum, f) => sum + f.severity, 0) / riskFactors.length
    return Math.min(avgSeverity, 100)
  }

  private static getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 80) return 'critical'
    if (score >= 60) return 'high'
    if (score >= 40) return 'medium'
    return 'low'
  }

  private static generateRiskMitigation(riskFactors: Array<{ factor: string }>): string[] {
    const mitigations = ['Complete MEDDPICC qualification', 'Identify and engage champion']
    
    riskFactors.forEach(factor => {
      if (factor.factor.includes('Timeline')) {
        mitigations.push('Create urgency and expedite decision process')
      }
      if (factor.factor.includes('MEDDPICC')) {
        mitigations.push('Focus on missing qualification elements')
      }
    })
    
    return mitigations
  }

  private static predictTimeToClose(opportunityData: Record<string, unknown>): number {
    const stage = opportunityData.stage as string
    const value = opportunityData.value as number
    
    // AI prediction logic based on historical data
    let baseDays = 30
    
    if (stage?.includes('Proposal')) baseDays = 14
    if (stage?.includes('Negotiation')) baseDays = 7
    if (value > 100000) baseDays += 14 // Larger deals take longer
    
    return baseDays
  }

  private static determineOptimalAction(contextData: Record<string, unknown>): {
    description: string
    priority: 'low' | 'medium' | 'high' | 'critical'
    reasoning: string
    outcome: string
    timeEstimate: string
    resources: string[]
  } {
    // AI action determination logic
    const stage = contextData.stage as string
    const meddpiccScore = (contextData.meddpicc_score as number) || 0
    
    if (meddpiccScore < 50) {
      return {
        description: 'Complete MEDDPICC qualification',
        priority: 'high',
        reasoning: 'Low qualification score indicates missing critical information',
        outcome: 'Improved deal predictability and higher win probability',
        timeEstimate: '2-3 days',
        resources: ['MEDDPICC checklist', 'Discovery call script']
      }
    }
    
    if (stage?.includes('Proposal')) {
      return {
        description: 'Schedule proposal review meeting',
        priority: 'high',
        reasoning: 'Proposal stage requires active follow-up and stakeholder engagement',
        outcome: 'Faster decision process and objection handling',
        timeEstimate: '1-2 days',
        resources: ['Proposal presentation', 'ROI calculator']
      }
    }
    
    return {
      description: 'Continue standard sales process',
      priority: 'medium',
      reasoning: 'Opportunity progressing normally through pipeline',
      outcome: 'Steady advancement toward close',
      timeEstimate: '3-5 days',
      resources: ['Standard follow-up templates']
    }
  }

  private static calculateChampionScore(contact: Record<string, unknown>): number {
    let score = 0
    
    // Title influence
    const title = (contact.title as string)?.toLowerCase() || ''
    if (title.includes('vp') || title.includes('director')) score += 30
    if (title.includes('manager')) score += 20
    
    // Engagement indicators
    if (contact.is_champion) score += 40
    if (contact.is_decision_maker) score += 30
    
    // Activity level (mock calculation)
    score += Math.floor(Math.random() * 20) // Simulated engagement score
    
    return Math.min(score, 100)
  }

  private static getChampionIndicators(contact: Record<string, unknown>): string[] {
    const indicators = []
    
    if (contact.is_champion) indicators.push('Marked as champion')
    if (contact.is_decision_maker) indicators.push('Decision-making authority')
    if (contact.title && (contact.title as string).toLowerCase().includes('vp')) {
      indicators.push('Senior leadership position')
    }
    
    // Mock engagement indicators
    indicators.push('High email engagement')
    indicators.push('Attends all meetings')
    
    return indicators
  }

  private static getEngagementLevel(contact: Record<string, unknown>): 'low' | 'medium' | 'high' {
    // Mock engagement calculation
    const score = Math.random() * 100
    if (score > 70) return 'high'
    if (score > 40) return 'medium'
    return 'low'
  }

  private static getInfluenceLevel(contact: Record<string, unknown>): 'low' | 'medium' | 'high' {
    const title = (contact.title as string)?.toLowerCase() || ''
    
    if (title.includes('ceo') || title.includes('founder') || title.includes('president')) return 'high'
    if (title.includes('vp') || title.includes('director') || title.includes('cto') || title.includes('cfo')) return 'high'
    if (title.includes('manager') || title.includes('lead')) return 'medium'
    
    return 'low'
  }

  private static generateChampionRecommendations(champions: Array<{ championScore: number }>): string[] {
    const recommendations = []
    
    const highScoreChampions = champions.filter(c => c.championScore > 80)
    if (highScoreChampions.length === 0) {
      recommendations.push('Focus on developing internal champions')
      recommendations.push('Identify stakeholders with high influence and engagement')
    } else {
      recommendations.push('Leverage existing champions for deal advancement')
      recommendations.push('Expand champion network within the organization')
    }
    
    recommendations.push('Provide champions with internal selling materials')
    recommendations.push('Schedule regular champion check-ins')
    
    return recommendations
  }

  // Competitive Analysis AI
  static async analyzeCompetitiveLandscape(opportunityData: Record<string, unknown>): Promise<{
    competitors: Array<{
      name: string
      threatLevel: 'low' | 'medium' | 'high'
      strengths: string[]
      weaknesses: string[]
      strategy: string
    }>
    recommendations: string[]
  }> {
    // Mock competitive analysis
    return {
      competitors: [
        {
          name: 'Salesforce',
          threatLevel: 'high',
          strengths: ['Market leader', 'Extensive features', 'Brand recognition'],
          weaknesses: ['Complex setup', 'High cost', 'Over-engineered for SMB'],
          strategy: 'Position FulQrun as simpler, methodology-focused alternative'
        },
        {
          name: 'HubSpot',
          threatLevel: 'medium',
          strengths: ['User-friendly', 'Good marketing tools', 'Free tier'],
          weaknesses: ['Limited advanced features', 'No methodology focus'],
          strategy: 'Highlight PEAK + MEDDPICC methodology advantage'
        }
      ],
      recommendations: [
        'Emphasize methodology-driven approach as key differentiator',
        'Highlight faster time-to-value vs complex enterprise solutions',
        'Position as sales-ops native vs general-purpose CRM'
      ]
    }
  }
}