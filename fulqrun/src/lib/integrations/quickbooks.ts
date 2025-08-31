// QuickBooks integration for invoicing
// This is a stub implementation for MVP - will be expanded in Phase 1

export interface QuickBooksConfig {
  clientId: string
  clientSecret: string
  sandboxBaseUrl: string
  redirectUri: string
}

export interface Invoice {
  id: string
  number: string
  customer: {
    name: string
    email: string
  }
  amount: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  dueDate: string
  createdDate: string
  lineItems: Array<{
    description: string
    quantity: number
    unitPrice: number
    amount: number
  }>
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

export class QuickBooksService {
  private config: QuickBooksConfig

  constructor(config: QuickBooksConfig) {
    this.config = config
  }

  // Get access token using OAuth2
  async getAccessToken(_authCode: string): Promise<string> {
    // Implementation stub - will use QuickBooks OAuth2 flow
    return 'mock_access_token'
  }

  // Create customer from company/contact
  async createCustomer(_companyData: Record<string, unknown>, _contactData: Record<string, unknown>): Promise<Customer | null> {
    // Implementation stub
    // Will create QuickBooks customer from FulQrun company/contact data
    return null
  }

  // Create invoice from opportunity
  async createInvoiceFromOpportunity(_opportunityId: string, _lineItems: Record<string, unknown>[]): Promise<Invoice | null> {
    // Implementation stub
    // Will create QuickBooks invoice when opportunity is won
    return null
  }

  // Get invoice status
  async getInvoiceStatus(_invoiceId: string): Promise<string> {
    // Implementation stub
    // Will check invoice payment status in QuickBooks
    return 'draft'
  }

  // Send invoice
  async sendInvoice(_invoiceId: string, _email: string): Promise<boolean> {
    // Implementation stub
    // Will send invoice via QuickBooks
    return true
  }

  // Get customer list
  async getCustomers(): Promise<Customer[]> {
    // Implementation stub
    // Will fetch customers from QuickBooks
    return []
  }

  // Sync payment status back to opportunities
  async syncPaymentStatus(): Promise<void> {
    // Implementation stub
    // Will sync payment status from QuickBooks back to FulQrun opportunities
  }
}

// Factory function to create QuickBooks service
export function createQuickBooksService(): QuickBooksService {
  const config: QuickBooksConfig = {
    clientId: process.env.QUICKBOOKS_CLIENT_ID || '',
    clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET || '',
    sandboxBaseUrl: process.env.QUICKBOOKS_SANDBOX_BASE_URL || 'https://sandbox-quickbooks.api.intuit.com',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/quickbooks/callback`
  }

  return new QuickBooksService(config)
}