# Node.js Setup Guide

## 🚀 Quick Steps to Get Running

### 1. Install Node.js (5 minutes)

The download page should have opened in your browser. If not, go to:
**https://nodejs.org/en/download**

**Download**: Node.js LTS (Long Term Support) - Windows Installer (.msi)
**Version**: 20.x or newer (recommended)

### 2. Run the Installer

1. Double-click the downloaded `.msi` file
2. Click "Next" through the installation wizard
3. **Important**: Check "Automatically install necessary tools"
4. Complete the installation
5. **Restart PowerShell** (close and reopen)

### 3. Verify Installation

Open a NEW PowerShell window and run:
```powershell
node --version
npm --version
```

You should see version numbers like:
```
v20.11.0
10.2.4
```

### 4. Install Project Dependencies

```powershell
cd "d:\Vibechain AI"
npm install
```

This will install all the packages (takes 2-5 minutes)

### 5. Start Development Server

```powershell
npm run dev
```

### 6. Open Browser

Navigate to: **http://localhost:3000**

You'll see the complete Vibechain AI app with:
- ✅ Landing page
- ✅ Dual blockchain support
- ✅ AI chatbot
- ✅ Wallet integration
- ✅ Payment processor
- ✅ All features working!

---

## 🎯 Summary

1. Install Node.js from the download page
2. Restart PowerShell
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

**That's it!** 🎉

---

## 🐛 Troubleshooting

### "npm not recognized"
- Make sure you restarted PowerShell after installing Node.js
- Check if Node.js is in PATH: `$env:Path -split ';' | Select-String nodejs`

### Installation errors
- Run PowerShell as Administrator
- Clear npm cache: `npm cache clean --force`
- Try again: `npm install`

### Port 3000 already in use
- Use a different port: `npm run dev -- -p 3001`
- Open http://localhost:3001

---

## ✨ What Happens Next

Once `npm run dev` starts, you'll see:

```
- ready started server on 0.0.0.0:3000
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000
```

The app will be LIVE and you can:
- Test all features
- Connect wallets
- Send payments
- Use the AI chatbot
- See everything in action!

**Your complete DApp is ready to run!** 🚀
