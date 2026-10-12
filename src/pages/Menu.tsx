// import Notification from "@/components/Notifications";
import Offer from "@/components/menu/Offer";
import SectionCatItems from "@/components/menu/SectionCatItems";
import TabsCat from "@/components/menu/TabsCat";
import { useCart } from "@/contexts/CartContext";
import { useCartStorage } from "@/hooks/useCartStorage";
// import TabsCat from "@/components/TabsCat";
// import InstallApp from "@/components/InstallApp";
export default function Menu() {
  return (
    <div className="relative">
      {/* <Notification /> */}
      {/* <InstallApp /> */}
      <Offer />
      {/* <SectionCatItems catName={"Most Ordered 🔥"} /> */}
      <TabsCat />
      <SectionCatItems />
      <CartButton />
      <Loader />
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
      className="fixed bottom-2 z-50 left-[50%] -translate-x-1/2 bg-amber-800 w-[80%] max-w-75 rounded-xl flex justify-between items-center px-4 py-3 text-white hover:bg-amber-700 active:scale-95 transition-colors"
    >
      العربة{" "}
      <span className="bg-white h-8 w-8 rounded-full place-content-center shadow text-amber-800">
        {data.length}
      </span>
    </motion.button>
  );
}

import { useEffect, useState } from "react";
import { motion } from "motion/react";

function Loader() {
  const [hide, setHide] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const finish = () => {
      timer = setTimeout(() => setHide(true), 3000);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`loader ${hide ? "loader--hide" : ""}`}
      onTransitionEnd={() => hide && setRemoved(true)}
    >
      <div className="scene">
        <span className="steam s1" />
        <span className="steam s2" />
        <span className="steam s3" />

        <div className="dome" />
        <div className="food" />
        <div className="plate" />
      </div>

      <p className="loader__text">
        جاري تحضير المنيو
        <span className="dots" />
      </p>
    </div>
  );
}
