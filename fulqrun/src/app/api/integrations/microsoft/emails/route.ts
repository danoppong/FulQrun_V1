import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createMicrosoftGraphService } from '@/lib/integrations/microsoft-graph'

export async function GET(_request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For MVP, return mock email data
    // In production, this would integrate with Microsoft Graph API
    const mockEmails = [
      {
        id: '1',
        subject: 'Re: Sales Proposal Discussion',
        sender: { name: 'John Smith', email: 'john.smith@acmecorp.com' },
        recipients: [{ name: 'Sales Rep', email: 'rep@fulqrun.com' }],
        body: 'Thanks for the proposal. We are reviewing it with our team.',
        receivedDateTime: '2024-01-15T10:30:00Z',
        isRead: false
      },
      {
        id: '2',
        subject: 'Meeting Follow-up',
        sender: { name: 'Sarah Williams', email: 'sarah.w@techstart.com' },
        recipients: [{ name: 'Sales Rep', email: 'rep@fulqrun.com' }],
        body: 'Great meeting today. Looking forward to the next steps.',
        receivedDateTime: '2024-01-14T15:45:00Z',
        isRead: true
      }
    ]

    return NextResponse.json({ emails: mockEmails })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userEmail } = await request.json()
    const graphService = createMicrosoftGraphService()
    
    // For MVP, simulate email sync
    // In production, this would call graphService.syncEmails(userEmail)
    const syncResult = {
      synced: 0,
      newActivities: 0,
      message: 'Email sync feature will be implemented in production'
    }

    return NextResponse.json({ result: syncResult })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}