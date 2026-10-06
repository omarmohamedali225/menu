import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_URL;

const anon = import.meta.env.VITE_ANON_KEY;
export const supabase = createClient(url, anon);
