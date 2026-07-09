
export default function TabsCat() {
  return (
    <div className="border-b border-b-amber-200">
      <div className="max-w-2xl mx-auto py-3 px-4">
        <div className="flex flex-nowrap gap-2 overflow-x-scroll">
          {Array.from({ length: 10 })
            .fill("")
            .map((_, i) => (
              <button key={i} className="bg-amber-700 py-2 px-3 min-w-30 text-amber-50 rounded-full ">Cat</button>
            ))}
        </div>
      </div>
    </div>
  );
}
