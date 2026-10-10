import AddProduct from "@/components/dashboard/AddProduct";
import TableDashboard from "@/components/dashboard/TableDashboard";
import { Menu } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4">
      <div className="flex mb-5 gap-2 sticky top-0 z-1 bg-white p-4">
        <Menu className="block md:hidden cursor-pointer" />
        <h1 className="">صفحة المنتجات</h1>
      </div>
      <AddProduct />
      <TableDashboard />
    </div>
  );
}
