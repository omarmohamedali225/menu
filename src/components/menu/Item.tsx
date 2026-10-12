// import Button from "@/components/Button";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Details from "./Details";
// import { useCartStorage } from "@/hooks/useCartStorage";
import type { ProductWithCategories } from "@/features/menu/api";
import useBack from "@/hooks/useBack";
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

  // const { data, addItem, deleteItem } = useCartStorage();

  // const exist = data.find((e) => e.id === product.id && e.type === "product");

  // const handleAdd = (p: ProductWithCategories) => {
  //   const data: CartType = {
  //     type: "product",
  //     id: p.id,
  //     extra: [],
  //     quantity: 1,
  //   };
  //   addItem(data);
  // };

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
        className="bg-white flex flex-col sm:flex-row p-2 rounded-2xl select-none group border border-amber-100 shadow"
      >
        <div className="relative w-full h-28 sm:w-26 md:h-26 shrink-0 overflow-hidden">
          <img
            src={
              "https://placehold.co/600x600/fef3c7/b45309/webp?text=" +
              product.name_en
            }
            className="w-full h-full aspect-square object-cover group-hover:scale-105 transition-transform"
            alt=""
          />
        </div>
        <div className="p-2 flex flex-col flex-1  space-y-2">
          <h1>{product.name_ar}</h1>
          {product.extras.length > 0 && (
            <p className="text-[10px] bg-[#FBEACB] text-[#7A2E00] w-fit py-1 px-2 text-sm rounded-2xl tracking-wider">
              إضافات متاحة
            </p>
          )}
          <div className="flex mt-auto justify-between items-center">
            <h2 className="text-lg text-amber-700 font-extrabold text-left mr-auto">
              {product.price}{" "}
              <small className="font-normal text-xs">جنية</small>
            </h2>
            {/* {!exist ? (
              <button
                className="rounded-full text-3xl cursor-pointer hover:bg-[#7a2f00d0] transition-colors bg-[#7A2E00] text-[#FBEACB] w-11 h-11 shadow shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdd(product);
                }}
              >
                +
              </button>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                className="justify-center flex shrink-0 items-center gap-2 rounded-lg border-amber-800"
              >
                <button
                  className="rounded-full text-xl cursor-pointer hover:bg-[#7a2f00d0] transition-colors bg-[#7A2E00] text-[#FBEACB] w-11 h-11 shadow shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(exist);
                  }}
                >
                  -
                </button>

                <span className="min-w-5 text-center text-sm font-bold text-amber-900">
                  {exist.quantity}
                </span>

                <button
                  className="rounded-full text-xl cursor-pointer hover:bg-[#7a2f00d0] transition-colors bg-[#7A2E00] text-[#FBEACB] w-11 h-11 shadow shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(exist);
                  }}
                >
                  +
                </button>
              </div>
            )} */}
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
