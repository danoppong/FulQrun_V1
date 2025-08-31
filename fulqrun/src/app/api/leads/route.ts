import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    // Demo mode - return mock data
    const mockLeads = [
      {
        id: '1',
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@techcorp.com',
        company_name: 'TechCorp Inc',
        title: 'VP of Sales',
        source: 'Website',
        score: 85,
        status: 'qualified',
        created_at: '2024-01-15'
      },
      {
        id: '2', 
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.j@innovate.com',
        company_name: 'Innovate Solutions',
        title: 'CTO',
        source: 'Referral',
        score: 92,
        status: 'contacted',
        created_at: '2024-01-14'
      }
    ]

    return NextResponse.json({ leads: mockLeads })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Demo mode - simulate lead creation
    const newLead = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString(),
      organization_id: 'demo-org',
      created_by: 'demo-user'
    }

    return NextResponse.json({ lead: newLead }, { status: 201 })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}