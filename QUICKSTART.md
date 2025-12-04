# Quick Start Guide - Node.js Installation Required

## ⚠️ Node.js Not Detected

Node.js is not currently installed on your system. You'll need to install it to run the Vibechain AI dashboard.

## Step 1: Install Node.js

### Download Node.js

1. **Visit the official website**: [https://nodejs.org](https://nodejs.org)
2. **Download the LTS version** (recommended for most users)
   - Click the big green button that says "LTS" (Long Term Support)
   - This will download the Windows installer (.msi file)

### Install Node.js

1. **Run the installer** (the .msi file you just downloaded)
2. **Follow the installation wizard**:
   - Click "Next" on the welcome screen
   - Accept the license agreement
   - Choose the default installation location (or customize if needed)
   - **Important**: Make sure "Add to PATH" is checked
   - Click "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **Verify installation**:
   - Open a **NEW** PowerShell window (important - must be new)
   - Run these commands:
     ```powershell
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., v20.x.x and 10.x.x)

## Step 2: Install Project Dependencies

Once Node.js is installed, navigate to your project directory and run:

```powershell
cd "d:\Vibechain AI"
npm install
```

This will install all required packages including:
- `@supabase/supabase-js` - Supabase client
- `@supabase/ssr` - Server-side rendering support
- Material UI components
- Next.js framework
- And all other dependencies

## Step 3: Set Up Supabase

### Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email

### Create a New Project

1. Click "New Project"
2. Fill in the details:
   - **Name**: `vibechain-ai` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose the closest to you
3. Click "Create new project"
4. Wait 2-3 minutes for setup

### Get Your API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **API** in the left menu
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public key** (long string under "Project API keys")

### Configure Environment Variables

1. In your project folder, copy the example file:
   ```powershell
   Copy-Item .env.local.example .env.local
   ```

2. Open `.env.local` in your code editor
3. Replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Run Database Migration

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click "New query"
3. Open `supabase/migrations/001_initial_schema.sql` from your project
4. Copy all the SQL code
5. Paste it into the Supabase SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Verify Database Setup

1. Click **Table Editor** in Supabase sidebar
2. You should see a `profiles` table
3. Click on it to verify the structure

## Step 4: Run the Application

```powershell
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Test the Application

1. **Landing Page**: Visit http://localhost:3000
   - You should see the hero section with "Vibechain AI"
   - Click "Sign Up" to create an account

2. **Create Account**:
   - Enter your name, email, and password
   - Click "Create Account"
   - You should be redirected to the dashboard

3. **Dashboard**: You should now see:
   - Sidebar on the left
   - Header with your email
   - Dashboard widgets and charts

4. **Sign Out**:
   - Click your email in the header
   - Click "Sign Out"
   - You should be redirected to the landing page

## Step 5: Deploy to Vercel (Optional)

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps

1. **Initialize Git** (if not already done):
   ```powershell
   git init
   git add .
   git commit -m "Initial commit with Supabase backend"
   ```

2. **Create GitHub Repository**:
   - Go to [https://github.com/new](https://github.com/new)
   - Create a new repository
   - Follow instructions to push your code

3. **Deploy to Vercel**:
   - Go to [https://vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

4. **Update Supabase Settings**:
   - Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
   - In Supabase, go to **Authentication** > **URL Configuration**
   - Add to "Site URL": `https://your-app.vercel.app`
   - Add to "Redirect URLs": `https://your-app.vercel.app/auth/callback`

## Troubleshooting

### "npm is not recognized"
- Make sure you opened a **NEW** terminal after installing Node.js
- Restart your computer if the issue persists
- Verify Node.js is in your PATH

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### Build errors
- Make sure all environment variables are set in `.env.local`
- Check that Supabase credentials are correct
- Verify the database migration ran successfully

### Authentication not working
- Check `.env.local` has correct Supabase URL and key
- Verify database migration created the `profiles` table
- Check Supabase dashboard for any error logs

## Summary Checklist

- [ ] Install Node.js from nodejs.org
- [ ] Verify with `node --version` and `npm --version`
- [ ] Run `npm install` in project directory
- [ ] Create Supabase project
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Add Supabase credentials to `.env.local`
- [ ] Run database migration in Supabase SQL Editor
- [ ] Start dev server with `npm run dev`
- [ ] Test sign-up and sign-in
- [ ] (Optional) Deploy to Vercel

## Need Help?

- **Detailed Setup**: See `SETUP.md` for comprehensive instructions
- **Implementation Details**: See the walkthrough artifact
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)

---

**You're almost there!** Just install Node.js and you'll be up and running in minutes! 🚀
