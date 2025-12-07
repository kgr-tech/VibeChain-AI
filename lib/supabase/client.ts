import { createBrowserClient } from '@supabase/ssr'

// Fallback values for build time (actual values come from environment in production)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export function createClient() {
    return createBrowserClient(
        supabaseUrl,
        supabaseKey
    )
}
