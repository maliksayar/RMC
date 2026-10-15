import { supabase, isSupabaseConfigured } from './supabase';
import { UserRole } from '../types';

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role: UserRole;
}

export const authService = {
  async signUp({ email, password, name, phone, role }: SignUpData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured yet. Please add your credentials in .env.');
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone: phone || '',
          role
        }
      }
    });

    if (error) throw error;
    return data;
  },

  async signIn(email: string, password: string) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured yet. Please add your credentials in .env.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    if (!isSupabaseConfigured) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession() {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase.auth.getSession();
    if (error) return null;
    return data.session;
  },

  async getCurrentUser() {
    if (!isSupabaseConfigured) return null;
    const { data } = await supabase.auth.getUser();
    return data.user;
  }
};
