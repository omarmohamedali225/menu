import { Dropdown, Modal } from "antd";
import { Ellipsis } from "lucide-react";
import { useMemo, useState } from "react";
import AvailableSwitch from "./AvailableSwitch";
import { useMenu, useRemoveCategory } from "@/features/dashboard/hooks";
import type { TypeCategories } from "@/features/menu/api";

export default function ItemCategory({ data }: { data: TypeCategories }) {
  const { data: products, isLoading } = useMenu();
  const [item, setItem] = useState<TypeCategories | null>(null);
  const { mutate: removeCategory, isPending: loadRemove } = useRemoveCategory();

  const count = useMemo(() => {
    const c = new Map();
    const find = products?.filter((p) => p.categories?.id === data.id);
    c.set(data.id, find?.length);
    return c;
  }, [data, products]);
  return (
    <>
      <li
        className={`${data.is_available ? (count.get(data.id) > 0 ? "bg-green-100" : "bg-red-100") : "bg-red-100"} flex my-3 justify-between border border-gray-200 rounded-lg px-2 py-1`}
      >
        <div>
          <h2 className="text-sm">{data.name}</h2>
          <h3 className="text-[12px] mt-1 text-gray-400">{data.slug}</h3>
          <p className="text-[10px] mt-1 text-gray-400">
            {isLoading ? (
              <>
                <span className="w-2 h-2 border-2 border-l-transparent inline-block rounded-full animate-spin"></span>
                <span>جاري المزامنة...</span>
              </>
            ) : (
              <>
                يحتوي علي {count.get(data.id)}{" "}
                {count.get(data.id) > 1 ? "منتجات" : "منتج"}
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col justify-between">
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <AvailableSwitch
                      id={data.id}
                      value={data.is_available}
                      table={"categories"}
                    />
                  ),
                },
                { key: 3, label: "تعديل" },
                { key: 4, label: "" },
                { key: 2, label: "حذف", danger: true },
              ],
              onClick: ({ key }) => {
                if (key === "2") {
                  setItem(data);
                }
              },
            }}
            trigger={["click"]}
            // classNames={{itemIcon:}}
          >
            <Ellipsis
              className="w-8 h-8 p-1.5 mr-auto cursor-pointer"
              size={17}
            />
          </Dropdown>
          <p className="text-[10px] text-center">
            {data.is_available
              ? count.get(data.id) > 0
                ? "يعمل"
                : "لا يعمل"
              : "لا يعمل"}
          </p>
        </div>
      </li>
      {item && (
        <Modal
          open={Boolean(item)}
          title={"حذف تصنيف"}
          okText={"ايوه امسح"}
          cancelText={"تراجع"}
          onCancel={() => setItem(null)}
          onOk={() => {
            removeCategory(item.id, { onSuccess: () => setItem(null) });
          }}
          confirmLoading={loadRemove}
        >
          <h1>
            هل انت متأكد انك تريد حذف تصنيف <b>{item?.name}</b>
          </h1>
          <p>
            التصنيف <b>{item?.is_available ? "متاح" : "مش متاح"}</b> يحتوي علي{" "}
            {count.get(data.id)} {count.get(data.id) > 1 ? "منتجات" : "منتج"}
          </p>
        </Modal>
      )}
    </>
  );
}
