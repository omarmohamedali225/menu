import type { OffersTypeApi, ProductWithCategories } from "@/features/menu/api";
import type { Database } from "@/types/database.types";

export interface ProductsType {
  id: string;
  category_id: string;
  name_ar: string;
  name_en: string;
  price: number;
  created_at: string;
}

// export interface CategoriesType {
//   id: string;
//   slug: string;
//   name: string;
// }

export type TypeProduct = Database["public"]["Tables"]["products"]["Row"];
export type TypeCategory = Database["public"]["Tables"]["categories"]["Row"];

export interface CartType {
  type: "product" | "offer";
  id: number;
  quantity: number;
  extra?: number[];
}

export type ProductRowCart = CartType & {
  type: "product";
  price: number;
  item?: ProductWithCategories;
  extras: ProductWithCategories["extras"];
};

export type OfferRowCart = CartType & {
  type: "offer";
  price: number;
  item?: OffersTypeApi;
};
