import Button from "@/components/Button";
import { useCart } from "@/contexts/CartContext";
import { AnimatePresence, motion } from "motion/react";
import { X, ShoppingBag, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useCartStorage } from "@/hooks/useCartStorage";
import { useMenu } from "@/features/menu/hooks";
import type { CartType } from "@/types/Products";
import type { ProductWithCategories } from "@/features/menu/api";

export default function Cart() {
  const { handlerClose, open } = useCart();
  const { data: cartData } = useCartStorage();

  const { data: menu } = useMenu();


  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlerClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handlerClose]);

  const data = cartData.map((c) => {
    const item = menu?.find((m) => m.id === c.id);
    const extras = c.extra.flatMap((e) => {
      const found = item?.extras.find((i) => e === i.id);
      return found ? [found] : [];
    });
    const priceExstra = extras.reduce((c, p) => {
      const acc = c + p.price;
      return acc;
    }, 0);
    const price = (Number(item?.price) + priceExstra) * c.quantity;
    return { ...c, item: item, price, extras };
  });

  const totalPrice = data.reduce((sum, i) => {
    const acc = sum + i.price;
    return acc;
  }, 0);

  function handleOrder() {
    const msg = `🛒 *طلب جديد*
━━━━━━━━━━━━━━
*الطلبات: ${cartData.length} منتجات*

${data
  .map(
    (d) =>
      `* - ${d.item?.name_ar} × ${d.quantity}
     ${d.extras.length > 0 ? `الإضافات: ${d.extras.map((e) => e.name_ar).join(" و")}` : "من غير أضافات"}
     السعر: ${d.price} جنيه`,
  )
  .join("\n\n")}


━━━━━━━━━━━━━━
💰 *الإجمالي:* ${totalPrice} جنيه

📝 *نتمني ليك يوم سعيد*`;
    const phone = "+201008547013";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    localStorage.removeItem("products");
    window.location.reload();
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center p-3 z-100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handlerClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              relative z-10
              flex flex-col
              w-full max-w-lg
              max-h-[85vh]
              overflow-hidden
              rounded-2xl
              bg-amber-50
              shadow-2xl
            "
          >
            <div className="flex shrink-0 items-center justify-between border-b border-amber-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-amber-700" />

                <div>
                  <h1 className="font-bold text-lg text-amber-800">
                    عربة التسوق
                  </h1>

                  <p className="text-xs text-amber-700/60">
                    {cartData.length > 0
                      ? `عربيتك فيها ${cartData.length} منتج`
                      : "عربية كحيانه مفهاش حاجة"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlerClose}
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  text-amber-700
                  transition
                  hover:bg-amber-100
                "
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-auto scrollbar-none">
              <div className="min-h-0 flex-1 px-5">
                {data.map((item) => (
                  <ItemCart key={item.id} data={item} />
                ))}
              </div>
            </div>

            {data.length > 0 ? (
              <>
                <div className="my-3 border-t border-amber-200" />
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">كله ع بعضة</span>

                    <span className="text-lg font-bold text-amber-700">
                      {totalPrice} جنية
                    </span>
                  </div>
                  <p className="text-xs text-amber-700/60">
                    يصحبيييي مصاريف الشحن هنحددها لما نعرف المكان
                  </p>
                  <button
                    onClick={handleOrder}
                    type="button"
                    className="
                  mt-4
                  flex w-full
                  items-center justify-center gap-2
                  rounded-xl
                  bg-green-500
                  px-4 py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-green-600
                  active:scale-[0.98]
                "
                  >
                    <MessageCircle size={19} />

                    <span>اطلب وتابع ع الواتس</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="px-5 py-4">
                <p className="text-sm md:text-lg text-amber-700/60">
                  العربية فاضية يصحبي هتشوف اية بس روح اتسوق وتعالي
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ItemCart({
  data,
}: {
  data: CartType & {
    price: number;
    item?: ProductWithCategories;
    extras?: ProductWithCategories["extras"];
  };
}) {
  const { addItem, deleteItem } = useCartStorage();
  return (
    <div className="flex items-center justify-between gap-4 border-b border-amber-200/70 py-4">
      {/* Product info */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-sm font-semibold text-amber-900">
          {data?.item?.name_ar}
        </h2>

        <p className="mt-1 text-xs text-amber-700/60">
          {data.extra.length > 0 && "أضافة"}{" "}
          {data.extras?.map((e) => e.name_ar).join(" و")}
        </p>

        <span className="mt-1 block text-sm font-bold text-amber-700">
          {data?.price} جنية
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
