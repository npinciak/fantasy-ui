import { Database } from './supabase-client.model';

export type SupaClientTable = keyof Database['public']['Tables'];
