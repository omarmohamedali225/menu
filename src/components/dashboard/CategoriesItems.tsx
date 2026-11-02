import ItemCategory from "./ItemCategory";
import { useCategories } from "@/features/dashboard/hooks";

export default function CategoriesItems() {
    const { data, isLoading, isError } = useCategories();

  return (
    <>
      <ul>
        {data?.map((e) => (
          <ItemCategory key={e.id} data={e} />
        ))}
        {data && data.length <= 0 && (
          <p className="text-sm text-center bg-red-200 text-red-900 w-fit mx-auto px-1 mt-5">
            مفيش تصنيفات حتي الان
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
    </>
  );
}
