# FulQrun Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/danoppong/FulQrun_V1&project-name=fulqrun-sales-platform&repository-name=FulQrun_V1)

### Option 2: Manual Deployment

1. **Fork the Repository**
   - Go to https://github.com/danoppong/FulQrun_V1
   - Click "Fork" to create your own copy

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your forked repository
   - Configure environment variables (see below)
   - Click "Deploy"

3. **Set Environment Variables**
   Copy the variables from `.env.example` and set them in Vercel:
   
   **Required for Basic Functionality:**
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_demo_key
   CLERK_SECRET_KEY=sk_test_demo_key
   ```
   
   **For Demo/Preview (Optional):**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=demo_key
   ```

## 🌐 Alternative Deployment Options

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables

### Railway
1. Connect GitHub repository to Railway
2. Railway will auto-detect Next.js
3. Add environment variables
4. Deploy

### DigitalOcean App Platform
1. Create new app from GitHub repository
2. Select Node.js environment
3. Set build command: `npm run build`
4. Set run command: `npm start`

## 🔧 Environment Configuration

### For Demo/Preview Mode
Set these minimal environment variables:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_demo
CLERK_SECRET_KEY=sk_test_demo
NEXT_PUBLIC_APP_URL=https://your-app-url.vercel.app
```

### For Production
Follow the complete setup in SETUP.md with real:
- Clerk authentication keys
- Supabase database credentials
- Microsoft Graph API credentials
- QuickBooks API credentials

## 📱 Preview Features

The deployed app will showcase:
- ✅ Complete UI/UX with all pages
- ✅ Interactive forms and modals
- ✅ Real-time lead scoring
- ✅ MEDDPICC qualification tracking
- ✅ Global search functionality
- ✅ Activity timeline
- ✅ Role-based dashboards
- ✅ Settings and profile management

## 🎯 Demo Data

The application includes comprehensive mock data for:
- Sample leads with various scores
- Opportunities with MEDDPICC tracking
- Contacts with role identification
- Companies with relationship data
- Activities and timeline events
- Performance metrics and analytics

This allows full exploration of all features without requiring database setup.

## 🔗 Post-Deployment

After deployment, you'll receive a URL like:
`https://fulqrun-sales-platform.vercel.app`

You can immediately:
1. Explore all application features
2. Test the user interface
3. Experience the sales workflow
4. Evaluate the PEAK + MEDDPICC methodology
5. Review analytics and reporting capabilities

## 🆘 Troubleshooting

**Build Errors:**
- Ensure all environment variables are set
- Check that the repository is public or properly connected

**Authentication Issues:**
- Verify Clerk keys are correctly formatted
- Check that redirect URLs match your domain

**Runtime Errors:**
- Review Vercel deployment logs
- Ensure all required environment variables are present

## 📞 Support

For deployment assistance:
1. Check Vercel documentation
2. Review the application README.md
3. Examine the SETUP.md guide
4. Check GitHub Issues for common problems