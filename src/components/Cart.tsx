import Button from "@/components/Button";
import { useCart } from "@/contexts/CartContext";
import { X } from "lucide-react";
import { motion } from "motion/react";

export default function Cart() {
  const { handlerClose, open } = useCart();

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-1 flex justify-center items-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handlerClose}
      ></div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col w-full mx-2 h-full max-w-lg max-h-80 bg-amber-50 rounded-2xl"
      >
        <div className="flex justify-between pt-2 px-4 border-b border-amber-500">
          <h1 className="text-amber-700 font-bold text-lg tracking-tight">
            Your Order
          </h1>
          <span onClick={handlerClose}>
            <X className="text-amber-700 cursor-pointer " />
          </span>
        </div>
        <div className="px-4 flex flex-col">
          <div className="overflow-y-auto flex-1 min-h-0 bg-red-300">
            {Array.from({ length: 2 })
              .fill("")
              .map(() => (
                <div className="flex py-2">
                  <div className="flex-1">
                    <h1 className="text-sm">Grilled Chicken</h1>
                    <h2 className="text-sm text-amber-700 font-bold">
                      110 SAR
                    </h2>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      text="-"
                      onClick={() => {
                        //   setCount((e) => Math.max(e - 1, 0));
                      }}
                    />
                    <span>0</span>
                    <Button
                      text="+"
                      onClick={() => {
                        //   setCount((e) => Math.min(e + 1, 49));
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="pb-2">
            <hr className="w-full mx-auto text-amber-700" />
            <div className="pt-2 flex justify-between text-sm text-amber-700">
              <h1>Subtotal</h1>
              <h2>110 SAR</h2>
            </div>
            <div className="pt-2 flex justify-between text-sm text-amber-700">
              <h1>Delivery Fee</h1>
              <h2>+40 SAR</h2>
            </div>
            <div className="pt-2 flex justify-between">
              <h1 className="font-bold">Total</h1>
              <h2 className="text-sm text-amber-700">150 SAR</h2>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-400 transition-colors text-amber-50 rounded p-2">
              اطلب وتابع ع الواتس
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
/*
function isEmpty() {
  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-amber-700">Your Cart is Empty</h1>
    </div>
  );
}
*/
