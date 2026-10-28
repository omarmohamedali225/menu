import { supabase } from "@/lib/supabase";
import type { QueryData } from "@supabase/supabase-js";

const products = (tenantId: string) =>
  supabase
    .from("products")
    .select("*,categories(*),extras(*)")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: true });

export async function fetchMenu(tenantId: string) {
  const { data, error } = await products(tenantId);
  if (error) throw error;
  return data;
}

const categories = (tenantId: string) =>
  supabase
    .from("categories")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("id", { ascending: true });

export type ProductWithCategories = QueryData<
  ReturnType<typeof products>
>[number];
export type TypeCategories = QueryData<ReturnType<typeof categories>>[number];
export async function fetchCategories(tenantId: string) {
  const { data, error } = await categories(tenantId);
  if (error) throw error;
  return data;
}

// offer
const offers = (tenantId: string) =>
  supabase
    .from("offers")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("id", { ascending: true });
export type OffersTypeApi = QueryData<ReturnType<typeof offers>>[number];

export async function fetchOffers(tenantId: string) {
  const { data, error } = await offers(tenantId);
  if (error) throw error;
  return data;
}

// extras
const extras = (tenantId: string) =>
  supabase
    .from("extras")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("id", { ascending: true });

export type ExtrasTypeApi = QueryData<ReturnType<typeof extras>>[number];

export async function fetchExtras(tenantId: string) {
  const { data, error } = await extras(tenantId);
  if (error) throw error;
  return data;
}

export async function fetchTenantExists(tenantId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", tenantId)
    .maybeSingle();

  if (error) throw error;
  return data !== null;
}

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}
// export async function createOrder(data) {
 
// }