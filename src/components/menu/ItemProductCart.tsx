import { useCartStorage } from "@/hooks/useCartStorage";
import type { ProductRowCart } from "@/types/Products";
import Button from "../Button";

export function ItemProductCart({ data }: { data: ProductRowCart }) {
  const { addItem, deleteItem } = useCartStorage();
  return (
    <div className="flex items-center justify-between gap-4 border-b border-amber-200/70 py-4">
      {/* Product info */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-semibold text-amber-900">
          {data.item?.name_ar}
        </h2>

        <p className="mt-1 text-xs text-amber-700/60">
          {/* {data.extra.length > 0 && "أضافة"}{" "} */}
          {data.extras?.map((e) => e.name_ar).join(" و")}
        </p>

        <span className="mt-1 block text-sm font-bold text-amber-700">
          {data?.price} <small className="font-mono">جنية</small>
        </span>
      </div>

      {/* Quantity */}
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-amber-300 bg-white px-1.5 py-1">
        <Button
          text="-"
          onClick={() => {
            deleteItem(data);
          }}
        />

        <span className="min-w-5 text-center text-sm font-bold text-amber-900">
          {data.quantity}
        </span>

        <Button
          text="+"
          onClick={() => {
            addItem(data);
          }}
        />
      </div>
    </div>
  );
}