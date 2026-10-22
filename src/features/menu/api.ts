import { supabase } from "@/lib/supabase";
import type {
  TypeInsertCategory,
  TypeInsertExtra,
  TypeInsertOffer,
  TypeInsertProduct,
} from "@/types/Products";
import type { QueryData } from "@supabase/supabase-js";
import { message } from "antd";

const products = () =>
  supabase
    .from("products")
    .select("*,categories(*),extras(*)")
    .order("created_at", { ascending: true });

const categories = () =>
  supabase.from("categories").select("*").order("id", { ascending: true });

export type ProductWithCategories = QueryData<
  ReturnType<typeof products>
>[number];

export type TypeCategories = QueryData<ReturnType<typeof categories>>[number];

export async function fetchMenu() {
  const { data, error } = await products();
  if (error) throw error;
  return data;
}
export async function fetchCategories() {
  const { data, error } = await categories();
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
// offer
const offers = supabase.from("offers").select("*");
export type OffersTypeApi = QueryData<typeof offers>[number];

export async function fetchOffers() {
  const { data, error } = await offers;
  if (error) throw error;
  return data;
}

// extras
const extras = supabase
  .from("extras")
  .select("*")
  .order("id", { ascending: true });
export type ExtrasTypeApi = QueryData<typeof extras>[number];

export async function fetchExtras() {
  const { data, error } = await extras;
  if (error) throw error;
  return data;
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
