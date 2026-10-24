import { supabase } from "@/lib/supabase";
import type {
  TypeInsertCategory,
  TypeInsertExtra,
  TypeInsertOffer,
  TypeInsertProduct,
} from "@/types/Products";
import type { QueryData } from "@supabase/supabase-js";
import { message } from "antd";

const products = (tenantId: string) =>
  supabase
    .from("products")
    .select("*,categories(*),extras(*)")
    .eq("tenant_id", tenantId)
    .order("created_at", { ascending: true });

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

export async function fetchMenu(tenantId: string) {
  const { data, error } = await products(tenantId);
  if (error) throw error;
  return data;
}
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

export async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}
export async function updateProfile(
  tenantId: string,
  name: string,
  phone: string,
) {
  const { error } = await supabase
    .from("profiles")
    .update({ name, phone })
    .eq("id", tenantId);
  if (error) throw error;
  return;
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

type TypeEdit = {
  id: number;
  // name: string;
  // categoryId: string;
  // price: string;
  extras: string[];
};

export async function edit({ data }: { data: TypeEdit }) {
  // const { error } = await supabase
  //   .from("products")
  //   .update({
  //     name: data.name,
  //     category_id: data.categoryId,
  //     price: data.price,
  //   })
  //   .eq("id", data.id);

  const { error: error } = await supabase
    .from("product_extras")
    .delete()
    .eq("product_id", data.id);

  const insert = data.extras.map((e) => ({
    product_id: data.id,
    extra_id: Number(e),
  }));
  const { error: extraErr } = await supabase
    .from("product_extras")
    .insert(insert);

  if (error) message.error("خطا ف التعديل");
  if (extraErr) message.error("حصل خطا");

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

type keys = "offers" | "extras" | "products" | "categories";

export async function updateAvailable({
  table,
  bool,
  id,
}: {
  table: keys;
  bool: boolean;
  id: string | number;
}) {
  const { data, error } = await supabase
    .from(table)
    .update({ is_available: bool })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data;
}
export async function addProduct(data: TypeInsertProduct) {
  const { error } = await supabase.from("products").insert({
    name: data.name,
    price: data.price,
    category_id: data.category_id,
  });
  if (error) throw error;
}
export async function removeProduct(id: number) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}
export async function addOffer(data: TypeInsertOffer) {
  const { error } = await supabase.from("offers").insert({
    title: data.title,
    description: data.description,
    price: data.price,
  });
  if (error) throw error;
}
export async function removeOffer(id: number) {
  const { error } = await supabase.from("offers").delete().eq("id", id);
  if (error) throw error;
}

export async function addCategory(data: TypeInsertCategory) {
  const { error } = await supabase.from("categories").insert({
    name: data.name,
    slug: data.slug,
  });
  if (error) throw error;
}
export async function removeCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;
}

export async function addExtra(data: TypeInsertExtra) {
  const { error } = await supabase.from("extras").insert({
    name: data.name,
    price: data.price,
  });
  if (error) throw error;
}
export async function removeExtra(id: number) {
  const { error } = await supabase.from("extras").delete().eq("id", id);
  if (error) throw error;
}
