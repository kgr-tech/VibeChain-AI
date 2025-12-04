# Quick Start Script for Vibechain AI
# This script starts the development server

Write-Host "🚀 Starting Vibechain AI Development Server..." -ForegroundColor Cyan

# Check if Node.js is available
$nodePath = "C:\Program Files\nodejs\node.exe"
$npmPath = "C:\Program Files\nodejs\npm.cmd"

if (Test-Path $nodePath) {
    Write-Host "✅ Node.js found at: $nodePath" -ForegroundColor Green
    
    # Start the development server
    Write-Host "🔧 Starting Next.js development server..." -ForegroundColor Yellow
    & $npmPath run dev
}
else {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "📥 Download from: https://nodejs.org" -ForegroundColor Yellow
    
    # Try to find Node.js in other common locations
    Write-Host "`n🔍 Searching for Node.js..." -ForegroundColor Yellow
    
    $possiblePaths = @(
        "C:\Program Files\nodejs\node.exe",
        "C:\Program Files (x86)\nodejs\node.exe",
        "$env:LOCALAPPDATA\Programs\nodejs\node.exe",
        "$env:ProgramFiles\nodejs\node.exe"
    )
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            Write-Host "✅ Found Node.js at: $path" -ForegroundColor Green
            $npmPath = Join-Path (Split-Path $path) "npm.cmd"
            & $npmPath run dev
            exit
        }
    }
    
    Write-Host "❌ Could not find Node.js installation" -ForegroundColor Red
}
