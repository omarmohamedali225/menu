import type React from "react";
import { NavLink } from "react-router";

type TypeCartHeader = {
  data: {
    title: string;
    count: number;
    url: string;
    icon: React.ReactElement;
  };
};

export default function CartHeader({ data }: TypeCartHeader) {
  return (
    <div className="flex p-3 flex-col bg-white rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[15px]">{data.title}</h1>
          <h1 className="text-lg font-bold">{data.count}</h1>
        </div>
        {/* <div className="bg-green-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
          <Box size={18} className="text-green-900" />
        </div> */}
        {data.icon}
      </div>
      <NavLink to={data.url} className="text-[12px] text-green-700 mr-auto">عرض الكل</NavLink>
    </div>
  );
}
