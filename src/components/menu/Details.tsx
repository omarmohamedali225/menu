// import Button from "@/components/Button";
import type { ProductsType } from "@/types/Products";
import { Checkbox, InputNumber, Button, Input } from "antd";
import { Star, X } from "lucide-react";
import { motion } from "motion/react";

export default function Details({
  product,
  onclick,
  cat,
}: {
  product: ProductsType;
  onclick: () => void;
  cat: string;
}) {
  return (
    <div className="fixed inset-0 z-100">
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onclick}
      ></motion.div>

      <motion.div
        initial={{ y: "100%" }}
        exit={{ y: "100%" }}
        animate={{ y: 0 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full md:max-h-[90vh] bg-amber-50 md:rounded-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center h-full overflow-y-auto scrollbar-none">
          <span
            className="absolute top-0 right-0 justify-end px-2 pt-1 bg-white z-50"
            onClick={onclick}
          >
            <X className="text-amber-700 cursor-pointer" />
          </span>
          <div className="h-full md:sticky md:top-0 flex items-center">
            <div className="h-[60vh] aspect-square p-4">
              <img
                src="test.webp"
                alt=""
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="px-4 py-8 h-full">
            <div className="flex py-2 flex-col">
              <div className="">
                <h1 className="text-sm text-amber-500 font-bold">#{cat}</h1>
                <h1 className="text-3xl font-bold text-amber-700">
                  {product.name_ar}
                </h1>
                <p className="text-xs my-3 text-[#92400e99] line-clamp-2 tracking-wider">
                  مفيش كلام يتقال يصحبي ده اكل مصري اطلب هيعجبك والنجوم 10 من 10
                  مصري بقولك😊❤
                </p>
                <div className="flex my-3">
                  <Star fill="#bb4d00" stroke="none" />
                  <Star fill="#bb4d00" stroke="none" />
                  <Star fill="#bb4d00" stroke="none" />
                  <Star fill="#bb4d00" stroke="none" />
                  <Star fill="#bb4d00" stroke="none" />
                </div>
                <h2 className="text-sm my-3 float-right text-amber-700 font-bold">
                  {product.price} جنية
                </h2>
                <h1 className="text-sm my-5 clear-both text-amber-700 font-bold">
                  لو عاوز اضافة
                </h1>

                <div className="flex flex-col gap-3">
                  <label className="flex w-full cursor-pointer items-center gap-2">
                    <Checkbox value={"suger"} />

                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">حبة عدس</span>
                      <span className="text-amber-700">+5 جنية</span>
                    </div>
                  </label>
                  <label className="flex w-full cursor-pointer items-center gap-2">
                    <Checkbox />

                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm">شويه شوربة</span>
                      <span className="text-amber-700">+5 جنية</span>
                    </div>
                  </label>
                </div>
                <h1 className="text-sm my-5 flex justify-between clear-both text-amber-700 font-bold">
                  هتدفع دول بس
                  <span>200 جنية</span>
                </h1>
                <div className="flex justify-center my-4">
                  {" "}
                  <InputNumber
                    placeholder="num"
                    min={1}
                    max={49}
                    defaultValue={1}
                    mode="spinner"
                    variant="borderless"
                    classNames={{}}
                  />
                </div>
                <Input
                  styles={{
                    input: { color: "#bb4d00" },
                    root: { borderColor: "#b45309" },
                  }}
                  type="text"
                  placeholder="ملاحظة بدون بصل او بدون مخلل"
                  className="border border-amber-700 px-2 py-2 min-h-16 outline-0 text-sm rounded w-full my-2"
                />
                <Button
                  variant="outlined"
                  className="w-full my-4 hover:scale-95 active:scale-100"
                  styles={{
                    content: { color: "#bb4d00" },
                    root: { borderColor: "#b45309", padding: "20px" },
                  }}
                >
                  حط في السلة يباشا
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
