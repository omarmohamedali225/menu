import Button from "@/components/Button";

export default function Product() {
  return (
    <div className="bg-red-300 grid grid-cols-2">
      <div className="px-2 pt-4">
        <h1 className="font-bold text-2xl">Grill Chicken</h1>
        <p className="text-xs text-[#92400e99] line-clamp-2 tracking-wider">
          Delicious grilled chicken with a hint of spices. Delicious grilled
          chicken with a hint of spices.
        </p>
        <h1 className="mt-2 text-amber-700 font-bold">120 EGP <span className="text-xs">x1</span></h1>
        <div className="flex gap-2 justify-end">
          <Button
            text="-"
            onClick={() => {
            //   setCount((e) => Math.max(e - 1, 0));
            }}
          />
          <span>0</span>
          <Button
            text="+"
            onClick={() => {
            //   setCount((e) => Math.min(e + 1, 49));
            }}
          />
        </div>
      </div>
      <img
        src="test.webp"
        alt=""
        className="bg-red-300 min-w-full object-cover"
      />
    </div>
  );
}
