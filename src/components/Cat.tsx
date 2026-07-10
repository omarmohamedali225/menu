import { motion } from "motion/react";
export default function Cat({ catName }: { catName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, marginLeft: 20 }}
      whileInView={{ opacity: 1, marginLeft: 0 }}
      className="py-3"
    >
      <h1 className="font-medium text-amber-900 relative before:content before:absolute before:-left-2 rtl:before:-right-2 before:top-0 before:w-1 before:h-full before:bg-red-700 before:rounded-full">
        {catName}
      </h1>
    </motion.div>
  );
}
