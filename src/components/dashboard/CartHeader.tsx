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
  const isLoading = !data.count && data.count !== 0;
  return (
    <div className="flex p-3 flex-col bg-white hover:-translate-y-1 transition-transform rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[12px] text-mute">{data.title}</h1>
          <h2 className="text-2xl font-bold text-primary">
            {data.count}{" "}
            {isLoading && (
              <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
            )}
          </h2>
        </div>

        {data.icon}
      </div>
    </div>
  );
}
