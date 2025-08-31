# 🚀 Quick Deploy FulQrun - Get Your Preview URL

## Instant Deployment Options

### Option 1: Vercel (Fastest - 2 minutes)

**Step 1:** Go to https://vercel.com/new

**Step 2:** Import your GitHub repository:
```
https://github.com/danoppong/FulQrun_V1
```

**Step 3:** Configure project:
- **Project Name**: `fulqrun-sales-platform`
- **Framework**: Next.js (auto-detected)
- **Root Directory**: `fulqrun`

**Step 4:** Add Environment Variables (Optional for demo):
```
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
```

**Step 5:** Click "Deploy"

**Result:** You'll get a URL like:
- `https://fulqrun-sales-platform.vercel.app`
- `https://ful-qrun-v1-username.vercel.app`

### Option 2: Netlify

**Step 1:** Go to https://app.netlify.com/start

**Step 2:** Connect to GitHub and select:
```
danoppong/FulQrun_V1
```

**Step 3:** Build settings:
- **Base directory**: `fulqrun`
- **Build command**: `npm run build`
- **Publish directory**: `fulqrun/.next`

**Step 4:** Deploy

### Option 3: Railway

**Step 1:** Go to https://railway.app

**Step 2:** "Deploy from GitHub repo"

**Step 3:** Select: `danoppong/FulQrun_V1`

**Step 4:** Set root directory: `fulqrun`

**Step 5:** Deploy

## 🎯 What You'll See

Once deployed successfully, you can access:

### **Homepage** (`/`)
- Professional landing page
- "View Live Demo" button
- Feature overview

### **Demo Dashboard** (`/demo-dashboard`)
- Complete sales operations interface
- Interactive features with demo data
- All functionality enabled

### **Full Application Pages**
- `/leads` - Lead management with scoring
- `/opportunities` - MEDDPICC qualification
- `/contacts` - Contact management
- `/companies` - Account tracking
- `/analytics` - Performance insights
- `/performance` - CSTPV metrics
- `/profile` - User profile
- `/settings` - Organization config

## 🔧 Troubleshooting

**If you get 404 errors:**

1. **Check build logs** in your deployment platform
2. **Verify the root directory** is set to `fulqrun`
3. **Ensure build command** is `npm run build`
4. **Try redeploying** after fixing any issues

**Common fixes:**
- Set root directory to `fulqrun` (not root)
- Use `npm run build` as build command
- Set publish directory to `fulqrun/.next` (for Netlify)

## 🎉 Expected Result

You should get a working URL that shows the complete FulQrun sales operations platform with:
- ✅ Interactive UI
- ✅ Demo data
- ✅ All features functional
- ✅ Mobile responsive
- ✅ Professional design

**The app is ready for immediate preview and demonstration!**