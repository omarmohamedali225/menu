import { useOffer } from "@/features/menu/hooks";
import { motion } from "motion/react";
import { useCartStorage } from "@/hooks/useCartStorage";
import { useEffect, useMemo, useRef, useState } from "react";
import { NumberAr } from "@/helpers/helper";
export default function Offer() {
  const { data, isLoading } = useOffer();
  const { addItem } = useCartStorage();
  const currentRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const root = currentRef.current;
    if (!root) return;
    const interSection = new IntersectionObserver(
      (entris) => {
        entris.forEach((e) => {
          if (e.isIntersecting) {
            setIndex(Number(e.target.getAttribute("data-index")));
          }
        });
      },
      {
        root,
        threshold: 0.6,
      },
    );
    document.querySelectorAll("[data-index]").forEach((e) => {
      interSection.observe(e);
    });
    return () => {
      interSection.disconnect();
    };
  }, [data]);

  const offers = useMemo(
    () => data?.filter((d) => d.is_available) ?? [],
    [data],
  );

  // if (isError) {
  //   return (
  //     <p className="text-sm text-center">
  //       ...حصل خطا في التحميل اعد المحاولة لاحقا
  //     </p>
  //   );
  // }
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
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 8,
        }}
        className="flex flex-col"
      >
        <div
          ref={currentRef}
          className="rounded-2xl overflow-hidden flex gap-2 snap-x snap-mandatory scrollbar-none overflow-x-auto"
        >
          {offers.map((e, i) => (
            <div
              key={e.id}
              data-index={i}
              className={`${offers.length > 1 ? "w-[90%]" : "w-full"} shrink-0 snap-start relative`}
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
                    بسعر <b>{NumberAr(e.price)} ج.م</b>{" "}
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
        </div>
        {offers.length > 0 && (
          <>
            <ul className="flex gap-1 mx-auto my-2">
              {offers.map((d, i) => (
                <li
                  key={d.id}
                  className={`${index === i ? "bg-primary" : ""} w-2 h-2 rounded-full border border-primary `}
                ></li>
              ))}
            </ul>
            <p className="text-[8px] mx-auto -mt-1">
              يتوفر {NumberAr(offers.length)} عرض
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}
