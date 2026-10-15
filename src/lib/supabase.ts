import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('your-project-id')
);

// Fallback dummy client if credentials have not been pasted yet
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : createClient('https://rmc-placeholder.supabase.co', 'dummy-anon-key', {
      auth: {
        persistSession: false
      }
    });

export const getSupabaseConfig = () => ({
  isConfigured: isSupabaseConfigured,
  url: supabaseUrl || 'Not configured',
  hasKey: Boolean(supabaseAnonKey && !supabaseAnonKey.includes('your-anon-key'))
});
