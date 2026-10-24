import { useCart } from "@/contexts/CartContext";
// import i18next from "i18next";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
// import { useTranslation } from "react-i18next";
import { useCartStorage } from "@/hooks/useCartStorage";
import { NumberAr } from "@/helpers/helper";
import { useProfile } from "@/features/menu/hooks";

export default function Navbar() {
  const { handlerOpen } = useCart();
  const { data } = useCartStorage();

  const { data: profile } = useProfile();

  return (
    <div className="border-b border-b-amber-200 sticky top-0 bg-gray-100 z-1">
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
            <h1 className="text-xl font-bold text-primary">{profile?.name}</h1>
            <p className="font-medium truncate text-[11px] text-[#92400e99]">
              أشهى الأكلات المصرية الطازجة.
            </p>
          </div>
          <div className="space-x-1 flex">
            {/* <Button text={t("btnChangeLocal")} onClick={handleLocal} /> */}
            <button
              className="relative p-2 bg-white rounded-full"
              onClick={handlerOpen}
            >
              <ShoppingCart size={15} />
              {data.length > 0 && (
                <span className="absolute -top-2 ltr:-right-2 rtl:-left-2 bg-amber-900 text-amber-100 p-1 rounded-full min-w-5 h-5 text-[10px] flex justify-center items-center border border-amber-50">
                  {NumberAr(data.length)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
