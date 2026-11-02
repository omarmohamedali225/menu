import React, { memo } from "react";

type TypeCartHeader = {
  data: {
    title: string;
    count: number;
    countAvailable: number;
    url: string;
    icon: React.ReactElement;
    loading: boolean;
  };
};

function CartHeader({ data }: TypeCartHeader) {
  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    e.currentTarget.style.setProperty("--x", x + "px");
    e.currentTarget.style.setProperty("--y", y + "px");
  }
  return (
    <div
      onPointerMove={onMove}
      className="flex p-3 flex-col bg-white card hover:-translate-y-1 transition-transform rounded-lg shadow border border-gray-200"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[12px] text-mute">{data.title}</h1>
          <h2 className="text-2xl font-bold text-primary">
            {data.loading ? (
              <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
            ) : (
              <>
                {data.countAvailable}
                <span className="text-[10px]">من اصل {data.count} منتج</span>
              </>
            )}
          </h2>
        </div>

        {data.icon}
      </div>
    </div>
  );
}

export default memo(CartHeader);
