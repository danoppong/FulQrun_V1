# 🚀 Quick Deploy Options for FulQrun Preview

## Instant Preview URLs

### Option 1: Vercel (Recommended)
1. Go to: https://vercel.com/new
2. Import: `https://github.com/danoppong/FulQrun_V1`
3. Click "Deploy"
4. Get instant URL like: `https://fulqrun-v1-xyz.vercel.app`

### Option 2: Netlify
1. Go to: https://app.netlify.com/start
2. Connect GitHub: `danoppong/FulQrun_V1`
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy

### Option 3: Railway
1. Go to: https://railway.app
2. "Deploy from GitHub repo"
3. Select: `danoppong/FulQrun_V1`
4. Auto-deploy

## 🎯 Demo Access

Once deployed, you can access:

- **Landing Page**: `/` - Main entry point
- **Live Demo**: `/demo` - No authentication required
- **Full App**: `/dashboard` - Complete functionality

## 🔧 Minimal Environment Variables

For basic preview, set these in your deployment platform:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=demo_key
CLERK_SECRET_KEY=demo_key
NEXT_PUBLIC_APP_URL=https://your-deployed-url.vercel.app
```

## 📱 What You'll See

- ✅ Complete UI/UX showcase
- ✅ Interactive forms and modals
- ✅ Real-time lead scoring demo
- ✅ MEDDPICC qualification interface
- ✅ Analytics and performance dashboards
- ✅ Global search functionality
- ✅ Activity timeline
- ✅ Settings and profile management

The app includes comprehensive mock data for full feature exploration!