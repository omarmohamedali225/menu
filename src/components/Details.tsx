import Button from "@/components/Button";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Details({ product, onclick }: any) {
  const [count, setCount] = useState(1);
  return (
    <div className="fixed inset-0 z-1">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onclick}
      ></div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col w-full h-[90%] max-w-lg  bg-amber-50 rounded"
      >
        <div className="relative">
          <span className="flex justify-end px-2 pt-1">
            <X className="text-amber-700 cursor-pointer" />
          </span>
          <div className="flex justify-between pt-2 px-4">
            <img
              src="test.webp"
              alt=""
              className="h-50 w-full object-fill rounded"
            />
          </div>
          <div className="h-full px-4">
            <div className="flex py-2 flex-col">
              <div className="flex-1">
                <h1 className="text-sm">{product.name}</h1>
                <p className="text-xs text-[#92400e99] line-clamp-2 tracking-wider">
                  {product.description}
                </p>
                <h2 className="text-sm text-amber-700 font-bold">
                  {product.price} EGP
                </h2>
                <input
                  type="text"
                  placeholder="ملاحظة بدون بصل او بدون مخلل"
                  className="border border-amber-700 px-2 py-3 outline-0 text-sm rounded w-full my-2"
                />
              </div>
            </div>
          </div>
          <div className="fixed bottom-1 w-full p-2">
            <div className="flex justify-between mb-2">
              <h2 className="text-sm text-amber-700 font-bold">
                Total : <b>{product.price * count} EGP</b>
              </h2>
              <div className="flex gap-2 justify-end">
                <Button
                  text="-"
                  onClick={() => {
                    setCount((e) => Math.max(e - 1, 0));
                  }}
                />
                <span>{count}</span>
                <Button
                  text="+"
                  onClick={() => {
                    setCount((e) => Math.min(e + 1, 49));
                  }}
                />
              </div>
            </div>
            <button className="w-full bg-amber-700 text-amber-50 rounded p-2">
              Add To Cart
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
