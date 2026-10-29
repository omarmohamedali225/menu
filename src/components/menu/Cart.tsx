import { useCart } from "@/contexts/CartContext";
import { AnimatePresence, motion } from "motion/react";
import { X, ShoppingBag, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStorage } from "@/hooks/useCartStorage";
import { useMenu, useOffer, useProfile } from "@/features/menu/hooks";
import type { OfferRowCart, ProductRowCart } from "@/types/Products";
import { ItemOfferCart } from "./ItemOfferCart";
import { ItemProductCart } from "./ItemProductCart";
import { NumberAr } from "@/helpers/helper";
import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

type Row = ProductRowCart | OfferRowCart;

export default function Cart() {
  const { handlerClose, open } = useCart();
  const { data: cartData } = useCartStorage();
  const [order, setOrder] = useState(false);
  const { data: profile } = useProfile();

  const { data: menu } = useMenu();
  const { data: offer } = useOffer();

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

  const data: Row[] = cartData.map((c): Row => {
    if (c.type === "product") {
      const item = menu?.find((m) => m.id === c.id);

      const extras = (c.extra ?? []).flatMap((e) => {
        const found = item?.extras.find(
          (i: { id: number }) => e.extraId === i.id,
        );
        return found ? [found] : [];
      });
      const priceExtra = extras.reduce((val, p) => {
        const qty = c?.extra?.find((q) => q.extraId === p.id)?.qty ?? 1;
        const acc = val + p.price * qty;
        return acc;
      }, 0);
      const unitPrice = Number(item?.price) + priceExtra;
      const price = (Number(item?.price) + priceExtra) * c.quantity;
      return { ...c, type: "product", item: item, price, unitPrice, extras };
    }
    // offer
    const item = offer?.find((m) => m.id === c.id);

    const price = Number(item?.price) * c.quantity;
    return { ...c, type: "offer", item: item, price };
  });

  const totalPrice = data.reduce((sum, i) => {
    const acc = sum + (i?.price ?? 0);
    return acc;
  }, 0);

  function handleOrder(val: { name: string; address: string; note: string }) {
    const { name, address, note } = val;

const products: ProductRowCart[] = data.filter((e) => e.type === "product");
const offers: OfferRowCart[] = data.filter((e) => e.type === "offer");

const entries = [
  ...offers.map((o) => ({
    name: o.item?.title,
    qty: o.quantity,
    price: o.price,
    detail: "",
  })),
  ...products.map((p) => ({
    name: p.item?.name,
    qty: p.quantity,
    price: p.price,
    detail: p.extras
      .map((e) => {
        const qty = p.extra?.find((q) => q.extraId === e.id)?.qty;
        return `${NumberAr(qty)} ${e.name}`;
      })
      .join("، "),
  })),
];

const rows = entries
  .map(
    (r) =>
      `• *${r.name}* ×${r.qty} — ${r.price} جنيه` +
      (r.detail ? `\n   _+ ${r.detail}_` : ""),
  )
  .join("\n");

const message =
  `*طلب جديد*\n\n` +
  `*الاسم:* ${name}\n` +
  `*العنوان:* ${address}\n` +
  (note?.trim() ? `*ملاحظة:* ${note.trim()}\n` : "") +
  `\n${rows}\n\n` +
  `*الإجمالي: ${totalPrice} جنيه*\n\n` +
  `نرجو تأكيد العنوان وتكلفة التوصيل. شكرًا لكم 🌷`;
    const phone = "+2" + profile?.phone;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    localStorage.removeItem(`cart:${profile?.id}`);
    window.location.reload();
  }

  return (
    <>
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
                        ? `عربيتك فيها ${NumberAr(cartData.length)} منتج`
                        : "عربيتك مفهاش حاجة"}
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
                  {data
                    .filter((e) => e.type === "offer")
                    .map((item, i) => (
                      <ItemOfferCart
                        key={`${item.id}-${item.type}-${i}`}
                        data={item}
                      />
                    ))}
                  {data
                    .filter((e) => e.type === "product")
                    .map((item, i) => (
                      <ItemProductCart
                        key={`${item.id}-${item.type}-${i}`}
                        data={item}
                      />
                    ))}
                </div>
              </div>

              {data.length > 0 ? (
                <>
                  <div className="my-3 border-t border-amber-200" />
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">
                        المبلغ الإجمالي
                      </span>

                      <span className="text-lg font-bold text-amber-700">
                        {NumberAr(totalPrice)}{" "}
                        <small className="font-mono">ج.م</small>
                      </span>
                    </div>
                    <p className="text-xs text-amber-700/60">
                      مصاريف الشحن هنحددها لما نعرف المكان
                    </p>
                    <button
                      onClick={() => setOrder(true)}
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
                      <span>اطلب الان</span>
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
      <Modal
        open={order && open}
        // closable={false}
        onCancel={() => setOrder(false)}
        footer={false}
        title={"بيانات التواصل"}
      >
        <Form
          onFinish={(val) => {
            handleOrder(val);
          }}
          layout="vertical"
          initialValues={{ name: "", address: "", note: "" }}
        >
          <Form.Item
            label={"اسمك"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "اسمك مطلوب",
              },
            ]}
          >
            <Input placeholder="اكتب اسمك هنا" id="name" />
          </Form.Item>
          <Form.Item
            label={"عنوانك"}
            name={"address"}
            rules={[
              {
                required: true,
                message: "العنوان مطلوب",
              },
            ]}
          >
            <Input placeholder="اكتب العنوان بالتفصيل هنا" id="address" />
          </Form.Item>
          <Form.Item
            label={
              <span>
                ملاحظة <span className="text-gray-400 text-xs">(اختياري)</span>
              </span>
            }
            name={"note"}
          >
            <TextArea placeholder="لو فيه اي ملاحظة مع الطلب" id="note" />
          </Form.Item>
          <button
            type="submit"
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
        </Form>
      </Modal>
    </>
  );
}
