import { supabase } from "@/lib/supabase";
import type { QueryData } from "@supabase/supabase-js";

const products = supabase
  .from("products")
  .select("*,categories(*),extras(*)")
  .order("id", { ascending: true });

export type ProductWithCategories = QueryData<typeof products>[number];

export async function fetchMenu() {
  const { data, error } = await products;
  if (error) throw error;
  return data;
}

export async function updateName(id: number, value: string) {
  const { error } = await supabase
    .from("products")
    .update({ name_ar: value })
    .eq("id", id);
  if (error) throw error;
  return;
}
export async function updatePrice(id: number, value: string) {
  const { error } = await supabase
    .from("products")
    .update({ price: value })
    .eq("id", id);
  if (error) throw error;
  return;
}
export async function updateCategories(id: number, value: string) {
  const { error } = await supabase
    .from("products")
    .update({ category_id: value })
    .eq("id", id);
  if (error) throw error;
  return;
}
