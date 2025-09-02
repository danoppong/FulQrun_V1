// Customer Health Scoring Service for Enterprise Customer Success
// Phase 3 implementation for post-sale customer management

export interface CustomerHealthMetrics {
  overallScore: number // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  trendDirection: 'improving' | 'stable' | 'declining'
  lastUpdated: string
  factors: HealthFactor[]
}

export interface HealthFactor {
  category: 'usage' | 'engagement' | 'satisfaction' | 'commercial' | 'support'
  name: string
  score: number // 0-100
  weight: number // Impact on overall score
  trend: 'up' | 'down' | 'stable'
  dataPoints: HealthDataPoint[]
  recommendations: string[]
}

export interface HealthDataPoint {
  metric: string
  value: number
  target: number
  variance: number // percentage difference from target
  lastMeasured: string
}

export interface RenewalPrediction {
  renewalProbability: number // 0-100
  renewalDate: string
  predictedValue: number
  riskFactors: string[]
  opportunities: string[]
  recommendedActions: string[]
  timeToRenewal: number // days
}

export interface ChurnRiskAlert {
  customerId: string
  companyName: string
  riskScore: number // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  triggerEvents: string[]
  earlyWarningSignals: string[]
  recommendedActions: string[]
  timeToChurn: number // predicted days
  preventionPlaybook: string[]
}

export interface UpsellOpportunity {
  customerId: string
  companyName: string
  opportunityType: 'expansion' | 'cross_sell' | 'upgrade'
  estimatedValue: number
  probability: number
  timeframe: string
  triggers: string[]
  requirements: string[]
  recommendedApproach: string[]
}

export class CustomerHealthService {
  // Calculate comprehensive customer health score
  static calculateHealthScore(customerId: string, metrics: Record<string, unknown>): CustomerHealthMetrics {
    const factors = this.analyzeHealthFactors(metrics)
    const overallScore = this.calculateOverallScore(factors)
    const riskLevel = this.determineRiskLevel(overallScore)
    const trendDirection = this.analyzeTrend(factors)

    return {
      overallScore,
      riskLevel,
      trendDirection,
      lastUpdated: new Date().toISOString(),
      factors
    }
  }

  // Predict renewal likelihood and value
  static predictRenewal(customerId: string, healthMetrics: CustomerHealthMetrics, contractData: Record<string, unknown>): RenewalPrediction {
    const baseRenewalProb = this.calculateBaseRenewalProbability(healthMetrics.overallScore)
    const adjustedProb = this.adjustForContractFactors(baseRenewalProb, contractData)
    const predictedValue = this.predictRenewalValue(contractData, healthMetrics)

    return {
      renewalProbability: adjustedProb,
      renewalDate: contractData.renewal_date as string,
      predictedValue,
      riskFactors: this.identifyRenewalRisks(healthMetrics, contractData),
      opportunities: this.identifyRenewalOpportunities(healthMetrics, contractData),
      recommendedActions: this.generateRenewalActions(adjustedProb, healthMetrics),
      timeToRenewal: this.calculateTimeToRenewal(contractData.renewal_date as string)
    }
  }

  // Generate churn risk alerts
  static assessChurnRisk(customerId: string, healthMetrics: CustomerHealthMetrics): ChurnRiskAlert | null {
    if (healthMetrics.riskLevel === 'low') return null

    const riskScore = 100 - healthMetrics.overallScore
    const triggerEvents = this.identifyChurnTriggers(healthMetrics)
    const earlyWarningSignals = this.detectEarlyWarnings(healthMetrics)

    return {
      customerId,
      companyName: 'Customer Company', // Would come from database
      riskScore,
      riskLevel: healthMetrics.riskLevel,
      triggerEvents,
      earlyWarningSignals,
      recommendedActions: this.generateChurnPreventionActions(healthMetrics),
      timeToChurn: this.predictTimeToChurn(riskScore),
      preventionPlaybook: this.getChurnPreventionPlaybook(healthMetrics.riskLevel)
    }
  }

  // Identify upsell and expansion opportunities
  static identifyUpsellOpportunities(customerId: string, healthMetrics: CustomerHealthMetrics, usageData: Record<string, unknown>): UpsellOpportunity[] {
    const opportunities: UpsellOpportunity[] = []

    // High health score + high usage = expansion opportunity
    if (healthMetrics.overallScore > 80) {
      const usageGrowth = (usageData.usage_growth as number) || 0
      if (usageGrowth > 20) {
        opportunities.push({
          customerId,
          companyName: 'Customer Company',
          opportunityType: 'expansion',
          estimatedValue: this.calculateExpansionValue(usageData),
          probability: 75,
          timeframe: '3-6 months',
          triggers: ['High usage growth', 'Excellent health score'],
          requirements: ['Usage analysis', 'ROI demonstration'],
          recommendedApproach: ['Present usage analytics', 'Show ROI of expansion', 'Propose phased rollout']
        })
      }
    }

    // Feature usage patterns = cross-sell opportunity
    const underutilizedFeatures = this.identifyUnderutilizedFeatures(usageData)
    if (underutilizedFeatures.length > 0) {
      opportunities.push({
        customerId,
        companyName: 'Customer Company',
        opportunityType: 'cross_sell',
        estimatedValue: this.calculateCrossSellValue(underutilizedFeatures),
        probability: 60,
        timeframe: '1-3 months',
        triggers: ['Underutilized features', 'Strong core usage'],
        requirements: ['Feature demonstration', 'Training session'],
        recommendedApproach: ['Show feature benefits', 'Provide training', 'Pilot program']
      })
    }

    return opportunities
  }

  // Private helper methods
  private static analyzeHealthFactors(metrics: Record<string, unknown>): HealthFactor[] {
    return [
      {
        category: 'usage',
        name: 'Platform Adoption',
        score: (metrics.usage_score as number) || 75,
        weight: 30,
        trend: 'up',
        dataPoints: [
          {
            metric: 'Daily Active Users',
            value: (metrics.daily_active_users as number) || 45,
            target: 50,
            variance: -10,
            lastMeasured: new Date().toISOString()
          },
          {
            metric: 'Feature Utilization',
            value: (metrics.feature_utilization as number) || 68,
            target: 80,
            variance: -15,
            lastMeasured: new Date().toISOString()
          }
        ],
        recommendations: ['Increase user training', 'Feature adoption campaign']
      },
      {
        category: 'engagement',
        name: 'User Engagement',
        score: (metrics.engagement_score as number) || 82,
        weight: 25,
        trend: 'stable',
        dataPoints: [
          {
            metric: 'Session Duration',
            value: (metrics.avg_session_duration as number) || 28,
            target: 30,
            variance: -7,
            lastMeasured: new Date().toISOString()
          }
        ],
        recommendations: ['Improve user experience', 'Add engagement features']
      },
      {
        category: 'satisfaction',
        name: 'Customer Satisfaction',
        score: (metrics.satisfaction_score as number) || 88,
        weight: 20,
        trend: 'up',
        dataPoints: [
          {
            metric: 'NPS Score',
            value: (metrics.nps_score as number) || 42,
            target: 50,
            variance: -16,
            lastMeasured: new Date().toISOString()
          }
        ],
        recommendations: ['Address feedback themes', 'Proactive support outreach']
      },
      {
        category: 'commercial',
        name: 'Commercial Health',
        score: (metrics.commercial_score as number) || 76,
        weight: 15,
        trend: 'stable',
        dataPoints: [
          {
            metric: 'Payment Timeliness',
            value: 95,
            target: 98,
            variance: -3,
            lastMeasured: new Date().toISOString()
          }
        ],
        recommendations: ['Monitor payment patterns', 'Ensure contract compliance']
      },
      {
        category: 'support',
        name: 'Support Interaction',
        score: (metrics.support_score as number) || 71,
        weight: 10,
        trend: 'down',
        dataPoints: [
          {
            metric: 'Ticket Resolution Time',
            value: 24,
            target: 12,
            variance: 100,
            lastMeasured: new Date().toISOString()
          }
        ],
        recommendations: ['Improve support response time', 'Proactive issue resolution']
      }
    ]
  }

  private static calculateOverallScore(factors: HealthFactor[]): number {
    const weightedSum = factors.reduce((sum, factor) => sum + (factor.score * factor.weight), 0)
    const totalWeight = factors.reduce((sum, factor) => sum + factor.weight, 0)
    return Math.round(weightedSum / totalWeight)
  }

  private static determineRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
    if (score >= 80) return 'low'
    if (score >= 60) return 'medium'
    if (score >= 40) return 'high'
    return 'critical'
  }

  private static analyzeTrend(factors: HealthFactor[]): 'improving' | 'stable' | 'declining' {
    const trendCounts = factors.reduce((acc, factor) => {
      acc[factor.trend] = (acc[factor.trend] || 0) + factor.weight
      return acc
    }, {} as Record<string, number>)

    const maxTrend = Object.entries(trendCounts).reduce((max, [trend, weight]) => 
      weight > max.weight ? { trend, weight } : max, { trend: 'stable', weight: 0 })

    return maxTrend.trend as 'improving' | 'stable' | 'declining'
  }

  private static calculateBaseRenewalProbability(healthScore: number): number {
    // Base renewal probability based on health score
    if (healthScore >= 90) return 95
    if (healthScore >= 80) return 85
    if (healthScore >= 70) return 75
    if (healthScore >= 60) return 60
    if (healthScore >= 50) return 40
    return 20
  }

  private static adjustForContractFactors(baseProb: number, contractData: Record<string, unknown>): number {
    let adjustedProb = baseProb

    // Contract length adjustment
    const contractLength = contractData.contract_length_months as number
    if (contractLength >= 36) adjustedProb += 10 // Long contracts more likely to renew
    if (contractLength <= 12) adjustedProb -= 5 // Short contracts less sticky

    // Payment history adjustment
    const paymentHistory = contractData.payment_history_score as number
    if (paymentHistory >= 95) adjustedProb += 5
    if (paymentHistory <= 80) adjustedProb -= 10

    return Math.min(Math.max(adjustedProb, 0), 100)
  }

  private static predictRenewalValue(contractData: Record<string, unknown>, healthMetrics: CustomerHealthMetrics): number {
    const currentValue = (contractData.current_arr as number) || 100000
    let multiplier = 1.0

    // Health-based value adjustment
    if (healthMetrics.overallScore >= 90) multiplier = 1.2 // Likely to expand
    else if (healthMetrics.overallScore >= 80) multiplier = 1.1
    else if (healthMetrics.overallScore <= 50) multiplier = 0.8 // Risk of downsizing

    return Math.round(currentValue * multiplier)
  }

  private static identifyRenewalRisks(healthMetrics: CustomerHealthMetrics, contractData: Record<string, unknown>): string[] {
    const risks: string[] = []

    if (healthMetrics.overallScore < 70) risks.push('Low customer health score')
    if (healthMetrics.trendDirection === 'declining') risks.push('Declining health trend')
    
    const timeToRenewal = this.calculateTimeToRenewal(contractData.renewal_date as string)
    if (timeToRenewal < 90 && healthMetrics.riskLevel !== 'low') {
      risks.push('Renewal approaching with health concerns')
    }

    const supportIssues = healthMetrics.factors.find(f => f.category === 'support')?.score || 100
    if (supportIssues < 60) risks.push('Recent support issues')

    return risks
  }

  private static identifyRenewalOpportunities(healthMetrics: CustomerHealthMetrics, contractData: Record<string, unknown>): string[] {
    const opportunities: string[] = []

    if (healthMetrics.overallScore >= 85) opportunities.push('Expansion opportunity due to high satisfaction')
    if (healthMetrics.trendDirection === 'improving') opportunities.push('Growing engagement suggests expansion potential')

    const usageFactor = healthMetrics.factors.find(f => f.category === 'usage')
    if (usageFactor && usageFactor.score >= 80) {
      opportunities.push('High usage indicates potential for additional licenses')
    }

    return opportunities
  }

  private static generateRenewalActions(renewalProbability: number, healthMetrics: CustomerHealthMetrics): string[] {
    const actions: string[] = []

    if (renewalProbability < 70) {
      actions.push('Schedule executive business review')
      actions.push('Conduct health assessment meeting')
      actions.push('Develop improvement plan')
    }

    if (healthMetrics.riskLevel === 'high' || healthMetrics.riskLevel === 'critical') {
      actions.push('Immediate escalation to customer success manager')
      actions.push('Root cause analysis of health issues')
    }

    if (renewalProbability > 85) {
      actions.push('Explore expansion opportunities')
      actions.push('Request case study and testimonial')
    }

    return actions
  }

  private static calculateTimeToRenewal(renewalDate: string): number {
    const renewal = new Date(renewalDate)
    const now = new Date()
    return Math.ceil((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }

  private static identifyChurnTriggers(healthMetrics: CustomerHealthMetrics): string[] {
    const triggers: string[] = []

    healthMetrics.factors.forEach(factor => {
      if (factor.score < 50) {
        triggers.push(`Low ${factor.name} score (${factor.score})`)
      }
      if (factor.trend === 'down') {
        triggers.push(`Declining ${factor.name}`)
      }
    })

    return triggers
  }

  private static detectEarlyWarnings(healthMetrics: CustomerHealthMetrics): string[] {
    const warnings: string[] = []

    const engagementFactor = healthMetrics.factors.find(f => f.category === 'engagement')
    if (engagementFactor && engagementFactor.score < 70) {
      warnings.push('Decreased user engagement')
    }

    const usageFactor = healthMetrics.factors.find(f => f.category === 'usage')
    if (usageFactor && usageFactor.trend === 'down') {
      warnings.push('Usage pattern decline')
    }

    return warnings
  }

  private static generateChurnPreventionActions(healthMetrics: CustomerHealthMetrics): string[] {
    const actions: string[] = []

    if (healthMetrics.riskLevel === 'critical') {
      actions.push('Immediate executive intervention required')
      actions.push('Emergency customer success plan activation')
    }

    if (healthMetrics.riskLevel === 'high') {
      actions.push('Schedule urgent customer success review')
      actions.push('Implement intensive support program')
    }

    actions.push('Analyze root causes of health decline')
    actions.push('Develop targeted improvement plan')
    actions.push('Increase touchpoint frequency')

    return actions
  }

  private static predictTimeToChurn(riskScore: number): number {
    // Predict days until potential churn based on risk score
    if (riskScore >= 80) return 30 // Critical - very soon
    if (riskScore >= 60) return 90 // High risk - 3 months
    if (riskScore >= 40) return 180 // Medium risk - 6 months
    return 365 // Low risk - 1 year+
  }

  private static getChurnPreventionPlaybook(riskLevel: string): string[] {
    const playbooks = {
      critical: [
        'Executive escalation within 24 hours',
        'Emergency success plan implementation',
        'Daily check-ins until stabilized',
        'Root cause analysis and remediation',
        'Consider contract amendments if needed'
      ],
      high: [
        'Customer success manager intervention',
        'Weekly health monitoring',
        'Targeted training and support',
        'Process optimization review',
        'Stakeholder engagement plan'
      ],
      medium: [
        'Proactive outreach and check-ins',
        'Usage optimization recommendations',
        'Training and adoption support',
        'Regular health monitoring'
      ],
      low: [
        'Standard success management',
        'Quarterly business reviews',
        'Expansion opportunity exploration'
      ]
    }

    return playbooks[riskLevel as keyof typeof playbooks] || playbooks.low
  }

  private static calculateExpansionValue(usageData: Record<string, unknown>): number {
    const currentSeats = (usageData.current_seats as number) || 50
    const usageGrowth = (usageData.usage_growth as number) || 20
    const seatPrice = (usageData.seat_price as number) || 100

    // Estimate additional seats needed based on growth
    const additionalSeats = Math.ceil(currentSeats * (usageGrowth / 100))
    return additionalSeats * seatPrice * 12 // Annual value
  }

  private static calculateCrossSellValue(underutilizedFeatures: string[]): number {
    // Estimate value of cross-sell based on features
    const featureValues = {
      'advanced_analytics': 5000,
      'ai_insights': 8000,
      'integrations': 3000,
      'learning_platform': 4000
    }

    return underutilizedFeatures.reduce((total, feature) => {
      return total + (featureValues[feature as keyof typeof featureValues] || 2000)
    }, 0)
  }

  private static identifyUnderutilizedFeatures(usageData: Record<string, unknown>): string[] {
    const features: string[] = []
    
    const analyticsUsage = (usageData.analytics_usage as number) || 0
    if (analyticsUsage < 30) features.push('advanced_analytics')

    const aiUsage = (usageData.ai_usage as number) || 0
    if (aiUsage < 20) features.push('ai_insights')

    const integrationCount = (usageData.active_integrations as number) || 0
    if (integrationCount < 2) features.push('integrations')

    return features
  }
}