// import Button from "@/components/Button";
import type { ProductsType } from "@/types/Products";
import { Button } from "antd";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Details from "./Details";

export default function Item({ product,cat }: { product: ProductsType,cat:string }) {
  // const { t } = useTranslation();
  const [selectProduct, setSelectProduct] = useState<ProductsType | null>(null);
  useEffect(() => {
    document.body.style.overflow = selectProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectProduct]);


  return (
    <>
      <motion.div
        onClick={() => {
          setSelectProduct(product);
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl select-none group border border-amber-100 shadow"
      >
        <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
          <img
            src="/test.webp"
            className="w-full aspect-square rounded-tl-2xl rounded-tr-2xl object-cover group-hover:scale-105 transition-transform"
            alt=""
          />
          <span className="absolute bottom-1 left-1 bg-amber-700/90 text-amber-50 rounded-2xl py-1 px-2 text-[11px]">
            غير معرف
          </span>
          <span className="absolute top-1 right-1 min-w-5 h-5 flex items-center bg-amber-700/90 text-amber-50 rounded-2xl py-1 px-2 text-[11px]">
            غير معرف
          </span>
        </div>
        <div className="p-2 space-y-2">
          <h1 className="text-sm line-clamp-2 font-bold">{product.name_ar}</h1>
          <p className="text-xs text-[#92400e99] line-clamp-2 tracking-wider">
            {product.name_ar}
          </p>
          <h2 className="text-sm text-amber-700">{product.price} جنية</h2>
          <div className="flex justify-end">
            {/* <Button text={t("addToCart")} /> */}
            <Button
              variant="outlined"
              className="w-full hover:scale-95 active:scale-100"
              styles={{
                content: { color: "#bb4d00" },
                root: { borderColor: "#b45309", padding: "20px" },
              }}
            >
              خش اتفرج
            </Button>
          </div>
        </div>
      </motion.div>

      {/* model */}
      <AnimatePresence>
        {selectProduct && (
          <Details
            product={selectProduct}
            cat={cat}
            onclick={() => {
              setSelectProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
