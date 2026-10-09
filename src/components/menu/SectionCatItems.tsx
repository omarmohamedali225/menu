import Cat from "@/components/menu/Cat";
import Item from "./Item";
import { useCategories, useMenu } from "@/features/menu/hooks";

export default function SectionCatItems() {
  const { data: dataSections, isLoading } = useMenu();
  const { data: dataCategories, isLoading: loadCategories } = useCategories();

  if (loadCategories) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </section>
    );
  }

  return dataCategories?.map((data) => (
    <div key={data.id} data-category={data.slug} className="scroll-mt-36">
      <Cat catName={data.name_ar} />
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {dataSections &&
          !isLoading &&
          dataSections
            ?.filter((e) => e.categories?.id === data.id)
            .map((product) => <Item product={product} key={product.id} />)}
      </section>
    </div>
  ));
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
