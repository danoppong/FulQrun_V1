# 🚀 FulQrun Production Deployment Guide

## Overview

This guide will help you deploy a fully functional version of FulQrun with real authentication, database integration, and all production features.

## 📋 Prerequisites

Before deploying, you'll need accounts and API keys for:

1. **Clerk** (Authentication) - https://clerk.com
2. **Supabase** (Database) - https://supabase.com
3. **Vercel** (Hosting) - https://vercel.com
4. **Microsoft Azure** (Optional - for Graph API)
5. **QuickBooks Developer** (Optional - for invoicing)

## 🔧 Step-by-Step Setup

### Step 1: Set Up Supabase Database

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Note your project URL and anon key

2. **Run Database Schema**
   - Go to SQL Editor in Supabase
   - Copy and run the schema from `supabase/schema.sql`
   - This creates all tables and Row Level Security policies

3. **Configure Authentication**
   - Go to Authentication > Settings
   - Enable email authentication
   - Configure any additional providers you want

### Step 2: Set Up Clerk Authentication

1. **Create Clerk Application**
   - Go to https://clerk.com
   - Create new application
   - Choose "Email" and any social providers you want

2. **Configure Microsoft Entra ID (Optional)**
   - Go to Configure > SSO Connections
   - Add Microsoft as a provider
   - Enter your Azure AD app credentials

3. **Set Redirect URLs**
   - Add your production domain to allowed origins
   - Set redirect URLs:
     - Sign-in: `https://yourdomain.com/sign-in`
     - Sign-up: `https://yourdomain.com/sign-up`
     - After sign-in: `https://yourdomain.com/dashboard`
     - After sign-up: `https://yourdomain.com/onboarding`

### Step 3: Deploy to Vercel

1. **Connect Repository**
   - Go to https://vercel.com/new
   - Import: `https://github.com/danoppong/FulQrun_V1`
   - Project name: `fulqrun-production` (or your preferred name)
   - **Root Directory**: `fulqrun`

2. **Configure Environment Variables**
   Copy from `.env.production` and set in Vercel:

   **Required Variables:**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

   **Optional Variables:**
   ```
   MICROSOFT_CLIENT_ID=...
   MICROSOFT_CLIENT_SECRET=...
   MICROSOFT_TENANT_ID=...
   QUICKBOOKS_CLIENT_ID=...
   QUICKBOOKS_CLIENT_SECRET=...
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Get your production URL

### Step 4: Configure Clerk for Production

1. **Update Clerk Settings**
   - Add your production domain to allowed origins
   - Update redirect URLs with your production domain
   - Test authentication flow

2. **Set Up Webhooks (Optional)**
   - Configure user creation webhooks
   - Sync user data between Clerk and Supabase

## 🎯 Production Features

Your fully functional FulQrun deployment will include:

### ✅ **Authentication & Security**
- **Real user authentication** with Clerk
- **Microsoft Entra ID SSO** integration
- **Role-based access control** (rep/manager/admin)
- **Secure API routes** with authentication middleware

### ✅ **Database Integration**
- **Real data persistence** with Supabase
- **Multi-tenant architecture** with Row Level Security
- **Real-time updates** and synchronization
- **Data backup** and recovery

### ✅ **User Onboarding**
- **New user onboarding flow** for organization setup
- **Automatic user profile creation**
- **Default pipeline stages** and scoring rules
- **Organization configuration**

### ✅ **Full CRM Functionality**
- **Real lead management** with database persistence
- **Opportunity tracking** with MEDDPICC qualification
- **Contact and company management**
- **Activity logging** and timeline

### ✅ **Advanced Features**
- **Real-time lead scoring** with configurable rules
- **MEDDPICC qualification tracking**
- **Performance analytics** and reporting
- **Global search** across all data
- **User profile management**
- **Organization settings**

### ✅ **Integration Ready**
- **Microsoft Graph API** integration framework
- **QuickBooks API** integration framework
- **Webhook endpoints** for external integrations
- **API documentation** for custom integrations

## 🔒 Security Features

- **Row Level Security** in Supabase
- **Authentication middleware** on all protected routes
- **Environment variable protection**
- **CORS configuration**
- **Rate limiting** on API endpoints

## 📊 Monitoring & Analytics

- **Vercel Analytics** integration
- **Error tracking** with comprehensive logging
- **Performance monitoring**
- **User activity tracking**

## 🚀 Post-Deployment

After successful deployment:

1. **Test Authentication**
   - Sign up with a test account
   - Complete onboarding flow
   - Verify dashboard access

2. **Test Core Features**
   - Add leads and opportunities
   - Test MEDDPICC qualification
   - Verify data persistence
   - Check analytics and reporting

3. **Configure Integrations**
   - Set up Microsoft Graph (if needed)
   - Configure QuickBooks (if needed)
   - Test integration endpoints

4. **User Training**
   - Share production URL with team
   - Provide onboarding instructions
   - Train users on PEAK + MEDDPICC methodology

## 🆘 Troubleshooting

**Authentication Issues:**
- Verify Clerk keys are correct
- Check redirect URLs match your domain
- Ensure Supabase RLS policies are active

**Database Issues:**
- Verify Supabase connection
- Check if schema was applied correctly
- Review RLS policies for user access

**Build Issues:**
- Check environment variables are set
- Verify root directory is `fulqrun`
- Review build logs for specific errors

## 📞 Support Resources

- **Clerk Documentation**: https://clerk.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs

## 🎯 Success Checklist

- [ ] Supabase database created and schema applied
- [ ] Clerk authentication configured
- [ ] Environment variables set in Vercel
- [ ] Application deployed successfully
- [ ] Authentication flow working
- [ ] Onboarding process functional
- [ ] Data persistence working
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Performance optimized

Your production FulQrun deployment will be a fully functional sales operations platform ready for real business use!