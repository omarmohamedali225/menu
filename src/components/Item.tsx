import Button from "@/components/Button";
import { useState } from "react";



export default function Item({ data }: any) {
  const [count, setCount] = useState(0);
  return (
    <div className="bg-white flex justify-between gap-4 p-3 overflow-hidden flex-wrap">
      <div className="flex flex-col flex-1">
        <div className="h-full">
          <h1 className="text-sm font-medium">{data?.name}</h1>
          {data?.offer && (
            <span className="bg-[#ffe4e6] text-[#be123c] py-0.5 px-1 font-bold text-[10px] rounded-full">
              🏷️{data?.offer}
            </span>
          )}
          <p className="text-xs text-[#92400e99] line-clamp-2 tracking-wider">
            {data?.description}
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <h2>200EGP</h2>
          <div className="flex gap-2">
            <Button
              text="-"
              onClick={() => {
                setCount((e) => Math.max(e - 1, 0));
              }}
            />
            <span>{count}</span>
            <Button
              text="+"
              onClick={() => {
                setCount((e) => Math.min(e + 1, 49));
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-24 w-24 rounded-2xl flex shrink-0">
        <img
          src="/test.webp"
          className="w-full h-full object-cover rounded-2xl"
          alt=""
        />
      </div>
    </div>
  );
}
