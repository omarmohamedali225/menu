import { motion } from "motion/react";
export default function Offer() {
  return (
    <div className="py-2 overflow-hidden bg-main">
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
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        <img
          src="/offer.webp"
          className="w-full object-cover h-44"
          alt="Offer"
        />
      </motion.div>
    </div>
  );
}
