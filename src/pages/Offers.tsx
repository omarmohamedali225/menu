import AddOffer from "@/components/dashboard/AddOffer";
import ItemOffer from "@/components/dashboard/ItemOffer";
import { useOffer } from "@/features/menu/hooks";

export default function Offers() {
  const { data, isLoading, isError } = useOffer();

  return (
    <>
      <div className="p-4 space-y-3">
        <h1>إدارة العروض</h1>
        <h3 className="text-sm text-mute">ضيف او امسح اي عرض لعملاءك</h3>
        <AddOffer />{" "}
      </div>
      <div className="p-4 space-y-3 clear-end">
        {/* shorts */}
        <ul>
          {data?.map((e) => (
            <ItemOffer key={e.id} data={e} />
          ))}

          {data&&data.length<=0&&<p className="text-sm text-center bg-red-200 text-red-900 w-fit mx-auto px-1 mt-5">مفيش عروض حتي الان</p>}
        </ul>
        {isLoading && (
          <p className="text-sm text-center flex items-center justify-center gap-2">
            ...جاري التحميل{" "}
            <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
          </p>
        )}
        {isError && (
          <p className="text-sm text-center">
            ...حصل خطا في التحميل اعد المحاولة لاحقا
          </p>
        )}
      </div>
    </>
  );
}
