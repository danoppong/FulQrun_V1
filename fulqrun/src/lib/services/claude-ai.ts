// Claude AI service for intelligent sales insights and recommendations
import Anthropic from '@anthropic-ai/sdk'

export interface ClaudeConfig {
  apiKey: string
  model?: string
  maxTokens?: number
  temperature?: number
}

export interface ClaudeResponse {
  content: string
  usage?: {
    inputTokens: number
    outputTokens: number
  }
  error?: string
}

export class ClaudeAIService {
  private anthropic: Anthropic
  private config: ClaudeConfig

  constructor(config: ClaudeConfig) {
    this.config = {
      model: 'claude-3-5-sonnet-20241022',
      maxTokens: 4000,
      temperature: 0.3,
      ...config
    }
    
    this.anthropic = new Anthropic({
      apiKey: this.config.apiKey
    })
  }

  // Lead Scoring Analysis
  async analyzeLead(leadData: Record<string, unknown>): Promise<ClaudeResponse> {
    const prompt = this.buildLeadScoringPrompt(leadData)
    return this.callClaude(prompt)
  }

  // Deal Risk Analysis
  async analyzeDealRisk(opportunityData: Record<string, unknown>): Promise<ClaudeResponse> {
    const prompt = this.buildDealRiskPrompt(opportunityData)
    return this.callClaude(prompt)
  }

  // Champion Detection
  async detectChampions(contactData: Record<string, unknown>[]): Promise<ClaudeResponse> {
    const prompt = this.buildChampionDetectionPrompt(contactData)
    return this.callClaude(prompt)
  }

  // Next Best Action Recommendation
  async getNextBestAction(context: Record<string, unknown>): Promise<ClaudeResponse> {
    const prompt = this.buildNextBestActionPrompt(context)
    return this.callClaude(prompt)
  }

  // Competitive Analysis
  async analyzeCompetition(dealData: Record<string, unknown>): Promise<ClaudeResponse> {
    const prompt = this.buildCompetitiveAnalysisPrompt(dealData)
    return this.callClaude(prompt)
  }

  // Call Analysis for Conversation Intelligence
  async analyzeCall(transcript: string, context: Record<string, unknown>): Promise<ClaudeResponse> {
    const prompt = this.buildCallAnalysisPrompt(transcript, context)
    return this.callClaude(prompt)
  }

  // Customer Health Scoring
  async analyzeCustomerHealth(customerData: Record<string, unknown>): Promise<ClaudeResponse> {
    const prompt = this.buildCustomerHealthPrompt(customerData)
    return this.callClaude(prompt)
  }

  // Generic Claude API call
  async callClaude(prompt: string): Promise<ClaudeResponse> {
    try {
      const response = await this.anthropic.messages.create({
        model: this.config.model!,
        max_tokens: this.config.maxTokens!,
        temperature: this.config.temperature!,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })

      return {
        content: response.content[0].type === 'text' ? response.content[0].text : '',
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens
        }
      }
    } catch (error) {
      console.error('Claude API Error:', error)
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Prompt Builders
  private buildLeadScoringPrompt(leadData: Record<string, unknown>): string {
    return `You are an expert sales analyst specializing in lead scoring and qualification. Analyze the following lead data and provide a comprehensive scoring assessment.

Lead Data:
${JSON.stringify(leadData, null, 2)}

Please provide your analysis in the following JSON format:
{
  "predictedScore": number (0-100),
  "confidenceLevel": number (0-100),
  "scoringFactors": [
    {
      "factor": "string",
      "impact": number (0-100),
      "reasoning": "string"
    }
  ],
  "recommendations": ["string"],
  "riskFactors": ["string"],
  "nextActions": ["string"]
}

Focus on:
1. Job title and seniority level
2. Company size and industry
3. Engagement signals
4. Budget indicators
5. Timeline indicators
6. Decision-making authority

Provide specific, actionable insights based on sales methodology best practices.`
  }

  private buildDealRiskPrompt(opportunityData: Record<string, unknown>): string {
    return `You are a sales operations expert analyzing deal risk and forecasting. Analyze the following opportunity data to assess deal risk and provide recommendations.

Opportunity Data:
${JSON.stringify(opportunityData, null, 2)}

Please provide your analysis in the following JSON format:
{
  "riskLevel": "low" | "medium" | "high" | "critical",
  "riskScore": number (0-100),
  "riskFactors": [
    {
      "factor": "string",
      "severity": number (0-100),
      "mitigation": "string"
    }
  ],
  "recommendations": ["string"],
  "timeToClose": number (predicted days),
  "probability": number (0-100)
}

Focus on:
1. MEDDPICC qualification elements
2. Competitive landscape
3. Budget and timeline
4. Stakeholder engagement
5. Technical requirements
6. Decision process clarity

Provide specific risk mitigation strategies and next steps.`
  }

  private buildChampionDetectionPrompt(contactData: Record<string, unknown>[]): string {
    return `You are a sales expert specializing in champion identification and stakeholder mapping. Analyze the following contact data to identify potential champions and advocates.

Contact Data:
${JSON.stringify(contactData, null, 2)}

Please provide your analysis in the following JSON format:
{
  "potentialChampions": [
    {
      "contactId": "string",
      "name": "string",
      "championScore": number (0-100),
      "indicators": ["string"],
      "engagementLevel": "low" | "medium" | "high",
      "influence": "low" | "medium" | "high"
    }
  ],
  "recommendations": ["string"],
  "stakeholderMap": {
    "economicBuyer": "string",
    "technicalBuyer": "string",
    "userBuyer": "string",
    "coach": "string"
  }
}

Focus on:
1. Influence and decision-making power
2. Engagement and enthusiasm levels
3. Access to budget and resources
4. Relationship with other stakeholders
5. Pain point alignment
6. Advocacy potential

Provide specific strategies for developing each champion.`
  }

  private buildNextBestActionPrompt(context: Record<string, unknown>): string {
    return `You are a sales coach providing next best action recommendations. Based on the current context, suggest the most effective next steps.

Context:
${JSON.stringify(context, null, 2)}

Please provide your analysis in the following JSON format:
{
  "action": "string",
  "priority": "low" | "medium" | "high" | "critical",
  "reasoning": "string",
  "expectedOutcome": "string",
  "timeEstimate": "string",
  "resources": ["string"],
  "successMetrics": ["string"]
}

Focus on:
1. Current deal stage and momentum
2. Stakeholder engagement levels
3. Competitive threats
4. Timeline pressures
5. Resource availability
6. Risk mitigation needs

Provide specific, actionable recommendations with clear success criteria.`
  }

  private buildCompetitiveAnalysisPrompt(dealData: Record<string, unknown>): string {
    return `You are a competitive intelligence expert analyzing deal competition. Analyze the following deal data to provide competitive insights and positioning strategies.

Deal Data:
${JSON.stringify(dealData, null, 2)}

Please provide your analysis in the following JSON format:
{
  "competitors": [
    {
      "name": "string",
      "threatLevel": "low" | "medium" | "high",
      "strengths": ["string"],
      "weaknesses": ["string"],
      "positioning": "string"
    }
  ],
  "differentiators": ["string"],
  "winStrategies": ["string"],
  "objectionHandling": [
    {
      "objection": "string",
      "response": "string"
    }
  ]
}

Focus on:
1. Competitive landscape assessment
2. Unique value propositions
3. Win/loss patterns
4. Objection handling strategies
5. Positioning recommendations
6. Competitive intelligence gaps

Provide specific strategies for winning against identified competitors.`
  }

  private buildCallAnalysisPrompt(transcript: string, context: Record<string, unknown>): string {
    return `You are a conversation intelligence expert analyzing sales calls. Analyze the following call transcript and provide insights for sales improvement.

Call Transcript:
${transcript}

Context:
${JSON.stringify(context, null, 2)}

Please provide your analysis in the following JSON format:
{
  "sentiment": "positive" | "neutral" | "negative",
  "topics": ["string"],
  "meddpiccElements": {
    "metrics": ["string"],
    "economicBuyer": ["string"],
    "decisionCriteria": ["string"],
    "decisionProcess": ["string"],
    "paperProcess": ["string"],
    "identifyPain": ["string"],
    "champion": ["string"],
    "competition": ["string"]
  },
  "nextActions": ["string"],
  "coachingInsights": ["string"],
  "riskFactors": ["string"],
  "opportunities": ["string"]
}

Focus on:
1. MEDDPICC qualification elements
2. Sentiment and engagement
3. Pain points and needs
4. Decision-making process
5. Competitive mentions
6. Next steps and follow-ups

Provide specific coaching recommendations for the sales rep.`
  }

  private buildCustomerHealthPrompt(customerData: Record<string, unknown>): string {
    return `You are a customer success expert analyzing customer health and churn risk. Analyze the following customer data to assess health and provide recommendations.

Customer Data:
${JSON.stringify(customerData, null, 2)}

Please provide your analysis in the following JSON format:
{
  "healthScore": number (0-100),
  "riskLevel": "low" | "medium" | "high" | "critical",
  "healthFactors": [
    {
      "factor": "string",
      "score": number (0-100),
      "trend": "improving" | "stable" | "declining",
      "impact": "string"
    }
  ],
  "churnRisk": {
    "probability": number (0-100),
    "timeframe": "string",
    "triggers": ["string"]
  },
  "recommendations": ["string"],
  "expansionOpportunities": ["string"]
}

Focus on:
1. Product usage and adoption
2. Support ticket patterns
3. Engagement metrics
4. Contract renewal timeline
5. Stakeholder changes
6. Business growth indicators

Provide specific intervention strategies and expansion opportunities.`
  }
}

// Singleton instance for the application
let claudeService: ClaudeAIService | null = null

export function getClaudeService(): ClaudeAIService {
  if (!claudeService) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required')
    }
    claudeService = new ClaudeAIService({ apiKey })
  }
  return claudeService
}
