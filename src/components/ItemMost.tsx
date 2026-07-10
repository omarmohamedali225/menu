import Button from "@/components/Button";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function ItemMost({ product, onclick }: any) {
  const { t } = useTranslation();

  return (
    <motion.div
      onClick={onclick}
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      className="bg-white rounded-2xl select-none group border border-amber-100 shadow"
    >
      <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        <img
          src="/test.webp"
          className="w-full rounded-tl-2xl rounded-tr-2xl h-26 object-cover group-hover:scale-105 transition-transform"
          alt=""
        />
        <span className="absolute bottom-1 left-1 bg-amber-700/90 text-amber-50 rounded-2xl py-1 px-2 text-[11px]">
          Save 40 EGP
        </span>
        <span className="absolute top-1 right-1 min-w-5 h-5 flex items-center bg-amber-700/90 text-amber-50 rounded-2xl py-1 px-2 text-[11px]">
          99
        </span>
      </div>
      <div className="p-2">
        <h1 className="text-sm line-clamp-2 font-bold">{product.name}</h1>
        <p className="text-xs text-[#92400e99] line-clamp-2 tracking-wider">
          {product.description}
        </p>
        <h2 className="text-sm text-amber-700">19.99 egp</h2>
        <div className="flex justify-end">
          <Button text={t("addToCart")} />
        </div>
      </div>
    </motion.div>
  );
}
