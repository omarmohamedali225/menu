import Button from "@/components/Button";
import { useCart } from "@/contexts/CartContext";
// import i18next from "i18next";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
// import { useTranslation } from "react-i18next";
import { useCartStorage } from "@/hooks/useCartStorage";

export default function Navbar() {
  const { handlerOpen } = useCart();
  // const { t } = useTranslation();

  const { data } = useCartStorage();

  return (
    <div className="border-b border-b-amber-200 sticky top-0 bg-main z-1">
      <div className="max-w-4xl mx-auto py-3 px-4 border-b-amber-800">
        <div className="flex items-center gap-3">
          <motion.img
            animate={{ rotate: 360 }}
            transition={{
              repeat: 1,
              duration: 2,
              ease: "linear",
              type: "spring",
            }}
            src="logo.webp"
            alt="Logo"
            className="w-14 h-14 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-6">البركة</h1>
            <p className="font-medium truncate text-[11px] text-[#92400e99] uppercase">
              أشهى الأكلات المصرية الطازجة تُوصَل إلى باب منزلك.
            </p>
          </div>
          <div className="space-x-1 flex">
            {/* <Button text={t("btnChangeLocal")} onClick={handleLocal} /> */}
            <Button onClick={handlerOpen}>
              <ShoppingCart size={18} />
              {data.length>0 && (
                <span className="absolute -top-2 ltr:-right-2 rtl:-left-2 bg-amber-900 text-amber-100 p-1 rounded-full min-w-5 h-5 text-[10px] flex justify-center items-center border border-amber-50">
                  {data.length}
                </span>
              )}
            </Button>

            {/* <button className="relative bg-amber-100 text-amber-900 rounded-full py-1 px-2 font-bold text-xs hover:bg-amber-200 transition-colors">
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
