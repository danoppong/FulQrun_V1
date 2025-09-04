// AI Insights API Route - Claude AI Integration
import { NextRequest, NextResponse } from 'next/server'
import { getClaudeService } from '@/lib/services/claude-ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: type and data' },
        { status: 400 }
      )
    }

    const claudeService = getClaudeService()
    let response

    switch (type) {
      case 'lead_scoring':
        response = await claudeService.analyzeLead(data)
        break
      
      case 'deal_risk':
        response = await claudeService.analyzeDealRisk(data)
        break
      
      case 'champion_detection':
        response = await claudeService.detectChampions(data)
        break
      
      case 'next_best_action':
        response = await claudeService.getNextBestAction(data)
        break
      
      case 'competitive_analysis':
        response = await claudeService.analyzeCompetition(data)
        break
      
      case 'call_analysis':
        const { transcript, context } = data
        response = await claudeService.analyzeCall(transcript, context)
        break
      
      case 'customer_health':
        response = await claudeService.analyzeCustomerHealth(data)
        break
      
      default:
        return NextResponse.json(
          { error: `Unsupported analysis type: ${type}` },
          { status: 400 }
        )
    }

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }

    // Parse Claude's JSON response
    const analysis = JSON.parse(response.content)

    return NextResponse.json({
      success: true,
      analysis,
      usage: response.usage
    })

  } catch (error) {
    console.error('AI Insights API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Insights API - Claude AI Integration',
    supportedTypes: [
      'lead_scoring',
      'deal_risk', 
      'champion_detection',
      'next_best_action',
      'competitive_analysis',
      'call_analysis',
      'customer_health'
    ]
  })
}
