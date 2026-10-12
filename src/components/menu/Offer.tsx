import { useOffer } from "@/features/menu/hooks";
import { motion } from "motion/react";
import { useCartStorage } from "@/hooks/useCartStorage";
export default function Offer() {
  const { data, isLoading } = useOffer();
  const { addItem } = useCartStorage();

  if (isLoading) {
    return (
      <div className="py-2 bg-main">
        <div className="aspect-8/3 max-h-64 rounded-2xl bg-black/5 animate-pulse" />
      </div>
    );
  }
  

  return (
    <div className="py-2 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        // transition={{
        //   duration: 1.1,
        //   ease: "anticipate",
        // }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 8,
        }}
        className="rounded-2xl overflow-hidden shadow-lg relative"
      >
        {data?.filter(d=>d.is_available).map((e) => (
          <div key={e.id}>
            <img
              src="/offer1.png"
              className="w-full object-cover aspect-8/3 max-h-64"
              alt="Offer"
            />
            <button
              onClick={() => addItem({ id: e.id, quantity: 1, type: "offer" })}
              className="py-1 px-2 cursor-pointer bg-amber-800 text-white rounded absolute bottom-2 right-2 hover:bg-amber-700 shadow"
            >
              اطلب دلوقتي
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
