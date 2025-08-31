# FulQrun MVP Setup Guide

This guide will help you get the FulQrun MVP up and running with all the Phase 1 features.

## 🚀 Quick Start

### 1. Environment Setup

Copy the `.env.local` file and update with your actual credentials:

```bash
cp .env.local .env.local.example
# Edit .env.local with your actual values
```

### 2. Database Setup (Supabase)

1. Create a new Supabase project at https://supabase.com
2. Go to Settings > API to get your URL and anon key
3. Go to SQL Editor and run the schema from `supabase/schema.sql`
4. Update your `.env.local` with Supabase credentials

### 3. Authentication Setup (Clerk)

1. Create a Clerk application at https://clerk.com
2. Configure Microsoft Entra ID as an OAuth provider:
   - Go to Configure > SSO Connections
   - Add Microsoft as a provider
   - Enter your Azure AD app credentials
3. Update your `.env.local` with Clerk credentials

### 4. Microsoft Graph Integration

1. Register an app in Azure AD:
   - Go to Azure Portal > App Registrations
   - Create new registration
   - Add API permissions for Microsoft Graph
   - Generate client secret
2. Update your `.env.local` with Microsoft credentials

### 5. QuickBooks Integration

1. Create a QuickBooks developer account
2. Register your app for sandbox access
3. Update your `.env.local` with QuickBooks credentials

## 📊 Features Implemented

### ✅ Core Modules (Phase 1 MVP)

- **Authentication**: Clerk + Microsoft Entra ID SSO ready
- **Opportunity Management**: PEAK stages + MEDDPICC qualification fields
- **Lead Management**: Manual entry + basic scoring rules
- **Contact & Company Management**: Light CRM functionality
- **Basic Analytics**: Pipeline by stage, deal conversion rate
- **Microsoft Graph Integration**: Email/calendar sync (stubbed for MVP)
- **QuickBooks Integration**: Invoicing (stubbed for MVP)
- **Role-based Dashboards**: Rep, manager, admin views
- **Mobile-responsive PWA**: Progressive Web App configuration

### 🎯 PEAK Methodology Integration

The application implements the PEAK process across all modules:
- **Prospect**: Lead generation and initial qualification
- **Engage**: Detailed needs analysis and relationship building
- **Acquire**: Proposal development and deal closure
- **Keep**: Customer success and account expansion

### 📋 MEDDPICC Qualification Framework

Full MEDDPICC tracking in opportunities:
- **Metrics**: Quantifiable business impact
- **Economic Buyer**: Budget decision maker
- **Decision Criteria**: Evaluation criteria
- **Decision Process**: Decision workflow
- **Paper Process**: Legal/procurement
- **Identify Pain**: Business pain points
- **Champion**: Internal advocate
- **Competition**: Competitive analysis

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **TailwindCSS v4** for styling
- **shadcn/ui** for components
- **Lucide React** for icons

### Backend
- **Supabase** for database and real-time features
- **Row Level Security** for multi-tenant data isolation
- **Edge Functions** for serverless API endpoints

### Authentication
- **Clerk** for user management
- **Microsoft Entra ID** SSO integration
- **Role-based access control** (rep/manager/admin)

### Integrations
- **Microsoft Graph API** (email/calendar sync)
- **QuickBooks API** (invoicing and payments)
- **Lead scoring engine** (configurable rules)
- **MEDDPICC qualification service**

## 🚦 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type check
npm run type-check
```

## 📱 PWA Features

The application is configured as a Progressive Web App with:
- Offline capability
- Mobile-responsive design
- App-like experience on mobile devices
- Push notifications (ready for implementation)

## 🔐 Security

- Row Level Security policies in Supabase
- Clerk authentication with SSO
- Environment variable protection
- API route protection with authentication middleware

## 📈 Next Steps (Phase 2)

The MVP foundation is ready for Phase 2 expansion:

1. **Advanced Pipeline Builder**: Drag-and-drop workflow automation
2. **AI Integration**: Predictive scoring and insights
3. **Enhanced Integrations**: Slack, DocuSign, Gong/Chorus
4. **Learning Platform**: Embedded training and certifications
5. **Advanced Analytics**: Predictive analytics and forecasting

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### Environment Variables for Production

Make sure to set all environment variables in your deployment platform:
- Clerk authentication keys
- Supabase database credentials
- Microsoft Graph API credentials
- QuickBooks API credentials

The application is now ready for early adopter testing with 5-10 users per branch as specified in the Phase 1 goals.

## 🎯 Success Metrics for MVP

Track these KPIs to validate the core value proposition:
- User adoption rate
- Time to first value (lead entry to opportunity creation)
- MEDDPICC completion rates
- Pipeline velocity improvement
- User engagement with PEAK methodology

## 🆘 Troubleshooting

### Common Issues

1. **Clerk Authentication Errors**: Ensure your Clerk keys are correctly set
2. **Supabase Connection Issues**: Verify your Supabase URL and keys
3. **Build Errors**: Run `npm run type-check` to identify TypeScript issues
4. **Integration Issues**: Check API credentials and network connectivity

### Support

For technical issues with the FulQrun platform, check:
1. Application logs in Vercel dashboard
2. Supabase logs for database issues
3. Clerk dashboard for authentication issues
4. Browser console for frontend errors