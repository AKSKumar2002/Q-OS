# Quick Vercel Deployment Script
# Run this after pushing your code to GitHub

# Step 1: Install Vercel CLI (run once)
Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Cyan
npm install -g vercel

# Step 2: Login to Vercel
Write-Host "`n🔐 Logging in to Vercel..." -ForegroundColor Cyan
vercel login

# Step 3: Build packages
Write-Host "`n🔨 Building packages..." -ForegroundColor Cyan
pnpm run packages:build

# Step 4: Deploy to Vercel (preview)
Write-Host "`n🚀 Deploying to Vercel..." -ForegroundColor Cyan
vercel

Write-Host "`n✅ Preview deployment complete!" -ForegroundColor Green
Write-Host "`nTo deploy to production, run: vercel --prod" -ForegroundColor Yellow
