import AddExtra from "@/components/dashboard/AddExtra";
import ItemExtra from "@/components/dashboard/ItemExtra";
import { useExtras } from "@/features/menu/hooks";

export default function Extras() {
  const { data, isLoading, isError } = useExtras();
  return (
    <div className="p-4 space-y-3">
      <h1>إدارة الإضافات</h1>
      <h3 className="text-sm text-mute">
        قوم باضافة او تعديل الاضافات لكل صنف
      </h3>
      {/* shorts */}
      <AddExtra />
      <ul>
        {data?.map((e) => (
          <ItemExtra key={e.id} data={e} />
        ))}
        {data && data.length <= 0 && (
          <p className="text-sm text-center bg-red-200 text-red-900 w-fit mx-auto px-1 mt-5">
            مفيش اضافات حتي الان
          </p>
        )}
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
  );
}
