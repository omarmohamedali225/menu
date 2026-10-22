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
