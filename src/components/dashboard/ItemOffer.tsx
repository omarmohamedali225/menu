import { Dropdown, Modal } from "antd";
import { useState } from "react";
import AvailableSwitch from "./AvailableSwitch";
import { Ellipsis } from "lucide-react";
import type { OffersTypeApi } from "@/features/menu/api";
import { useRemoveOffer } from "@/features/dashboard/hooks";

export default function ItemOffer({ data }: { data: OffersTypeApi }) {
  const [item, setItem] = useState<OffersTypeApi | null>(null);
  const { mutate: removeOffer, isPending: loadRemove } = useRemoveOffer();
  return (
    <>
      <li className="flex my-3 justify-between border border-gray-200 rounded-lg px-2 py-1">
        <div>
          <h2 className="text-sm">{data.title}</h2>
          <h3 className="text-[12px] mt-1 text-gray-400">{data.description}</h3>
          <h5 className="text-[12px] mt-1 text-gray-400">سعر {data.price} ج.م</h5>
        </div>
        <div>
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <AvailableSwitch
                      id={data.id}
                      value={data.is_available}
                      table={"offers"}
                    />
                  ),
                },
                { key: 3, label: "" },
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
          >
            <Ellipsis className="w-full cursor-pointer" size={17} />
          </Dropdown>
        </div>
      </li>

      {item && (
        <Modal
          open={Boolean(item)}
          title={"حذف عرض"}
          okText={"ايوه امسح"}
          cancelText={"تراجع"}
          onCancel={() => setItem(null)}
          onOk={() => {
            removeOffer(item.id, { onSuccess: () => setItem(null) });
          }}
          confirmLoading={loadRemove}
        >
          <h1>
            هل انت متأكد انك تريد حذف عرض <b>{item?.title}</b>
          </h1>
          <p>
            العرض {item?.is_available ? "متاح" : "مش متاح"} وسعره{" "}
            <b>
              {item?.price} جنية تم إنشاءه في تاريخ {item?.created_at}
            </b>{" "}
          </p>
        </Modal>
      )}
    </>
  );
}
