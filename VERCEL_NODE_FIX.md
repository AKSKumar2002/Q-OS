# 🚨 CRITICAL FIX: Vercel Node.js Version Override

## Problem
Vercel is using Node.js v24.11.1 even though we specified Node 20 in:
- `.nvmrc`
- `package.json` engines

## Solution: Set Node Version in Vercel Dashboard

### Step 1: Go to Your Vercel Project Settings

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add This Environment Variable

**Name:** `NODE_VERSION`
**Value:** `20`
**Environment:** Select **All** (Production, Preview, Development)

Click **Save**

### Step 3: Redeploy

After adding the environment variable:
- Go to **Deployments**
- Click on the latest deployment
- Click **Redeploy**

OR just push a new commit:
```bash
git commit --allow-empty -m "Force redeploy with Node 20"
git push
```

---

## Alternative: Set in Vercel CLI

If using Vercel CLI, you can set it with:

```bash
vercel env add NODE_VERSION
# When prompted, enter: 20
# Select: Production, Preview, Development (all)
```

---

##  Why This Is Needed

Vercel sometimes ignores `.nvmrc` and uses the latest Node version (24.x).
Setting `NODE_VERSION` environment variable **forces** Vercel to use Node 20.

---

## Verification

After redeployment, check the build logs:
- Should see: `Detected Node.js version: 20.x.x` ✅
- Should NOT see: `Node.js v24.11.1` ❌

---

## Complete Build Command (Updated)

Your `vercel.json` now has:
```json
{
  "buildCommand": "pnpm run packages:build && pnpm run demo:build"
}
```

This ensures:
1. All workspace packages are built first
2. Then the demo is built
3. Using Node.js 20 (via environment variable)

---

## Files Updated

1. `.nvmrc` → `20.x`
2. `package.json` → `"engines": { "node": "20.x" }`
3. `vercel.json` → Updated build command

---

## Next Steps

1. ✅ Add `NODE_VERSION=20` in Vercel Dashboard
2. ✅ Commit changes
3. ✅ Push to GitHub
4. ✅ Redeploy

---

**This WILL fix the Node.js 24 issue!** 🎯
