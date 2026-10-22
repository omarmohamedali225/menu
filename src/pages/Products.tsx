import AddProduct from "@/components/dashboard/AddProduct";
import TableProducts from "@/components/dashboard/TableProducts";

export default function Products() {
  return (
    <div className="p-4 space-y-3">
      <h1>إدارة المنتجات</h1>
      <h3 className="text-sm text-mute">اداره اسهل لنظام يفهمك</h3>
      <AddProduct />
      {/* shorts */}
      <TableProducts />
    </div>
  );
}
