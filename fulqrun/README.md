# FulQrun - Sales Operations Platform

A modern sales operations platform that embeds PEAK methodology and MEDDPICC qualification directly into your workflow.

## Features (MVP Phase 1)

### Core Modules
- **Authentication**: Clerk + Microsoft Entra ID SSO
- **Opportunity Management**: PEAK stages + MEDDPICC qualification fields
- **Lead Management**: Manual entry + basic scoring rules
- **Contact & Company Management**: Light CRM functionality
- **Basic Analytics**: Pipeline by stage, deal conversion rate
- **Microsoft Graph Integration**: Emails, calendar sync (stubbed)
- **QuickBooks Integration**: Invoicing with test accounts (stubbed)
- **Role-based Dashboards**: Rep, manager, admin views
- **Mobile-responsive PWA**: Progressive Web App features

### PEAK Methodology
- **Prospect**: Initial lead identification and qualification
- **Engage**: Detailed needs analysis and relationship building
- **Acquire**: Proposal, negotiation, and deal closure
- **Keep**: Customer success and account expansion

### MEDDPICC Qualification Framework
- **Metrics**: Quantifiable business impact
- **Economic Buyer**: Budget decision maker identification
- **Decision Criteria**: Evaluation criteria mapping
- **Decision Process**: Decision-making workflow
- **Paper Process**: Legal and procurement requirements
- **Identify Pain**: Business, technical, and personal pain points
- **Champion**: Internal advocate development
- **Competition**: Competitive landscape analysis

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS v4, shadcn/ui components
- **Authentication**: Clerk with Microsoft Entra ID SSO
- **Database**: Supabase with Row Level Security
- **Deployment**: Vercel + Supabase
- **Integrations**: Microsoft Graph API, QuickBooks API

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clerk account
- Supabase account
- Microsoft Azure AD app registration
- QuickBooks developer account

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Microsoft Graph API
MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret_here
MICROSOFT_TENANT_ID=your_microsoft_tenant_id_here

# QuickBooks Integration
QUICKBOOKS_CLIENT_ID=your_quickbooks_client_id_here
QUICKBOOKS_CLIENT_SECRET=your_quickbooks_client_secret_here
QUICKBOOKS_SANDBOX_BASE_URL=https://sandbox-quickbooks.api.intuit.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

1. Create a new Supabase project
2. Run the schema from `supabase/schema.sql` in your Supabase SQL editor
3. Configure Row Level Security policies (included in schema)

### Authentication Setup

1. Create a Clerk application
2. Configure Microsoft Entra ID as an OAuth provider in Clerk
3. Add your domain to Clerk's allowed origins

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main dashboard
│   ├── leads/            # Lead management
│   ├── opportunities/    # Opportunity management
│   ├── contacts/         # Contact management
│   ├── companies/        # Company management
│   ├── analytics/        # Analytics dashboard
│   ├── performance/      # CSTPV performance tracking
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── components/
│   ├── layout/           # Layout components
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── integrations/    # External service integrations
│   ├── services/        # Business logic services
│   ├── supabase/        # Database client setup
│   └── types/           # TypeScript type definitions
└── middleware.ts        # Clerk authentication middleware
```

## Development Roadmap

### Phase 1: MVP (Current - 3-6 months)
- ✅ Core application setup
- 🔄 Basic CRUD operations
- 📋 Microsoft Graph integration
- 📋 QuickBooks integration
- 📋 Lead scoring automation
- 📋 MEDDPICC qualification tracking

### Phase 2: v1.0 (6-12 months)
- Advanced Pipeline Configurability
- Full PEAK Process Integration
- AI-driven insights and scoring
- Integration Hub v1
- Learning Platform
- Enhanced Compliance

### Phase 3: Enterprise Scale (12-24 months)
- Hybrid Deployment Options
- Customer Success Module
- Advanced AI and Conversation Intelligence
- Territory & Quota Management
- Executive Command Center
- Integration Hub v2

## Contributing

This project is built using Cursor + Claude for rapid development and iteration. Please follow the established patterns for PEAK methodology and MEDDPICC qualification tracking.

## License

Proprietary - FulQrun Sales Operations Platform