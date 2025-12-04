# Vibechain AI - Setup Guide

This guide will walk you through setting up the Vibechain AI dashboard with Supabase authentication.

## Prerequisites

Before you begin, make sure you have:
- Node.js 18 or higher installed
- npm or yarn package manager
- A Supabase account (free tier is fine)
- Git installed

## Step 1: Install Dependencies

Since npm is not currently available on your system, you'll need to install Node.js first:

1. Download Node.js from [https://nodejs.org](https://nodejs.org) (LTS version recommended)
2. Run the installer and follow the prompts
3. Verify installation by opening a new terminal and running:
   ```bash
   node --version
   npm --version
   ```

Once Node.js is installed, navigate to the project directory and run:
```bash
npm install
```

This will install all required dependencies including:
- `@supabase/supabase-js` - Supabase JavaScript client
- `@supabase/ssr` - Server-side rendering support for Supabase
- Material UI components
- Next.js and React

## Step 2: Create Supabase Project

1. **Sign up for Supabase**:
   - Go to [https://supabase.com](https://supabase.com)
   - Click "Start your project"
   - Sign in with GitHub (recommended) or email

2. **Create a new project**:
   - Click "New Project"
   - Choose your organization (or create one)
   - Fill in project details:
     - **Name**: vibechain-ai (or your preferred name)
     - **Database Password**: Choose a strong password (save this!)
     - **Region**: Choose closest to your users
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

3. **Get your API credentials**:
   - Once setup is complete, go to **Project Settings** (gear icon)
   - Click **API** in the sidebar
   - Copy these two values:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon/public key** (the long string under "Project API keys")

## Step 3: Configure Environment Variables

1. **Create your local environment file**:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`** and replace the placeholders:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   > **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 4: Set Up Database

1. **Open Supabase SQL Editor**:
   - In your Supabase dashboard, click **SQL Editor** in the sidebar
   - Click "New query"

2. **Run the migration**:
   - Open `supabase/migrations/001_initial_schema.sql` in your code editor
   - Copy the entire contents
   - Paste into the Supabase SQL Editor
   - Click "Run" or press `Ctrl+Enter`

3. **Verify the setup**:
   - Go to **Table Editor** in Supabase
   - You should see a `profiles` table
   - Click on the table to see its structure

## Step 5: Configure Authentication

1. **Enable Email authentication**:
   - Go to **Authentication** > **Providers** in Supabase
   - Ensure "Email" is enabled (it should be by default)

2. **Configure email settings** (optional but recommended):
   - Go to **Authentication** > **Email Templates**
   - Customize the confirmation email if desired

3. **Set up redirect URLs** (for production):
   - Go to **Authentication** > **URL Configuration**
   - Add your production URL when you deploy

## Step 6: Run the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser**:
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the landing page

3. **Test authentication**:
   - Click "Sign Up" button
   - Create a test account with your email
   - Check your email for confirmation (if enabled)
   - Sign in with your credentials
   - You should be redirected to `/dashboard`

## Step 7: Deploy to Vercel

### Prepare for Deployment

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit with Supabase integration"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code

### Deploy

1. **Go to Vercel**:
   - Visit [https://vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import your project**:
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure environment variables**:
   - Before deploying, add these environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Click "Deploy"

4. **Update Supabase redirect URLs**:
   - Once deployed, copy your Vercel URL (e.g., `https://your-app.vercel.app`)
   - Go back to Supabase > **Authentication** > **URL Configuration**
   - Add to "Site URL": `https://your-app.vercel.app`
   - Add to "Redirect URLs": `https://your-app.vercel.app/auth/callback`

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
- Run `npm install` to install dependencies
- Make sure Node.js is installed

### "Invalid API key"
- Check that your `.env.local` file has the correct values
- Make sure there are no extra spaces or quotes
- Restart the dev server after changing environment variables

### "User not found" after sign-up
- Check if email confirmation is required in Supabase settings
- Go to **Authentication** > **Settings** and check "Enable email confirmations"
- For development, you can disable this temporarily

### Authentication not working in production
- Verify environment variables are set in Vercel
- Check that redirect URLs are configured in Supabase
- Make sure the Vercel URL matches exactly (with https://)

### Database errors
- Verify the migration ran successfully in Supabase SQL Editor
- Check the `profiles` table exists in Table Editor
- Ensure RLS policies are enabled

## Next Steps

- Customize the landing page in `app/page.tsx`
- Add more features to the dashboard
- Set up additional Supabase tables for your data
- Configure email templates in Supabase
- Add social authentication providers (Google, GitHub, etc.)

## Support

- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Material UI Docs**: [https://mui.com](https://mui.com)

---

**Congratulations!** 🎉 Your Vibechain AI dashboard is now set up with Supabase authentication and ready to deploy!
