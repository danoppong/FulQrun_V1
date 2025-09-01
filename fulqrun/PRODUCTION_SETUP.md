# 🚀 FulQrun Production Setup Guide

## 🎯 **You're on the Production Branch**

This branch requires **real credentials** and will **not work in demo mode**. 

### ⚠️ **Important**: Demo vs Production Separation

- **Demo Branch**: `demo` - Works without credentials, shows demo data
- **Production Branch**: `production` - Requires real credentials, shows real data
- **Main Branch**: `main` - Hybrid mode with fallbacks

## 🔧 **Step 1: Set Up Supabase Database**

### **Create Supabase Project**
1. Go to https://supabase.com
2. Click **"New Project"**
3. Choose organization and project name: `fulqrun-production`
4. Set a strong database password
5. Choose region closest to your users
6. Wait for project creation (~2 minutes)

### **Apply Database Schema**
1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New Query"**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **"Run"** to create all tables and policies
5. Verify tables were created in **Table Editor**

### **Get API Keys**
1. Go to **Settings > API**
2. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: `eyJ...` (long string)
   - **service_role key**: `eyJ...` (different long string)

## 🔐 **Step 2: Set Up Clerk Authentication**

### **Create Clerk Application**
1. Go to https://clerk.com
2. Click **"Add Application"**
3. Application name: `FulQrun Production`
4. Choose authentication methods (Email + any social providers)

### **Configure Redirect URLs**
1. Go to **Configure > Paths**
2. Set these URLs (replace with your actual domain):
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`
   - **After sign-in**: `/dashboard`
   - **After sign-up**: `/onboarding`

### **Get API Keys**
1. Go to **Configure > API Keys**
2. Copy these values:
   - **Publishable Key**: `pk_live_...`
   - **Secret Key**: `sk_live_...`

## 🚀 **Step 3: Deploy Production Instance**

### **Option A: Deploy New Production Instance**

1. **Go to Vercel**: https://vercel.com/new
2. **Import Repository**: `https://github.com/danoppong/FulQrun_V1`
3. **Configure Project**:
   - **Project Name**: `fulqrun-production`
   - **Branch**: `production` (important!)
   - **Root Directory**: `fulqrun`
4. **Set Environment Variables**:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_actual_key
   CLERK_SECRET_KEY=sk_live_your_actual_secret
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```
5. **Deploy**

### **Option B: Update Existing Instance**

1. **Go to your existing Vercel project**
2. **Settings > Environment Variables**
3. **Add/Update** the production variables above
4. **Settings > Git**
5. **Change Production Branch** to `production`
6. **Trigger new deployment**

## ✅ **Step 4: Verify Production Setup**

After deployment:

1. **Access your production URL**
2. **Sign up** with a real email address
3. **Complete onboarding** - should create real organization
4. **Go to Settings > System Status** - should show all green
5. **Add leads/opportunities** - should persist to database
6. **Test authentication** - sign out and back in

## 🔍 **Troubleshooting**

### **If you see "Production Configuration Required":**
- Environment variables are not set correctly
- Check Vercel environment variables match the format above
- Ensure no placeholder text like "your_actual_key"

### **If you see "Database Connection Failed":**
- Supabase project may not be running
- Check NEXT_PUBLIC_SUPABASE_URL is correct
- Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is valid
- Ensure database schema was applied correctly
- Check Supabase project is not paused

### **If authentication doesn't work:**
- Verify Clerk keys are correct format (pk_live_ and sk_live_)
- Check redirect URLs match your production domain
- Ensure domain is added to Clerk allowed origins

## 🎯 **Production vs Demo**

### **Production Branch Features:**
- ✅ **Real user accounts** with Clerk authentication
- ✅ **Persistent database** with Supabase
- ✅ **Multi-tenant organizations** with real data
- ✅ **Full integration capabilities**
- ✅ **Production-grade security**

### **Demo Branch Features:**
- ✅ **No setup required** - works immediately
- ✅ **Demo data** for feature exploration
- ✅ **Perfect for presentations** and testing
- ✅ **All UI/UX features** without backend complexity

## 🎉 **Success!**

When properly configured, your production instance will show:
- **✅ Production Mode** banner (green)
- **Real user data** and authentication
- **Persistent storage** of all information
- **Full integration capabilities**
- **Enterprise-grade functionality**

**Your production FulQrun instance will be a fully functional, enterprise-ready sales operations platform!** 🚀