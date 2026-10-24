import { useCartStorage } from "@/hooks/useCartStorage";
import type { ProductRowCart } from "@/types/Products";
import Button from "../Button";
import { NumberAr } from "@/helpers/helper";

export function ItemProductCart({ data }: { data: ProductRowCart }) {
  const { addItem, deleteItem } = useCartStorage();
  return (
    <div className="flex items-center justify-between gap-4 border-b border-amber-200/70 py-4">
      {/* Product info */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-semibold text-amber-900">
          {data.item?.name}
        </h2>
        {!data.item?.is_available && (
          <p className="bg-red-200 w-fit px-2 text-[11px] rounded-lg">
            ملاحظة ليس متوفر حاليا
          </p>
        )}
        <p className="mt-1 text-xs text-amber-700/60">
          {/* {data.extra.length > 0 && "أضافة"}{" "} */}
          {data.extras?.map((e) => e.name).join(" و")}
        </p>

        <span className="mt-1 block text-sm font-bold text-amber-700">
          {NumberAr(data?.item?.price)} <small className="font-mono">ج.م</small>
        </span>
      </div>

      {/* Quantity */}
      <div className="flex flex-row-reverse items-center gap-2">
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-amber-300 bg-white px-1.5 py-1">
          <Button
            text="-"
            onClick={() => {
              deleteItem({ ...data, quantity: 1 });
            }}
          />

          <span className="min-w-5 text-center text-sm font-bold text-amber-900">
            {NumberAr(data.quantity)}
          </span>

          <Button
            text="+"
            onClick={() => {
              addItem({ ...data, quantity: 1 });
            }}
          />
        </div>
        <p
          className="text-mute text-[10px] cursor-pointer"
          onClick={() => {
            deleteItem(data);
          }}
        >
          مسح
        </p>
      </div>
    </div>
  );
}
