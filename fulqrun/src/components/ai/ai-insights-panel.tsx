'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  AlertTriangle, 
  Lightbulb,
  Crown,
  Zap,
  RefreshCw,
  ChevronRight,
  Star,
  Shield,
  Clock
} from 'lucide-react'
import { AIInsightsService, type AIInsight, type NextBestAction } from '@/lib/services/ai-insights'

interface AIInsightsPanelProps {
  entityType: 'lead' | 'opportunity' | 'contact' | 'company'
  entityId: string
  entityData: Record<string, unknown>
}

export function AIInsightsPanel({ entityType, entityId, entityData }: AIInsightsPanelProps) {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [nextAction, setNextAction] = useState<NextBestAction | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const generateInsights = useCallback(async () => {
    setIsLoading(true)
    try {
      // Generate different insights based on entity type
      if (entityType === 'lead') {
        const leadScoring = await AIInsightsService.generateLeadScoringAI(entityData)
        const newInsights: AIInsight[] = [
          {
            type: 'lead_score',
            confidence: leadScoring.confidenceLevel,
            recommendation: `Predicted score: ${leadScoring.predictedScore}`,
            reasoning: leadScoring.scoringFactors.map(f => f.reasoning),
            priority: leadScoring.predictedScore > 70 ? 'high' : 'medium',
            actionable: true
          }
        ]
        setInsights(newInsights)
      }

      if (entityType === 'opportunity') {
        const riskAnalysis = await AIInsightsService.analyzeDealRisk(entityData)
        const nextBestAction = await AIInsightsService.getNextBestAction(entityData)
        
        const newInsights: AIInsight[] = [
          {
            type: 'deal_risk',
            confidence: 85,
            recommendation: `Deal risk: ${riskAnalysis.riskLevel}`,
            reasoning: riskAnalysis.riskFactors.map(f => f.factor),
            priority: riskAnalysis.riskLevel === 'high' ? 'high' : 'medium',
            actionable: true
          },
          {
            type: 'next_action',
            confidence: 90,
            recommendation: nextBestAction.action,
            reasoning: [nextBestAction.reasoning],
            priority: nextBestAction.priority,
            actionable: true
          }
        ]
        
        setInsights(newInsights)
        setNextAction(nextBestAction)
      }

      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error generating AI insights:', error)
    } finally {
      setIsLoading(false)
    }
  }, [entityType, entityData])

  useEffect(() => {
    generateInsights()
  }, [entityId, entityData, generateInsights])

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'lead_score':
        return <Star className="h-4 w-4 text-yellow-600" />
      case 'deal_risk':
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'next_action':
        return <Lightbulb className="h-4 w-4 text-blue-600" />
      case 'champion_detection':
        return <Crown className="h-4 w-4 text-purple-600" />
      case 'competitive_analysis':
        return <Shield className="h-4 w-4 text-orange-600" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'border-red-500 bg-red-50'
      case 'high':
        return 'border-orange-500 bg-orange-50'
      case 'medium':
        return 'border-yellow-500 bg-yellow-50'
      default:
        return 'border-blue-500 bg-blue-50'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-600" />
              AI Insights
            </CardTitle>
            <CardDescription>
              AI-powered recommendations and predictions
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={generateInsights}
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="mr-2 h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-3 w-3" />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Brain className="h-8 w-8 text-purple-600 animate-pulse mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Analyzing data...</p>
            </div>
          </div>
        ) : insights.length > 0 ? (
          <div className="space-y-4">
            {/* Next Best Action Highlight */}
            {nextAction && (
              <div className={`p-4 rounded-lg border-2 ${getPriorityColor(nextAction.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-sm">Next Best Action</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    nextAction.priority === 'high' ? 'bg-red-100 text-red-800' :
                    nextAction.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {nextAction.priority} priority
                  </span>
                </div>
                <p className="font-medium text-sm mb-1">{nextAction.action}</p>
                <p className="text-xs text-muted-foreground mb-2">{nextAction.reasoning}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {nextAction.timeEstimate}
                  </span>
                  <span className="text-green-600">{nextAction.expectedOutcome}</span>
                </div>
              </div>
            )}

            {/* AI Insights List */}
            {insights.map((insight, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <span className="font-medium text-sm capitalize">
                      {insight.type.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {insight.confidence}% confidence
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      insight.confidence > 80 ? 'bg-green-500' :
                      insight.confidence > 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
                
                <p className="text-sm mb-2">{insight.recommendation}</p>
                
                {insight.reasoning.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <p className="mb-1">Reasoning:</p>
                    <ul className="space-y-1">
                      {insight.reasoning.slice(0, 2).map((reason, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {insight.actionable && (
                  <Button variant="outline" size="sm" className="mt-2 w-full">
                    Take Action
                  </Button>
                )}
              </div>
            ))}

            {/* Last Updated */}
            {lastUpdated && (
              <p className="text-xs text-muted-foreground text-center">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No insights available</p>
            <Button variant="outline" size="sm" onClick={generateInsights} className="mt-2">
              Generate Insights
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}