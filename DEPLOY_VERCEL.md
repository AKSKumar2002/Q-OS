# 🚀 Deploy Q-OS to Vercel

This guide will help you deploy your Q-OS (ProzillaOS) project to Vercel.

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Git Repository** - Push your code to GitHub/GitLab/Bitbucket
3. **Vercel CLI** (Optional) - For command-line deployment

---

## 🌐 Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit for Vercel deployment"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/Q-OS.git

# Push to GitHub
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your Git repository
4. Configure the project:

   **Framework Preset:** Other (or Vite)
   
   **Root Directory:** `./` (leave as root)
   
   **Build Command:**
   ```bash
   pnpm build
   ```
   
   **Output Directory:**
   ```
   demo/dist
   ```
   
   **Install Command:**
   ```bash
   pnpm install
   ```

### Step 3: Environment Variables (if needed)

If your project uses environment variables:
- Click **"Environment Variables"**
- Add any required variables (e.g., API keys)

### Step 4: Deploy! 🎉

1. Click **"Deploy"**
2. Wait 2-5 minutes for the build to complete
3. Your site will be live at: `https://your-project.vercel.app`

---

## 💻 Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Command Line

```bash
# Navigate to project root
cd c:\Users\2422967\OneDrive - Cognizant\Desktop\Cognizant\Q-OS

# Build packages first
pnpm run packages:build

# Deploy to Vercel
vercel
```

Follow the prompts:
- **Link to existing project?** → No (first time)
- **Project name** → q-os (or your preferred name)
- **Which scope?** → Your Vercel account
- **Link directory?** → Yes

### Step 4: Deploy to Production

```bash
# Deploy to production
vercel --prod
```

---

## ⚙️ Configuration Files Created

The following files have been created for you:

1. **`vercel.json`** - Main Vercel configuration
2. **`.vercelignore`** - Files to ignore during deployment

---

## 🔧 Build Settings Explanation

**Build Command:**
```bash
pnpm build
```
This runs the root-level build script which:
1. Builds all packages in sequence (`packages:build`)
2. Then builds the demo application
3. Outputs to `demo/dist`

**Output Directory:**
```
demo/dist
```
This is where Vercel will serve your static files from.

**Rewrites:**
The `vercel.json` includes SPA (Single Page Application) routing support, so all routes redirect to `index.html` for client-side routing.

---

## 🐛 Troubleshooting

### esbuild Errors on Vercel

**Issue:** Build fails with esbuild errors on Node.js v24

**Error:**
```
Error: Command "pnpm build" exited with 1
at /vercel/path0/node_modules/esbuild/lib/main.js:945:25
```

**Solution:** ✅ **FIXED** - The project now specifies Node.js 20 LTS in:
- `package.json` → `"engines": { "node": ">=18.12.0 <21" }`
- `vercel.json` → `NODE_VERSION=20`
- `.nvmrc` → `20`

Vercel will automatically use Node.js 20 instead of the experimental v24.

### Build Fails on Vercel

**Issue:** ESLint errors during build

**Solution:** The ESLint checker is already disabled in `vite.config.ts`. If you still face issues, ensure:
```json
// In vercel.json, you can set:
"ignoreCommand": "git diff --quiet HEAD^ HEAD ./"
```

### Build Takes Too Long

**Issue:** Build exceeds Vercel's free tier limits

**Solution:** 
- Use `.vercelignore` to exclude unnecessary files
- Consider building packages locally and committing `dist` folders (not recommended for production)

### Package Installation Fails

**Issue:** pnpm installation issues

**Solution:** Ensure `package.json` has:
```json
"packageManager": "pnpm@9.5.0"
```
Vercel will automatically use pnpm when it detects `pnpm-lock.yaml`.

---

## 🎯 Custom Domain (Optional)

1. Go to your project on Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `qos.yoursite.com`)
4. Follow DNS configuration instructions

---

## 📊 Monitoring & Analytics

Vercel provides built-in analytics:
- **Performance Metrics** - Core Web Vitals
- **Build Logs** - Debug deployment issues
- **Deployment History** - Rollback to previous versions

---

## 🔄 Automatic Deployments

Once connected to Git:
- **Every push to main** → Production deployment
- **Pull requests** → Preview deployments
- **Other branches** → Preview deployments

---

## 📝 Quick Reference

```bash
# Local build test
pnpm run packages:build
pnpm run demo:build

# Preview build locally
pnpm run demo:preview

# Deploy with Vercel CLI
vercel          # Preview deployment
vercel --prod   # Production deployment

# Check deployment logs
vercel logs <deployment-url>
```

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All routes work (test navigation)
- [ ] Assets load properly (images, fonts, etc.)
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Custom domain configured (if applicable)

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vite Deployment Guide:** https://vitejs.dev/guide/static-deploy.html
- **ProzillaOS Docs:** https://os.prozilla.dev/docs

---

## 🎉 That's it!

Your Q-OS should now be deployed to Vercel. The deployment URL will be:
```
https://your-project-name.vercel.app
```

Happy deploying! 🚀
