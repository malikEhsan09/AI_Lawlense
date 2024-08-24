import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing in .env.local");
} else {
  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Key:", supabaseKey ? "Loaded successfully" : "Missing");
}


export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
