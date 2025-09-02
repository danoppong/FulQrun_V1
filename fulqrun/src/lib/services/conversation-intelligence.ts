// Advanced AI Conversation Intelligence Service
// Phase 3 implementation for Zoom/Teams call analysis

export interface ConversationAnalysis {
  callId: string
  duration: number // minutes
  participants: Participant[]
  sentiment: SentimentAnalysis
  topics: TopicAnalysis[]
  meddpiccElements: MEDDPICCAnalysis
  nextActions: string[]
  riskFactors: string[]
  opportunities: string[]
  coachingInsights: string[]
  competitorMentions: CompetitorMention[]
}

export interface Participant {
  name: string
  role: 'rep' | 'prospect' | 'customer' | 'internal'
  talkTime: number // percentage
  sentiment: 'positive' | 'neutral' | 'negative'
  engagement: number // 0-100
  keyStatements: string[]
}

export interface SentimentAnalysis {
  overall: 'positive' | 'neutral' | 'negative'
  score: number // -100 to 100
  timeline: Array<{
    timestamp: number
    sentiment: number
    trigger?: string
  }>
  emotionalJourney: string[]
}

export interface TopicAnalysis {
  topic: string
  relevance: number // 0-100
  sentiment: 'positive' | 'neutral' | 'negative'
  duration: number // seconds
  keyPoints: string[]
  actionItems: string[]
}

export interface MEDDPICCAnalysis {
  metrics: {
    mentioned: boolean
    details: string[]
    clarity: number // 0-100
  }
  economicBuyer: {
    identified: boolean
    name?: string
    role?: string
    authority: number // 0-100
  }
  decisionCriteria: {
    discussed: boolean
    criteria: string[]
    completeness: number // 0-100
  }
  decisionProcess: {
    mapped: boolean
    steps: string[]
    timeline?: string
  }
  paperProcess: {
    addressed: boolean
    requirements: string[]
    concerns: string[]
  }
  identifyPain: {
    uncovered: boolean
    businessPains: string[]
    technicalPains: string[]
    personalPains: string[]
  }
  champion: {
    identified: boolean
    name?: string
    commitment: number // 0-100
    influence: number // 0-100
  }
  competition: {
    mentioned: boolean
    competitors: string[]
    positioning: string[]
    concerns: string[]
  }
}

export interface CompetitorMention {
  competitor: string
  context: string
  sentiment: 'positive' | 'neutral' | 'negative'
  concerns: string[]
  opportunities: string[]
}

export interface CallCoaching {
  repName: string
  callId: string
  overallRating: number // 0-100
  strengths: string[]
  improvements: string[]
  meddpiccExecution: number // 0-100
  questioningSkills: number // 0-100
  listeningRatio: number // 0-100 (ideal is 70-80)
  nextActions: string[]
  practiceAreas: string[]
}

export class ConversationIntelligenceService {
  // Analyze recorded call for insights
  static async analyzeCall(callRecording: Blob, participants: string[]): Promise<ConversationAnalysis> {
    // In production, this would integrate with speech-to-text and NLP services
    // For Phase 3 demo, return intelligent mock analysis
    
    return {
      callId: `call_${Date.now()}`,
      duration: 45,
      participants: this.mockParticipants(participants),
      sentiment: this.mockSentimentAnalysis(),
      topics: this.mockTopicAnalysis(),
      meddpiccElements: this.mockMEDDPICCAnalysis(),
      nextActions: [
        'Send ROI calculator based on discussed metrics',
        'Schedule follow-up with economic buyer',
        'Provide competitive differentiation document'
      ],
      riskFactors: [
        'Competitor evaluation in parallel',
        'Budget approval timeline unclear',
        'Technical requirements not fully defined'
      ],
      opportunities: [
        'Strong pain points identified',
        'Champion showing high engagement',
        'Expansion potential discussed'
      ],
      coachingInsights: [
        'Excellent discovery questioning',
        'Could improve on objection handling',
        'Strong MEDDPICC execution'
      ],
      competitorMentions: [
        {
          competitor: 'Salesforce',
          context: 'Mentioned as current evaluation',
          sentiment: 'neutral',
          concerns: ['Complexity', 'Cost'],
          opportunities: ['Position simplicity', 'Highlight methodology focus']
        }
      ]
    }
  }

  // Generate coaching recommendations for sales rep
  static generateCoaching(callAnalysis: ConversationAnalysis, repProfile: Record<string, unknown>): CallCoaching {
    const rep = callAnalysis.participants.find(p => p.role === 'rep')
    
    return {
      repName: rep?.name || 'Sales Rep',
      callId: callAnalysis.callId,
      overallRating: 78,
      strengths: [
        'Excellent discovery questioning technique',
        'Strong rapport building with prospect',
        'Good use of MEDDPICC framework'
      ],
      improvements: [
        'Could have probed deeper on decision timeline',
        'Missed opportunity to identify additional stakeholders',
        'Should have addressed budget concerns more directly'
      ],
      meddpiccExecution: 82,
      questioningSkills: 85,
      listeningRatio: 68, // Below ideal 70-80%
      nextActions: [
        'Practice advanced objection handling',
        'Review stakeholder mapping techniques',
        'Improve listening-to-talking ratio'
      ],
      practiceAreas: [
        'Decision process mapping',
        'Economic buyer identification',
        'Competitive positioning'
      ]
    }
  }

  // Detect deal risk from conversation patterns
  static assessDealRisk(callAnalysis: ConversationAnalysis): {
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    riskFactors: string[]
    mitigation: string[]
  } {
    const riskFactors: string[] = []
    
    // Sentiment-based risk assessment
    if (callAnalysis.sentiment.overall === 'negative') {
      riskFactors.push('Negative overall sentiment detected')
    }
    
    // MEDDPICC completeness risk
    const meddpiccScore = this.calculateMEDDPICCCompleteness(callAnalysis.meddpiccElements)
    if (meddpiccScore < 60) {
      riskFactors.push('Incomplete MEDDPICC qualification')
    }
    
    // Competitor risk
    if (callAnalysis.competitorMentions.length > 0) {
      riskFactors.push('Active competitor evaluation')
    }
    
    // Engagement risk
    const prospectEngagement = callAnalysis.participants
      .filter(p => p.role === 'prospect')
      .reduce((avg, p) => avg + p.engagement, 0) / callAnalysis.participants.filter(p => p.role === 'prospect').length
    
    if (prospectEngagement < 60) {
      riskFactors.push('Low prospect engagement')
    }

    const riskLevel = riskFactors.length >= 3 ? 'high' : riskFactors.length >= 2 ? 'medium' : 'low'
    
    return {
      riskLevel,
      riskFactors,
      mitigation: this.generateRiskMitigation(riskFactors)
    }
  }

  // Monitor pipeline health through conversation patterns
  static analyzePipelineHealth(callAnalyses: ConversationAnalysis[]): {
    overallHealth: number
    trends: string[]
    recommendations: string[]
    teamInsights: string[]
  } {
    const avgSentiment = callAnalyses.reduce((sum, call) => sum + call.sentiment.score, 0) / callAnalyses.length
    const meddpiccAdoption = callAnalyses.filter(call => 
      this.calculateMEDDPICCCompleteness(call.meddpiccElements) > 70
    ).length / callAnalyses.length * 100

    return {
      overallHealth: Math.round((avgSentiment + 100) / 2), // Convert -100/100 to 0-100
      trends: [
        `${meddpiccAdoption.toFixed(0)}% of calls show strong MEDDPICC execution`,
        `Average sentiment trending ${avgSentiment > 0 ? 'positive' : 'negative'}`,
        `${callAnalyses.filter(c => c.competitorMentions.length > 0).length} calls mentioned competitors`
      ],
      recommendations: [
        'Increase MEDDPICC training for calls below 70% completion',
        'Develop competitive battle cards for frequently mentioned competitors',
        'Implement sentiment monitoring alerts for negative trend detection'
      ],
      teamInsights: [
        'Discovery questioning skills are strong across team',
        'Objection handling needs improvement in 35% of calls',
        'Champion development discussions happening in 68% of calls'
      ]
    }
  }

  // Private helper methods
  private static mockParticipants(names: string[]): Participant[] {
    return names.map((name, index) => ({
      name,
      role: index === 0 ? 'rep' : 'prospect',
      talkTime: index === 0 ? 35 : 65 / (names.length - 1),
      sentiment: 'positive',
      engagement: 75 + Math.random() * 20,
      keyStatements: [
        'We need to reduce our sales cycle by at least 30%',
        'Budget has been approved for Q2 implementation',
        'The current system is causing significant inefficiencies'
      ]
    }))
  }

  private static mockSentimentAnalysis(): SentimentAnalysis {
    return {
      overall: 'positive',
      score: 65,
      timeline: [
        { timestamp: 0, sentiment: 20 },
        { timestamp: 15, sentiment: 45, trigger: 'Pain point discussion' },
        { timestamp: 30, sentiment: 70, trigger: 'Solution presentation' },
        { timestamp: 45, sentiment: 65 }
      ],
      emotionalJourney: [
        'Started neutral with introductions',
        'Engagement increased during pain discovery',
        'Peak interest during solution demo',
        'Positive close with next steps'
      ]
    }
  }

  private static mockTopicAnalysis(): TopicAnalysis[] {
    return [
      {
        topic: 'Current Sales Process',
        relevance: 95,
        sentiment: 'negative',
        duration: 480,
        keyPoints: ['Manual processes', 'Lack of visibility', 'Inconsistent methodology'],
        actionItems: ['Provide process improvement ROI', 'Schedule technical demo']
      },
      {
        topic: 'Budget and Timeline',
        relevance: 88,
        sentiment: 'positive',
        duration: 360,
        keyPoints: ['Q2 budget approved', 'Implementation target: March', 'Executive support'],
        actionItems: ['Send proposal', 'Schedule executive presentation']
      },
      {
        topic: 'Competitive Landscape',
        relevance: 72,
        sentiment: 'neutral',
        duration: 240,
        keyPoints: ['Evaluating Salesforce', 'Concerned about complexity', 'Cost considerations'],
        actionItems: ['Provide competitive comparison', 'Highlight methodology advantage']
      }
    ]
  }

  private static mockMEDDPICCAnalysis(): MEDDPICCAnalysis {
    return {
      metrics: {
        mentioned: true,
        details: ['Reduce sales cycle by 30%', 'Increase win rate by 15%', '$2M revenue impact'],
        clarity: 85
      },
      economicBuyer: {
        identified: true,
        name: 'CFO Sarah Williams',
        role: 'Chief Financial Officer',
        authority: 90
      },
      decisionCriteria: {
        discussed: true,
        criteria: ['ROI within 12 months', 'Easy implementation', 'Team adoption'],
        completeness: 75
      },
      decisionProcess: {
        mapped: true,
        steps: ['Technical evaluation', 'Executive review', 'Legal approval'],
        timeline: '6-8 weeks'
      },
      paperProcess: {
        addressed: false,
        requirements: [],
        concerns: []
      },
      identifyPain: {
        uncovered: true,
        businessPains: ['Inconsistent sales process', 'Poor pipeline visibility'],
        technicalPains: ['Manual data entry', 'System integration issues'],
        personalPains: ['Rep frustration', 'Manager reporting burden']
      },
      champion: {
        identified: true,
        name: 'VP Sales Mike Johnson',
        commitment: 85,
        influence: 78
      },
      competition: {
        mentioned: true,
        competitors: ['Salesforce', 'HubSpot'],
        positioning: ['Too complex', 'Expensive'],
        concerns: ['Feature comparison', 'Implementation time']
      }
    }
  }

  private static calculateMEDDPICCCompleteness(meddpicc: MEDDPICCAnalysis): number {
    const elements = [
      meddpicc.metrics.mentioned ? meddpicc.metrics.clarity : 0,
      meddpicc.economicBuyer.identified ? meddpicc.economicBuyer.authority : 0,
      meddpicc.decisionCriteria.discussed ? meddpicc.decisionCriteria.completeness : 0,
      meddpicc.decisionProcess.mapped ? 80 : 0,
      meddpicc.paperProcess.addressed ? 70 : 0,
      meddpicc.identifyPain.uncovered ? 90 : 0,
      meddpicc.champion.identified ? (meddpicc.champion.commitment + meddpicc.champion.influence) / 2 : 0,
      meddpicc.competition.mentioned ? 60 : 0
    ]

    return Math.round(elements.reduce((sum, score) => sum + score, 0) / elements.length)
  }

  private static generateRiskMitigation(riskFactors: string[]): string[] {
    const mitigations: string[] = []
    
    riskFactors.forEach(factor => {
      if (factor.includes('sentiment')) {
        mitigations.push('Address concerns raised during call')
        mitigations.push('Schedule follow-up to rebuild rapport')
      }
      if (factor.includes('MEDDPICC')) {
        mitigations.push('Complete missing MEDDPICC elements')
        mitigations.push('Schedule discovery sessions for gaps')
      }
      if (factor.includes('competitor')) {
        mitigations.push('Provide competitive differentiation materials')
        mitigations.push('Schedule competitive positioning session')
      }
      if (factor.includes('engagement')) {
        mitigations.push('Identify and address engagement barriers')
        mitigations.push('Involve additional stakeholders')
      }
    })
    
    return Array.from(new Set(mitigations)) // Remove duplicates
  }
}