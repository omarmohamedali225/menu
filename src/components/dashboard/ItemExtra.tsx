import type { ExtrasTypeApi } from "@/features/menu/api";
import AvailableSwitch from "./AvailableSwitch";

export default function ItemExtra({ data }: { data: ExtrasTypeApi }) {
  return (
    <li className="flex my-3 justify-between border border-gray-200 rounded-lg px-2 py-1">
      <div>
        <h2 className="text-sm">{data.name}</h2>
        <h3 className="text-[12px] mt-1 text-gray-400">{data.price} جنية</h3>
      </div>
      <div>
        <p className="mt-auto">
          {data.is_available ? <small>متاح</small> : <small>غير متوفر</small>}
        </p>
        <AvailableSwitch
          id={data.id}
          value={data.is_available}
          table={"extras"}
        />
      </div>
    </li>
  );
}
