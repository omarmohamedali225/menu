// import Button from "@/components/Button";
import { Button } from "antd";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Details from "./Details";
import { useCartStorage } from "@/hooks/useCartStorage";
import type { ProductWithCategories } from "@/features/menu/api";
import useBack from "@/hooks/useBack";
import type { CartType } from "@/types/Products";

export default function Item({ product }: { product: ProductWithCategories }) {
  // const { t } = useTranslation();
  const [selectProduct, setSelectProduct] =
    useState<ProductWithCategories | null>(null);
  useEffect(() => {
    document.body.style.overflow = selectProduct ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectProduct]);

  const { data, addItem, deleteItem } = useCartStorage();

  const exist = data.find((e) => e.id === product.id);

  const handleAdd = (p: ProductWithCategories) => {
    const data: CartType = {
      id: p.id,
      extra: [],
      quantity: 1,
    };
    addItem(data);
  };

  const { addEventModal } = useBack(!!selectProduct, () =>
    setSelectProduct(null),
  );

  return (
    <>
      <motion.div
        onClick={() => {
          setSelectProduct(product);
          addEventModal();
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl select-none group border border-amber-100 shadow"
      >
        <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
          <img
            src={
              "https://placehold.co/600x600/fef3c7/b45309/webp?text=" +
              product.name_en
            }
            className="w-full aspect-square rounded-tl-2xl rounded-tr-2xl object-cover group-hover:scale-105 transition-transform"
            alt=""
          />
          {/* <span className="absolute bottom-1 left-1 bg-amber-700/90 text-amber-50 rounded-2xl py-1 px-2 text-[11px]">
            غير معرف
          </span> */}
          {exist && (
            <span className="absolute top-1 right-1 min-w-5 h-5 flex items-center bg-amber-700/90 text-amber-50 rounded-2xl py-1 px-2 text-[11px]">
              {exist.quantity} قطع في العربة
            </span>
          )}
        </div>
        <div className="p-2 space-y-2">
          <h1 className="text-sm line-clamp-2 font-bold">{product.name_ar}</h1>
          <p className="text-xs text-[#92400e99] line-clamp-2 tracking-wider">
            {product.name_ar}
          </p>
          <h2 className="text-sm text-amber-700">{product.price} جنية</h2>
          <div className="flex justify-end">
            {/* <Button text={t("addToCart")} /> */}
            {!exist && (
              <div className="flex-1 justify-center flex-col md:flex-row flex shrink-0 items-center gap-2 rounded-lg bg-white px-1.5 py-1">
                {/* <Button
                  variant="outlined"
                  className="w-full"
                  styles={{
                    root: { padding: "20px" },
                  }}
                >
                  خش اتفرج
                </Button> */}
                <Button
                  variant="outlined"
                  className="w-full"
                  styles={{
                    root: { padding: "20px" },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdd(product);
                  }}
                >
                  أضافة للسلة
                </Button>
              </div>
            )}
            {exist && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex-1 justify-center flex shrink-0 items-center gap-2 rounded-lg border border-amber-800 bg-white px-1.5 py-1"
              >
                <Button
                  onClick={() => {
                    deleteItem(exist);
                  }}
                >
                  -
                </Button>

                <span className="min-w-5 text-center text-sm font-bold text-amber-900">
                  {exist.quantity}
                </span>

                <Button
                  onClick={() => {
                    addItem(exist);
                  }}
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* model */}
      {selectProduct && (
        <Details
          product={selectProduct}
          onclick={() => {
            setSelectProduct(null);
          }}
        />
      )}
    </>
  );
}
