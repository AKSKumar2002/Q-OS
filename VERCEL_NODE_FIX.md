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
  "buildCommand": "pnpm -w run packages:build && pnpm -w run demo:build && cp -r demo/dist dist",
  "outputDirectory": "dist"
}
```

**Why `cp -r`?**
Vercel was failing to find the output directory. This command copies the build output to the root `dist` folder, which is where Vercel expects it by default.

---

## ⚠️ CRITICAL: Node Version Check

Your logs show:
`WARN Unsupported engine: wanted: {"node":"20.x"} (current: {"node":"v24.11.1"})`

This means **Vercel is STILL using Node 24**. You **MUST** set the environment variable in Vercel Dashboard to fix this.

1. Go to **Settings** → **Environment Variables**
2. Add `NODE_VERSION` = `20`
3. **Redeploy**

If you don't do this, the build will fail with esbuild errors later!

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
