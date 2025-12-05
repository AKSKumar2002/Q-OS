# 🔧 Fix Node.js Version Mismatch

## ⚠️ Current Issue

**Warning:** `Unsupported engine: wanted: {"node":"20.x"} (current: {"node":"v24.11.1","pnpm":"9.5.0"})`

**What this means:**
- Your system has Node.js v24.11.1 (experimental)
- This project requires Node.js 20.x (stable LTS)
- Node.js 24 may cause build failures with esbuild/Vite

---

## ✅ Solution: Switch to Node.js 20

### NVM for Windows is Now Installed! 🎉

I've just installed NVM for Windows. Now you need to complete the setup:

---

## 📋 Step-by-Step Instructions

### Step 1: Restart Your Terminal

**IMPORTANT:** Close and reopen PowerShell or your terminal for NVM to be available.

### Step 2: Install Node.js 20

Open a **new PowerShell window** and run:

```powershell
# Install Node.js 20 LTS
nvm install 20

# Use Node.js 20 for current session
nvm use 20

# Verify the version
node --version
# Should show: v20.x.x
```

### Step 3: Set Node.js 20 as Default (Optional)

To make Node 20 the default for all new terminal sessions:

```powershell
nvm alias default 20
```

Or on Windows, you can set it with:

```powershell
nvm use 20
```

(NVM for Windows remembers the last used version)

### Step 4: Return to Q-OS Project

```powershell
cd "c:\Users\aksne\Desktop\Github Projects\Q-OS"

# The project will now use Node 20 automatically
node --version  # Should be v20.x.x

# Install dependencies
pnpm install

# Build packages
pnpm run packages:build

# Start dev server
pnpm start
```

---

## 🔄 Alternative: Using .nvmrc File

The project has a `.nvmrc` file that specifies Node 20. With NVM installed, you can:

```powershell
# Navigate to project
cd "c:\Users\aksne\Desktop\Github Projects\Q-OS"

# Use the version from .nvmrc
nvm install  # Reads from .nvmrc
nvm use      # Switches to version in .nvmrc
```

---

## 🚫 Alternative Option: Manually Install Node.js 20

If NVM doesn't work for any reason, you can manually download Node.js 20:

1. **Download:** https://nodejs.org/en/download/
2. Select **"20.x.x LTS"** (Long Term Support)
3. Run the installer
4. Restart your terminal
5. Verify: `node --version` should show v20.x.x

---

## 🧪 Verify Everything Works

After switching to Node 20, verify:

```powershell
# Check Node version
node --version
# Expected: v20.x.x

# Check npm version
npm --version
# Expected: v10.x.x

# Check pnpm (should still work)
pnpm --version
# Expected: 9.5.0

# Test build
pnpm run packages:build
# Should complete without warnings
```

---

## 📊 Node.js Version Comparison

| Version | Status | Compatibility | Use Case |
|---------|--------|---------------|----------|
| **Node 18 LTS** | ✅ Stable | ✅ Full | Supported until 2025 |
| **Node 20 LTS** | ✅ Stable | ✅ Full | **Recommended** (until 2026) |
| **Node 22** | ⚠️ Current | ⚠️ Mostly | Early adoption |
| **Node 24** | ❌ Experimental | ❌ Limited | **Not recommended** |

---

## 🎯 Quick Reference Commands

### NVM Commands (Windows)

```powershell
# List installed versions
nvm list

# List available Node.js versions
nvm list available

# Install a specific version
nvm install 20.11.0

# Use a specific version
nvm use 20.11.0

# Uninstall a version
nvm uninstall 24.11.1
```

---

## ✅ Expected Outcome

After switching to Node 20:

- ✅ No more "Unsupported engine" warnings
- ✅ Build tools (esbuild, Vite) work perfectly
- ✅ Vercel deployment will match local environment
- ✅ Same Node version as production

---

## 🐛 Troubleshooting

### "nvm: command not found"

**Solution:** Restart your terminal completely. NVM requires a new shell session.

### "Access denied" when installing Node

**Solution:** Run PowerShell as Administrator:
```powershell
# Right-click PowerShell → "Run as Administrator"
nvm install 20
```

### pnpm stops working after switching Node version

**Solution:** Reinstall pnpm globally:
```powershell
npm install -g pnpm@9.5.0
```

### Still seeing Node 24 after switching

**Solution:** Close ALL terminal windows and open a fresh one.

---

## 🎉 Next Steps

Once Node 20 is active:

1. ✅ Rebuild packages: `pnpm run packages:build`
2. ✅ Test locally: `pnpm start`
3. ✅ Deploy to Vercel (which also uses Node 20)

---

## 💡 Why Node 20?

- **LTS (Long Term Support):** Supported until April 2026
- **Stable:** All build tools are tested with it
- **Vercel Default:** Matches your production environment
- **Performance:** Faster than Node 18, more stable than Node 22+

---

**Ready?** Close this terminal, open a new one, and run `nvm use 20`! 🚀
