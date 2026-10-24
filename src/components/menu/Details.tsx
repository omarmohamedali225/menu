// import Button from "@/components/Button";
import type { ProductWithCategories } from "@/features/menu/api";
import { NumberAr } from "@/helpers/helper";
import { useCartStorage } from "@/hooks/useCartStorage";
import { Checkbox, Modal } from "antd";
import { Star } from "lucide-react";
import { useState } from "react";

type Fake = {
  id: number;
  price: number;
  name: string;
};

export default function Details({
  product,
  onclick,
}: {
  product: ProductWithCategories;
  onclick: () => void;
}) {
  const { addItem, data } = useCartStorage();

  const { price } = product;
  const [moreAdd, setMoreAdd] = useState<Fake[]>();
  const [quantity, setQuantity] = useState<number>(1);
  const morePrice = moreAdd?.reduce((val, c) => {
    const res = val + c.price;
    return res;
  }, 0);

  let total = Number(price);

  if (morePrice) {
    total += morePrice;
  }

  const isExisting = data.find((e) => e.id === product.id);

  total = total * quantity;

  function handleCart() {
    const res = {
      id: product.id,
      quantity: quantity,
      extra: moreAdd ? moreAdd.map((e) => e.id) : [],
    };
    console.log(quantity);
    addItem({ ...res, type: "product" });
    onclick();
  }

  const availableExtras = product.extras.filter((e) => e.is_available);
  return (
    <Modal
      open
      width={{ xs: "95%", md: "50%", lg: "40%" }}
      centered
      onCancel={onclick}
      footer={() => (
        <div className="flex items-center gap-3 pt-3">
          {/* الكمية */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex shrink-0 items-center gap-1 rounded-full border border-amber-800/30 bg-white p-1"
          >
            <button
              type="button"
              aria-label="زود"
              onClick={() => setQuantity(Math.min(Number(quantity + 1), 49))}
              className="grid size-9 place-items-center rounded-full bg-amber-100 text-xl text-amber-800 transition active:scale-90"
            >
              +
            </button>
            <span className="min-w-6 text-center text-sm font-bold text-amber-900">
              {NumberAr(quantity)}
            </span>
            <button
              type="button"
              aria-label="نقص"
              onClick={() => setQuantity(Math.max(Number(quantity - 1), 1))}
              className="grid size-9 place-items-center rounded-full bg-amber-100 text-xl text-amber-800 transition active:scale-90"
            >
              −
            </button>
          </div>

          {/* زرار الإضافة + الإجمالي */}
          <button
            type="button"
            onClick={handleCart}
            className="flex flex-1 items-center justify-between rounded-full bg-amber-700 px-5 py-3 font-bold text-white transition hover:bg-amber-800 active:scale-[0.98]"
          >
            <span>{isExisting ? "تعديل السلة" : "أضف للسلة"}</span>
            <span>{NumberAr(total || 0)} ج.م</span>
          </button>
        </div>
      )}
      classNames={{
        container: "[&_.ant-modal-close]:m-2! rounded-3xl! overflow-hidden",
        body: "md:max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-600 px-1",
        footer: "border-t border-black/5 pt-1!",
      }}
    >
      <div className="flex flex-col gap-4 py-4">
        {/* الهيدر */}
        <div className="flex flex-col gap-2">
          <span className="w-fit rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-700">
            #{product.categories?.name}
          </span>

          <div className="flex items-start justify-between gap-3">
            <h1 className="text-2xl font-bold leading-snug text-amber-800">
              {product.name}
            </h1>
            <span className="whitespace-nowrap pt-1 text-lg font-bold text-amber-700">
              {NumberAr(product.price)} ج.م
            </span>
          </div>

          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} fill="#bb4d00" stroke="none" size={12} />
            ))}
          </div>
        </div>

        {/* الإضافات */}
        {availableExtras.length > 0 && (
          <div className="rounded-2xl bg-amber-50/60 p-3">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-sm font-bold text-amber-800">الإضافات</h2>
              <span className="text-xs text-gray-500">
                السعر لكل طبق · الكمية {NumberAr(quantity)}
              </span>
            </div>

            <Checkbox.Group
              value={moreAdd}
              className="flex flex-col gap-2"
              onChange={(e) => setMoreAdd(e)}
            >
              {availableExtras.map((e) => (
                <Checkbox
                  value={e}
                  key={e.id}
                  classNames={{
                    label: "w-full",
                    root: "w-full rounded-xl border border-amber-700/20 bg-white p-2! transition-colors has-checked:border-amber-700 has-checked:bg-amber-100!",
                  }}
                >
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <span className="text-sm">{e.name}</span>
                    <span className="whitespace-nowrap text-sm font-bold text-amber-700">
                      +{NumberAr(e.price)} ج.م
                    </span>
                  </div>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        )}
      </div>
    </Modal>
  );
}
