// import Button from "@/components/Button";
import type { ProductWithCategories } from "@/features/menu/api";
import { useCartStorage } from "@/hooks/useCartStorage";
import { Checkbox, Button, Modal } from "antd";
import { Star } from "lucide-react";
import { useState } from "react";

type Fake = {
  id: number;
  price: number;
  name: string;
};

export default function Details({
  product,
  onclick,
}: {
  product: ProductWithCategories;
  onclick: () => void;
}) {
  const { addItem, data } = useCartStorage();

  const { price } = product;
  const [moreAdd, setMoreAdd] = useState<Fake[]>();
  const [quantity, setQuantity] = useState<number>(1);
  const morePrice = moreAdd?.reduce((val, c) => {
    const res = val + c.price;
    return res;
  }, 0);

  let total = Number(price);

  if (morePrice) {
    total += morePrice;
  }

  const isExisting = data.find((e) => e.id === product.id);

  total = total * quantity;

  function handleCart() {
    const res = {
      id: product.id,
      quantity: quantity,
      extra: moreAdd ? moreAdd.map((e) => e.id) : [],
    };
    addItem(res);
    onclick();
  }

  // window.addEventListener("popstate", onclick);

  return (
    <Modal
      open
      width={{ xs: "95%", md: "90%", lg: "60%" }}
      centered
      footer={() => (
        // isExisting ? (
        //   <p className="text-xs my-3 text-center text-[#92400e99] line-clamp-2 tracking-wider">
        //     المنتج متضاف يصحبي في العربية
        //   </p>
        // )
        <>
          <h1 className="text-sm my-5 flex justify-between clear-both text-amber-700 font-bold">
            هتدفع دول بس
            <span>{total | 0} جنية</span>
          </h1>

          <Button
            variant="outlined"
            className="w-full my-4 hover:scale-95 active:scale-100"
            styles={{
              content: { color: "#bb4d00" },
              root: { borderColor: "#b45309", padding: "20px" },
            }}
            onClick={handleCart}
          >
            {isExisting && ""}
            ضيف في السلة يصحبي
          </Button>
        </>
      )}
      // styles={{ body: { height: "70vh" } }}
      classNames={{
        body: "md:h-[70vh]",
        container: "md:pb-0! [&_.ant-modal-close]:!end-auto",
      }}
      onCancel={onclick}
    >
      <div className="flex flex-col md:flex-row items-center h-full overflow-y-auto scrollbar-thumb-amber-600 scrollbar-thin">
        <div className="h-full md:sticky md:top-0 flex items-center">
          <div className="aspect-square max-w-95 p-4">
            <img
              src="test.webp"
              alt=""
              className="md:h-full w-50 xs:h-[50dvh] aspect-square object-cover rounded-xl"
            />
          </div>
        </div>
        <div className="px-4 py-8 h-full">
          <div className="flex py-2 flex-col">
            <div className="">
              <h1 className="text-sm text-amber-500 font-bold">
                #{product.categories?.name_ar}
              </h1>
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
              {product.extras.length > 0 && (
                <>
                  <h1 className="text-sm my-5 clear-both text-amber-700 font-bold">
                    لو عاوز اضافة
                  </h1>

                  <div className="flex flex-col gap-3">
                    <Checkbox.Group
                      value={moreAdd}
                      className="flex flex-col gap-4"
                      onChange={(e) => {
                        setMoreAdd(e);
                      }}
                    >
                      {product.extras.map((e) => (
                        <Checkbox
                          value={e}
                          key={e.id}
                          classNames={{ label: "w-full" }}
                        >
                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm">
                              {e.name_ar}
                              <sub>{quantity}x</sub>
                            </span>
                            <span className="text-amber-700">
                              +{e.price} جنية
                            </span>
                          </div>
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </div>
                </>
              )}

              <h1 className="text-sm my-5 flex justify-between clear-both text-amber-700 font-bold">
                كام واحد هياكل
                <span>
                  {quantity} {quantity > 1 ? "أشخاص" : "شخص"}
                </span>
              </h1>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex-1 justify-center flex shrink-0 items-center gap-2 rounded-lg border border-amber-800 bg-white px-1.5 py-1"
              >
                <Button
                  className="flex-1"
                  onClick={() => {
                    setQuantity(Math.max(Number(quantity - 1), 1));
                  }}
                >
                  -
                </Button>

                <span className="min-w-5 text-center text-sm font-bold text-amber-900">
                  {quantity}
                </span>

                <Button
                  className="flex-1"
                  onClick={() => {
                    setQuantity(Math.min(Number(quantity + 1), 49));
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
