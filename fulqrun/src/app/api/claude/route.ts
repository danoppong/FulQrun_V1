// Claude AI Direct API Route
import { NextRequest, NextResponse } from 'next/server'
import { getClaudeService } from '@/lib/services/claude-ai'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, model, maxTokens, temperature } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Create a custom Claude service instance with provided parameters
    const { ClaudeAIService } = await import('@/lib/services/claude-ai')
    const customService = new ClaudeAIService({
      apiKey: process.env.ANTHROPIC_API_KEY!,
      model: model || 'claude-3-5-sonnet-20241022',
      maxTokens: maxTokens || 4000,
      temperature: temperature || 0.3
    })

    const response = await customService.callClaude(prompt)

    if (response.error) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      content: response.content,
      usage: response.usage
    })

  } catch (error) {
    console.error('Claude API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Claude AI Direct API',
    description: 'Send custom prompts to Claude AI',
    usage: {
      method: 'POST',
      body: {
        prompt: 'Your prompt here',
        model: 'claude-3-5-sonnet-20241022 (optional)',
        maxTokens: '4000 (optional)',
        temperature: '0.3 (optional)'
      }
    }
  })
}
