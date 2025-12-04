# Install Dependencies Script for Vibechain AI
# This script locates Node.js and runs npm install

Write-Host "=== Vibechain AI - Dependency Installation ===" -ForegroundColor Cyan
Write-Host ""

# Function to test if Node.js works at a given path
function Test-NodePath {
    param([string]$Path)
    
    if (Test-Path "$Path\node.exe") {
        try {
            $version = & "$Path\node.exe" --version 2>$null
            if ($version) {
                return $true
            }
        } catch {
            return $false
        }
    }
    return $false
}

# Search for Node.js in common locations
$possiblePaths = @(
    "C:\Program Files\nodejs",
    "C:\Program Files (x86)\nodejs",
    "$env:LOCALAPPDATA\Programs\nodejs",
    "$env:APPDATA\npm",
    "$env:ProgramFiles\nodejs",
    "C:\nodejs"
)

Write-Host "Searching for Node.js installation..." -ForegroundColor Yellow

$nodePath = $null
foreach ($path in $possiblePaths) {
    if (Test-NodePath $path) {
        $nodePath = $path
        break
    }
}

if (-not $nodePath) {
    Write-Host ""
    Write-Host "ERROR: Node.js not found in common locations!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please try one of these solutions:" -ForegroundColor Yellow
    Write-Host "1. Close this terminal and open a NEW PowerShell window"
    Write-Host "2. Add Node.js to your PATH manually (see QUICKSTART.md)"
    Write-Host "3. Reinstall Node.js from https://nodejs.org"
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Found Node.js at: $nodePath" -ForegroundColor Green
Write-Host ""

# Temporarily add to PATH for this session
$env:PATH = "$nodePath;$env:PATH"

# Verify Node.js and npm
Write-Host "Verifying installation..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version
    $npmVersion = & npm --version
    Write-Host "  Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "  npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Could not run Node.js or npm" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

# Run npm install
try {
    & npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCCESS! Dependencies installed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Cyan
        Write-Host "1. Set up Supabase (see SETUP.md for details)"
        Write-Host "2. Copy .env.local.example to .env.local"
        Write-Host "3. Add your Supabase credentials to .env.local"
        Write-Host "4. Run: npm run dev"
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "ERROR: npm install failed!" -ForegroundColor Red
        Write-Host "Please check the error messages above." -ForegroundColor Yellow
        Write-Host ""
    }
} catch {
    Write-Host ""
    Write-Host "ERROR: Failed to run npm install" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
}

Write-Host ""
Read-Host "Press Enter to exit"
