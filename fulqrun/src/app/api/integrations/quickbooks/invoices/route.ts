import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createQuickBooksService } from '@/lib/integrations/quickbooks'

export async function GET(_request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // For MVP, return mock invoice data
    // In production, this would integrate with QuickBooks API
    const mockInvoices = [
      {
        id: '1',
        number: 'INV-001',
        customer: { name: 'Acme Corp', email: 'billing@acmecorp.com' },
        amount: 150000,
        status: 'sent',
        dueDate: '2024-02-15',
        createdDate: '2024-01-15',
        lineItems: [
          {
            description: 'Enterprise CRM Implementation',
            quantity: 1,
            unitPrice: 150000,
            amount: 150000
          }
        ]
      },
      {
        id: '2',
        number: 'INV-002',
        customer: { name: 'TechStart Inc', email: 'finance@techstart.com' },
        amount: 75000,
        status: 'paid',
        dueDate: '2024-02-08',
        createdDate: '2024-01-08',
        lineItems: [
          {
            description: 'Sales Process Automation',
            quantity: 1,
            unitPrice: 75000,
            amount: 75000
          }
        ]
      }
    ]

    return NextResponse.json({ invoices: mockInvoices })
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

    const { opportunityId, lineItems } = await request.json()
    const quickbooksService = createQuickBooksService()
    
    // For MVP, simulate invoice creation
    // In production, this would call quickbooksService.createInvoiceFromOpportunity
    const mockInvoice = {
      id: `invoice_${Date.now()}`,
      number: `INV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'draft',
      message: 'Invoice creation feature will be implemented in production'
    }

    return NextResponse.json({ invoice: mockInvoice }, { status: 201 })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}