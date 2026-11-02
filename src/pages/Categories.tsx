import AddCategory from "@/components/dashboard/AddCategory";
import CategoriesItems from "@/components/dashboard/CategoriesItems";

export default function Categories() {
  return (
    <div className="p-4 space-y-3">
      <h1>إدارة التصنيفات</h1>
      <h3 className="text-sm text-mute">اداره اسهل لنظام يفهمك</h3>
      <p className="text-red-900 bg-red-200 w-fit px-1 text-[10px] rounded">
        ملاحظة الفئات اللي مش بتحتوي علي منتجات تعتبر غير نشطه للمستخدم
      </p>
      <AddCategory />
      <CategoriesItems />
    </div>
  );
}
