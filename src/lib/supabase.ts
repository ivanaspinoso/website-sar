import { createClient } from "@supabase/supabase-js";

function normalizeEnv(value: string | undefined) {
  if (!value) return "";
  return value.trim().replace(/^['"]|['"]$/g, "");
}

const supabaseUrl = normalizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL);
const supabaseAnonKey = normalizeEnv(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY,
);

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseEnv ? createClient(supabaseUrl!, supabaseAnonKey!) : null;

export const SUPABASE_ENV_ERROR =
  "Falta configurar NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en el entorno.";
