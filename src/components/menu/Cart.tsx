import Button from "@/components/Button";
import { useCart } from "@/contexts/CartContext";
import { AnimatePresence, motion } from "motion/react";
import { X, ShoppingBag, MessageCircle } from "lucide-react";
import { useEffect } from "react";

export default function Cart() {
  const { handlerClose, open } = useCart();


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

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 z-100">
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
                    Your Order
                  </h1>

                  <p className="text-xs text-amber-700/60">
                    2 items in your cart
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
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="
                    flex items-center justify-between
                    gap-4
                    border-b border-amber-200/70
                    py-4
                  "
                  >
                    {/* Product info */}
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-semibold text-amber-900">
                        Grilled Chicken
                      </h2>

                      <p className="mt-1 text-xs text-amber-700/60">
                        add extra -
                      </p>

                      <span className="mt-1 block text-sm font-bold text-amber-700">
                        110 SAR
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="flex shrink-0 items-center gap-2 rounded-full border border-amber-300 bg-white px-1.5 py-1">
                      <Button text="-" onClick={() => {}} />

                      <span className="min-w-5 text-center text-sm font-bold text-amber-900">
                        1
                      </span>

                      <Button text="+" onClick={() => {}} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="shrink-0 border-t border-amber-200 bg-amber-50 px-5 py-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-amber-700/70">
                    <span>Subtotal</span>
                    <span>110 SAR</span>
                  </div>

                  <div className="flex justify-between text-amber-700/70">
                    <span>Delivery Fee</span>
                    <span>+40 SAR</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3 border-t border-amber-200" />

            <div className="px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900">Total</span>

                <span className="text-lg font-bold text-amber-700">
                  150 SAR
                </span>
              </div>
              <button
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
