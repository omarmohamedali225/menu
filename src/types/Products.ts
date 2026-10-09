import type { Database } from "@/lib/database.types";

export interface ProductsType {
  id: string;
  category_id: string;
  name_ar: string;
  name_en: string;
  price: number;
  created_at: string;
}

export interface CategoriesType {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
}

export type TypeProduct = Database["public"]["Tables"]["products"]["Row"];
export type TypeCategory = Database["public"]["Tables"]["categories"]["Row"];


export interface CartType {
  id: number;
  quantity: number;
  extra: number[];
}