import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Tag } from "antd";
import { useOrder } from "@/features/dashboard/hooks";

type Order = {
  id: number;
  address: string;
  created_at: string;
  customer_name: string;
  note: string;
  phone: string;
  status: "new" | "processing" | "completed" | "cancelled";
  tenant_id: string;
  total: number;
};
export default function TableOrders() {
  const { data } = useOrder();

  const columns: ColumnsType<Order> = [
    {
      title: "رقم الطلب",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "اسم العميل",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "رقم الهاتف",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "العنوان",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "الإجمالي",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `${total} ج.م`,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      render: (status: Order["status"]) => {
        const config = {
          new: { color: "blue", text: "جديد" },
          processing: { color: "orange", text: "قيد التجهيز" },
          completed: { color: "green", text: "مكتمل" },
          cancelled: { color: "red", text: "ملغي" },
        };

        const item = config[status];

        return <Tag color={item.color}>{item.text}</Tag>;
      },
    },
    {
      title: "ملاحظات",
      dataIndex: "note",
      key: "note",
      render: (note: string) => note || "—",
    },
    {
      title: "تاريخ الطلب",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) =>
        new Date(date).toLocaleString("ar-EG", {
          dateStyle: "medium",
          timeStyle: "short",
        }),
      sorter: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
  ];
  return (
    <Table
      rowKey={"id"}
      columns={columns}
      pagination={{ pageSize: 8 }}
      // loading={tableLoad()}
      dataSource={data}
      scroll={{ x: "max-content" }}
      size="small"
      classNames={{
        root: "w-full min-h-75! mt-10 relative",
        header: { cell: "border border-gray-200" },
        body: { cell: "w-fit bg-gray-100 border border-gray-200" },
        pagination: {
          root: "absolute -top-12 left-0",
          item: "bg-gray-200 [&_svg]:rotate-180",
        },
      }}
    />
  );
}
