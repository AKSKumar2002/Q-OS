---
description: Deploy Q-OS to Vercel via CLI
---

# Deploy Q-OS to Vercel

Follow these steps to deploy your Q-OS project to Vercel using the CLI.

## Prerequisites

1. Ensure PowerShell execution policy allows scripts (already done ✅)
2. Have a Vercel account at https://vercel.com

## Steps

// turbo-all

1. **Login to Vercel**
```powershell
npx vercel login
```
Follow the browser prompts to authenticate.

2. **Build packages locally (optional but recommended)**
```powershell
pnpm run packages:build
```
This ensures packages build correctly before deploying.

3. **Deploy to Vercel (Preview)**
```powershell
npx vercel
```
Answer the prompts:
- Set up and deploy "Q-OS"? → Y
- Which scope? → Select your account
- Link to existing project? → N
- What's your project's name? → q-os (or your preferred name)
- In which directory is your code located? → ./
- Want to override settings? → Y
  - Build Command: `pnpm -w run packages:build && pnpm -w run demo:build`
  - Output Directory: `dist`
  - Install Command: `pnpm install`

4. **Deploy to Production**
```powershell
npx vercel --prod
```

5. **Check Deployment Status**
```powershell
npx vercel ls
```

## Expected Output

After successful deployment, you'll get:
- ✅ Preview URL: `https://q-os-[hash].vercel.app`
- ✅ Production URL: `https://q-os.vercel.app` (or your custom domain)

## Troubleshooting

If build fails with Node.js errors:
- Vercel uses Node.js 20 (configured via `.nvmrc`)
- Check build logs: `npx vercel logs <deployment-url>`

If pnpm errors occur:
- Vercel auto-detects pnpm from `pnpm-lock.yaml`
- Ensure `"packageManager": "pnpm@9.5.0"` is in package.json (already set ✅)

## Post-Deployment

1. Test your deployment at the provided URL
2. Set up custom domain (optional) via Vercel Dashboard
3. Enable auto-deployments for GitHub pushes

---

**Note:** First deployment may take 3-5 minutes. Subsequent deployments are faster (~2-3 min).
