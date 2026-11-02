import TableOrders from "@/components/dashboard/TableOrders";

export default function Orders() {
  return (
    <div className="p-4 space-y-3">
      <h1>إدارة الطلبات</h1>
      <h3 className="text-sm text-mute">طلباتك مستنياك</h3>
      {/* shorts */}
      <TableOrders/>
    </div>
  );
}
