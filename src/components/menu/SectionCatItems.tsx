import Cat from "@/components/menu/Cat";
import Item from "./Item";
import type { CategoriesType, ProductsType } from "@/types/Products";
import { supabase } from "../../../supabase";
import { useEffect, useState } from "react";

type SectionTypes = {
  data: CategoriesType;
};

export default function SectionCatItems({ data }: SectionTypes) {
  const { id, name_ar } = data;
  const [products, setProducts] = useState<ProductsType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!id) return;
    async function Fetchdata() {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", id);

      setProducts(data);
      setLoading(false);
      // console.log({ error });
    }

    if (id) {
      Fetchdata();
    }
  }, [id]);
  return (
    <div data-category={data?.slug} className="scroll-mt-36">
      <Cat catName={data.name_ar} />
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products &&
          products.map((product, i) => (
            <Item product={product} cat={name_ar} key={i} />
          ))}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
      </section>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-amber-100 shadow overflow-hidden">
      <div className="aspect-square w-full animate-pulse bg-amber-900/10" />

      <div className="p-2 space-y-2">
        <div className="space-y-1.5">
          <div className="h-3.5 w-3/4 animate-pulse rounded bg-amber-900/15" />
          <div className="h-3.5 w-1/2 animate-pulse rounded bg-amber-900/15" />
        </div>

        <div className="h-3 w-2/3 animate-pulse rounded bg-amber-900/10" />

        <div className="h-4 w-1/3 animate-pulse rounded bg-amber-900/15" />

        <div className="h-10 w-full animate-pulse rounded-lg bg-amber-900/10" />
      </div>
    </div>
  );
}
