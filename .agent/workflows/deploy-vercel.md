---
description: How to deploy Q-OS to Vercel
---

# Deploying Q-OS to Vercel

This workflow guides you through deploying your Next.js Web-OS project to Vercel.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to GitHub
2. **Vercel Account**: Create a free account at [vercel.com](https://vercel.com)
3. **Clean Build**: Make sure the project builds successfully locally

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Verify Local Build
Before deploying, ensure your project builds successfully:

```bash
npm install
npm run build
```

If the build fails, fix all errors before proceeding to deployment.

### Step 2: Push to GitHub
Ensure all your latest changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

(Replace `main` with your branch name if different)

### Step 3: Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repository (you may need to authorize Vercel to access it)
4. Click **"Import"**

### Step 4: Configure Project Settings

Vercel should auto-detect this as a Next.js project. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` or `next build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`
- **Node.js Version**: 18.x or higher (recommended)

### Step 5: Environment Variables (if needed)

If you have any environment variables (API keys, etc.), add them in the "Environment Variables" section.

### Step 6: Deploy

Click **"Deploy"** and wait for the build to complete (usually 1-3 minutes).

### Step 7: Verify Deployment

Once deployed, Vercel will provide you with:
- A production URL (e.g., `https://your-project.vercel.app`)
- A deployment summary

Visit the URL to verify your deployment works correctly.

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

Follow the prompts to authenticate.

### Step 3: Deploy

In your project directory, run:

```bash
vercel
```

For production deployment:

```bash
vercel --prod
```

## Common Issues & Solutions

### Issue 1: 404 Error After Deployment

**Cause**: This often happens when Vercel can't find the built files or incorrect build settings.

**Solutions**:
1. Ensure `package.json` has the correct build script: `"build": "next build"`
2. Check that `.next` folder is not in `.gitignore` (it shouldn't be, but the build output should be)
3. Verify the "Output Directory" is set to `.next` in Vercel settings
4. Make sure you're using Next.js 13+ compatible routing

### Issue 2: Build Fails

**Solution**:
1. Check the build logs in Vercel dashboard
2. Fix any TypeScript/ESLint errors
3. Ensure all dependencies are in `package.json` (not just `devDependencies`)
4. Try increasing the Node.js version in Vercel settings

### Issue 3: Pages Not Found

**Solution**:
1. Verify your `pages` directory structure is correct
2. Check that all dynamic routes use proper Next.js conventions
3. Ensure `next.config.js` doesn't have conflicting settings

## Post-Deployment

### Configure Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain and follow DNS configuration instructions

### Enable Analytics

Vercel provides free analytics:
1. Go to **"Analytics"** tab in your project
2. Enable analytics to track page views and performance

### Set Up Automatic Deployments

By default, Vercel automatically deploys:
- **Production**: When you push to your main/master branch
- **Preview**: When you create a pull request

## Useful Commands

- `vercel` - Deploy to preview
- `vercel --prod` - Deploy to production
- `vercel ls` - List all deployments
- `vercel logs [deployment-url]` - View deployment logs
- `vercel remove [deployment-id]` - Remove a deployment

## Resources

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
