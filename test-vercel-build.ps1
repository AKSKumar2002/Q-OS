# Test Vercel Build Locally
# This simulates what Vercel will do during deployment

Write-Host "🧪 Testing Vercel Build Process..." -ForegroundColor Cyan
Write-Host "This simulates what Vercel does during deployment`n" -ForegroundColor Yellow

# Step 1: Clean previous builds
Write-Host "1️⃣ Cleaning previous builds..." -ForegroundColor Cyan
if (Test-Path "demo\dist") {
    Remove-Item -Recurse -Force "demo\dist"
    Write-Host "   ✓ Cleaned demo/dist" -ForegroundColor Green
}

# Step 2: Install dependencies (if needed)
Write-Host "`n2️⃣ Installing dependencies..." -ForegroundColor Cyan
pnpm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ✗ Installation failed!" -ForegroundColor Red
    exit 1
}

# Step 3: Run the build command (same as Vercel)
Write-Host "`n3️⃣ Running build command: pnpm build" -ForegroundColor Cyan
$buildStart = Get-Date
pnpm build
$buildEnd = Get-Date
$buildTime = ($buildEnd - $buildStart).TotalSeconds

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Build SUCCESS!" -ForegroundColor Green
    Write-Host "   Build time: $([math]::Round($buildTime, 2)) seconds" -ForegroundColor Yellow
    Write-Host "`n📦 Output directory: demo/dist" -ForegroundColor Cyan
    
    # Check if output exists
    if (Test-Path "demo\dist\index.html") {
        Write-Host "   ✓ index.html found" -ForegroundColor Green
        $distSize = (Get-ChildItem -Path "demo\dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
        Write-Host "   Total size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Yellow
    } else {
        Write-Host "   ✗ index.html NOT found!" -ForegroundColor Red
    }
    
    Write-Host "`n🎉 Your build is ready for Vercel deployment!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "  1. Push to GitHub: git push origin main" -ForegroundColor White
    Write-Host "  2. Deploy: vercel --prod" -ForegroundColor White
    Write-Host "  OR visit: https://vercel.com/new`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Build FAILED!" -ForegroundColor Red
    Write-Host "Check the error messages above for details.`n" -ForegroundColor Yellow
    exit 1
}
