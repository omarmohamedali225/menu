import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { NumberAr } from "@/helpers/helper";
import Offer from "@/components/menu/Offer";
import SectionCatItems from "@/components/menu/SectionCatItems";
import TabsCat from "@/components/menu/TabsCat";
import { useCart } from "@/contexts/CartContext";
import { useCartStorage } from "@/hooks/useCartStorage";

export default function Menu() {
  return (
    <div className="relative">
      <Offer />
      <TabsCat />
      <SectionCatItems />
      <CartButton />
    </div>
  );
}

function CartButton() {
  const { handlerOpen } = useCart();
  const { data } = useCartStorage();
  if (data.length <= 0) return;
  return (
    <motion.button
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      onClick={handlerOpen}
      className="fixed bottom-2 z-50 left-2 border  bg-primary w-[80%] max-w-20 rounded-xl flex justify-between items-center px-4 py-3 text-white hover:bg-[#B5122B] active:scale-95 transition-colors"
    >
      <ShoppingCart size={14} />
      <span className="h-4 px-1 w-fit text-[11px] font-bold place-content-center shadow">
        {NumberAr(data.length)}
      </span>
    </motion.button>
  );
}
