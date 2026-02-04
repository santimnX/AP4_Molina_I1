import { createClient } from '@supabase/supabase-js';
import { storageAdapter } from '../storage/storage.adapter';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://pahgzdmmvxsnbhxddgtv.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaGd6ZG1tdnhzbmJoeGRkZ3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNjAwMzQsImV4cCI6MjA4NTYzNjAzNH0.d8YAtS7_QlJ0JGuqWITt5vH0RcDZMh_SPhOTBsH6rYQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter, // ¡Magia! ✨ Funciona en Web y App
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});