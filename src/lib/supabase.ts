import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const url = import.meta.env.VITE_URL;

const anon = import.meta.env.VITE_ANON_KEY;
export const supabase = createClient<Database>(url, anon);
