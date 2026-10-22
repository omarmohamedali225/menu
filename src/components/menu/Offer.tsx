import { useOffer } from "@/features/menu/hooks";
import { motion } from "motion/react";
import { useCartStorage } from "@/hooks/useCartStorage";
export default function Offer() {
  const { data, isLoading, isError } = useOffer();
  const { addItem } = useCartStorage();

  if (isError) {
    <p className="text-sm text-center">
      ...حصل خطا في التحميل اعد المحاولة لاحقا
    </p>;
  }

  if (isLoading) {
    return (
      <div className="py-2">
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
        className="rounded-2xl overflow-hidden flex gap-2 snap-x snap-mandatory scrollbar-none overflow-x-auto"
      >
        {data
          ?.filter((d) => d.is_available)
          .map((e) => (
            <div
              key={e.id}
              className={`${data.length > 1 ? "w-[90%]" : "w-full"} shrink-0 snap-start relative`}
            >
              {/* <img
              src="/offer1.png"
              className="w-full object-cover aspect-8/3 max-h-64"
              alt="Offer"
            /> */}
              <div className="w-full aspect-8/3 p-2 max-h-64 bg-primary text-white">
                <h1 className="text-mute">عرض حصري</h1>
                <div className="text-left">
                  <h2 className="text-xl font-bold ">{e.title}</h2>
                  <h3>{e.description}</h3>
                  <p>
                    بسعر <b>{e.price}</b> فقط
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  addItem({ id: e.id, quantity: 1, type: "offer" })
                }
                className="py-1 px-2 cursor-pointer bg-primary text-white rounded absolute bottom-2 right-2"
              >
                اطلب دلوقتي
              </button>
            </div>
          ))}
      </motion.div>
    </div>
  );
}
