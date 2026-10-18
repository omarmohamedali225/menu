import type React from "react";

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
    <div className="flex p-3 flex-col bg-white hover:-translate-y-1 transition-transform rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[12px] text-gray-400">{data.title}</h1>
          <h1 className="text-2xl font-bold">{data.count}</h1>
        </div>

        {data.icon}
      </div>
    </div>
  );
}
