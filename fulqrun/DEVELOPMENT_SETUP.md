# 🚀 FulQrun Development Setup Guide

## Quick Start for Local Development

### 1. Create Environment File

Create a `.env.local` file in the `fulqrun` directory with the following content:

```bash
# FulQrun Development Environment Configuration

# ===========================================
# CLERK AUTHENTICATION (Required)
# ===========================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# ===========================================
# SUPABASE DATABASE (Required)
# ===========================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ===========================================
# ANTHROPIC CLAUDE AI (Optional)
# ===========================================
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# ===========================================
# MICROSOFT GRAPH INTEGRATION (Optional)
# ===========================================
MICROSOFT_CLIENT_ID=your_microsoft_client_id_here
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret_here
MICROSOFT_TENANT_ID=your_microsoft_tenant_id_here

# ===========================================
# QUICKBOOKS INTEGRATION (Optional)
# ===========================================
QUICKBOOKS_CLIENT_ID=your_quickbooks_client_id_here
QUICKBOOKS_CLIENT_SECRET=your_quickbooks_client_secret_here
QUICKBOOKS_REDIRECT_URI=http://localhost:3000/api/integrations/quickbooks/callback
```

### 2. Set Up Required Services

#### A. Clerk Authentication (Required)
1. Go to [https://clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key
4. Update your `.env.local` file

#### B. Supabase Database (Required)
1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API to get your URL and keys
4. Go to SQL Editor and run the schema from `supabase/schema.sql`
5. Update your `.env.local` file

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Optional Integrations

#### Claude AI (for advanced insights)
1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Add to your `.env.local` file

#### Microsoft Graph (for email/calendar sync)
1. Go to Azure Portal > App Registrations
2. Create a new registration
3. Add Microsoft Graph API permissions
4. Generate client secret
5. Add credentials to `.env.local`

#### QuickBooks (for invoicing)
1. Create QuickBooks developer account
2. Register your app
3. Add credentials to `.env.local`

## 🎯 Development Modes

### Demo Mode (No Setup Required)
- Use the `demo` branch for immediate access
- No authentication or database setup needed
- Perfect for exploring features

### Development Mode (Full Setup)
- Requires Clerk + Supabase setup
- Full functionality with real data
- All integrations available

### Production Mode
- Deploy to Vercel, Netlify, or Railway
- Configure production environment variables
- Enterprise-ready deployment

## 🚀 Available Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📊 Features Available

### ✅ Phase 1: MVP Complete
- Core CRM functionality
- PEAK + MEDDPICC methodology
- Basic analytics and dashboards
- Microsoft/QuickBooks integration stubs

### ✅ Phase 2: v1.0 Complete
- Advanced pipeline builder
- AI-driven insights
- Integration Hub v1
- Learning platform
- Enhanced analytics

### ✅ Phase 3: Enterprise Complete
- Customer success management
- Territory and quota management
- Executive command center
- Advanced AI and conversation intelligence
- Gamification and team excellence

## 🎯 Next Steps

1. **Set up environment variables** (Clerk + Supabase minimum)
2. **Start development server** with `npm run dev`
3. **Explore the application** at `http://localhost:3000`
4. **Add optional integrations** as needed
5. **Deploy to production** when ready

## 🆘 Troubleshooting

### Common Issues
- **Authentication errors**: Check Clerk configuration
- **Database connection**: Verify Supabase credentials
- **Build errors**: Run `npm run type-check`
- **Integration issues**: Check API credentials

### Support
- Check application logs in browser console
- Verify environment variables are set correctly
- Ensure all required services are configured

## 🎉 Ready to Go!

FulQrun is a complete enterprise-grade sales operations platform. Start with the minimum setup (Clerk + Supabase) and add integrations as needed for your development workflow.
