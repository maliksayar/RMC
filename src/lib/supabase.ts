import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://leqqutfchhdadtkneoel.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_T8Q49-zw_ZVybVElzj3deg_VRxV7a0N';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY).trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id')
);

// Fallback client with production credentials guaranteed
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export const getSupabaseConfig = () => ({
  isConfigured: isSupabaseConfigured,
  url: supabaseUrl || 'Not configured',
  hasKey: Boolean(supabaseAnonKey && !supabaseAnonKey.includes('your-anon-key'))
});
