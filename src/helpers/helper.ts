import type { ProductWithCategories } from "@/features/menu/api";

export function CountProductsInCategory(
  arr: ProductWithCategories[],
  id: string,
) {
  const c = new Map();
  const find = arr?.filter((p) => p.categories?.id === id);
  c.set(id, find?.length);
  return c;
}

export function NumberAr(n: number | string | null | undefined) {
  if (n === 0 || n === null || n === undefined) return "";
  return Number(n).toLocaleString("ar-eg");
}
