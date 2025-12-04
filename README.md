# Vibechain AI - Financial Dashboard

Modern blockchain financial dashboard built with **Next.js 14**, **Material UI**, and **Supabase**.

## Features

### 🏠 Dashboard
- Real-time status indicators (Red/Yellow/Green)
- Treasury growth visualization
- Recent transaction activity
- Metric cards with gradients

### 💳 NFT Receipts (Layer 1)
- Permanent on-chain payment receipts
- Holographic card effects
- Transaction verification status

### 💰 Community Credit
- On-chain reputation score
- Micro-loan requests
- Loan history tracking

### 📈 Growth Model (Layer 2)
- Automated payroll in stablecoins
- Invoice financing
- Multi-signature treasury management

### 🏢 Enterprise Mode (Layer 3)
- Cross-chain settlement
- KYC/AML compliance dashboard
- Smart treasury with auto-rebalancing

### 🔐 Authentication
- Supabase authentication
- Email/password sign-in
- User profile management
- Protected routes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: Material UI 5
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: Emotion (CSS-in-JS)
- **Charts**: Recharts
- **Icons**: Material UI Icons
- **TypeScript**: Full type safety
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier available)

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Supabase Setup

1. **Create a Supabase project**:
   - Go to [https://supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details and wait for setup to complete

2. **Get your credentials**:
   - Go to Project Settings > API
   - Copy the `Project URL` and `anon/public` key

3. **Run database migration**:
   - Go to SQL Editor in Supabase dashboard
   - Copy contents from `supabase/migrations/001_initial_schema.sql`
   - Run the SQL to create tables and policies

4. **Configure environment variables**:
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Landing page**: Public homepage with sign-in/sign-up
- **Dashboard**: Protected route at `/dashboard` (requires authentication)

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

### 3. Configure Supabase Redirect URLs

After deployment, add your Vercel URL to Supabase:
1. Go to Authentication > URL Configuration
2. Add your Vercel URL to "Site URL"
3. Add `https://your-app.vercel.app/auth/callback` to "Redirect URLs"

## Project Structure

```
vibechain-ai/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # Protected dashboard
│   ├── receipts/          # NFT Receipts
│   ├── credit/            # Community Credit
│   ├── growth/            # Growth Model
│   ├── enterprise/        # Enterprise Mode
│   └── auth/              # Auth callback
├── components/
│   ├── auth/              # Authentication components
│   ├── landing/           # Landing page sections
│   ├── layout/            # Sidebar, Header
│   ├── dashboard/         # Dashboard widgets
│   ├── receipts/          # Receipt components
│   ├── credit/            # Credit components
│   ├── growth/            # Growth components
│   └── enterprise/        # Enterprise components
├── contexts/
│   └── AuthContext.tsx    # Authentication state
├── lib/
│   ├── supabase/          # Supabase clients
│   └── database/          # Database types
├── supabase/
│   └── migrations/        # SQL migrations
└── theme/
    └── theme.ts           # MUI theme configuration
```

## Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#a855f7)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Theme Features
- Dark mode by default
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Authentication Flow

1. User visits landing page at `/`
2. Clicks "Sign In" or "Sign Up"
3. Enters credentials in modal
4. Redirected to `/dashboard` after successful authentication
5. All dashboard routes are protected
6. User can sign out from header menu

## License

MIT

