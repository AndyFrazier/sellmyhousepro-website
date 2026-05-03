import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function joinWaitlist(email: string): Promise<{ alreadyExists: boolean; error: boolean }> {
  const { error } = await supabase.from('waitlist').insert({ email });

  if (!error) return { alreadyExists: false, error: false };

  // Postgres unique violation code
  if (error.code === '23505') return { alreadyExists: true, error: false };

  return { alreadyExists: false, error: true };
}
