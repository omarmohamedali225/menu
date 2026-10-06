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