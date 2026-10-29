// import Button from "@/components/Button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Details from "./Details";
// import { useCartStorage } from "@/hooks/useCartStorage";
import type { ProductWithCategories } from "@/features/menu/api";
import useBack from "@/hooks/useBack";
import { message } from "antd";
import { useCartStorage } from "@/hooks/useCartStorage";
import { NumberAr } from "@/helpers/helper";
import { Plus } from "lucide-react";
// import type { CartType } from "@/types/Products";

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

  const { addEventModal } = useBack(!!selectProduct, () =>
    setSelectProduct(null),
  );

  const { data, addItem } = useCartStorage();
  const exist = data.find((e) => e.id === product.id && e.type === "product");

  return (
    <>
      <motion.div
        onClick={() => {
          if (!product.is_available) return message.info("المنتج غير متوفر");
          setSelectProduct(product);
          addEventModal();
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white flex flex-col sm:flex-row p-2 rounded-2xl select-none group border border-amber-100 shadow"
      >
        {/* <div className="relative w-full h-28 sm:w-26 md:h-26 shrink-0 overflow-hidden"> */}
        {/* <img
            src={
              "https://placehold.co/600x600/fef3c7/b45309/webp?text=" +
              product.name
            }
            className="w-full h-full aspect-square object-cover group-hover:scale-105 transition-transform"
            alt={""}
          /> */}
        {/* <div className="w-full h-full border"></div>
          {!product.is_available && (
            <span className="absolute flex-1 top-2 left-2 bg-red-200 text-red-950 px-2 py-1 text-[10px] rounded">
              مش متوفر
            </span>
          )}
        </div> */}
        <div className="p-2 flex flex-col flex-1  space-y-2">
          <h1>{product.name}</h1>
          {product.extras.filter((e) => e.is_available).length > 0 && (
            <p className="text-[10px] bg-[#FBEACB] text-[#7A2E00] w-fit py-1 px-2 text-sm rounded-2xl tracking-wider">
              إضافات متاحة
            </p>
          )}
          {!product.is_available && (
            <span className="bg-red-200 max-w-fit text-red-950 px-2 py-1 text-[10px] rounded">
              غير متوفر حاليا
            </span>
          )}
          <div className="mt-auto">
            <h2 className="text-lg text-amber-700 font-extrabold">
              {NumberAr(product.price)}{" "}
              <small className="font-normal text-xs">ج.م</small>
            </h2>

            {product.extras.length > 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!product.is_available)
                    return message.info("المنتج غير متوفر");
                  setSelectProduct(product);
                  addEventModal();
                }}
                className="float-end border-primary border-2 text-[12px] px-1 py-0.5 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
              >
                وريني
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!product.is_available)
                    return message.info("المنتج غير متوفر");

                  addItem({
                    id: product.id,
                    quantity: 1,
                    type: "product",
                    extra: [],
                  });
                }}
                className="float-end w-6 h-6 flex items-center justify-center  border-primary border-2 text-[12px] px-1 py-0.5 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors duration-150"
              >
                {exist?.quantity ? (
                  NumberAr(exist?.quantity)
                ) : (
                  <Plus size={10} />
                )}
                {/* <small>{NumberAr(exist?.quantity)}</small> */}
              </button>
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
