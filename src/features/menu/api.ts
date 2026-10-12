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
    .update({ name: value })
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
// offer
const offers = supabase.from("offers").select("*");
export type OffersTypeApi = QueryData<typeof offers>[number];

export async function fetchOffers() {
  const { data, error } = await offers;
  if (error) throw error;
  return data;
}

// extras
const extras = supabase.from("extras").select("*");
export type ExtrasTypeApi = QueryData<typeof extras>[number];

export async function fetchExtras() {
  const { data, error } = await extras;
  if (error) throw error;
  return data;
}

type Table = "products" | "offers" | "categories" | "extras";

export async function updateAvailable({
  table,
  bool,
  id,
}: {
  table: Table;
  bool: boolean;
  id: string | number;
}) {
  const { error } = await supabase
    .from(table)
    .update({ is_available: bool })
    .eq("id", id);
  if (error) throw error;
  return;
}
