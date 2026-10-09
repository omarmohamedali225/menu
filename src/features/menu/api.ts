import { supabase } from "@/lib/supabase";
import type { QueryData } from "@supabase/supabase-js";

const products = supabase.from("products").select("*,categories(*),extras(*)");

export type ProductWithCategories = QueryData<typeof products>[number];

export async function fetchMenu() {
  const { data, error } = await products;
  if (error) throw error;
  return data;
}
