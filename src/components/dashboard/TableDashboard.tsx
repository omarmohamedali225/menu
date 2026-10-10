import {
  useCategories,
  useEditCategories,
  useEditName,
  useEditPrice,
  useMenu,
} from "@/features/menu/hooks";
import { Input, Select, Table } from "antd";
import { useState } from "react";

type Type = {
  id: number;
  name: string;
  category: string;
  categoryId: string;
  price: string;
  extra: string;
};

export default function TableDashboard() {
  const [editing, setEditing] = useState<{
    id: number;
    field: string;
  } | null>(null);
  const { mutate: mutateName } = useEditName();
  const { mutate: mutatePrice } = useEditPrice();
  const { mutate: mutateCategories } = useEditCategories();
  const { data: menu, isLoading } = useMenu();
  const { data: categories } = useCategories();

  function isEditing(id: number, field: string) {
    return editing?.id === id && editing.field === field;
  }

  const columns = [
    {
      title: "اسم الصنف",
      dataIndex: "name",
      key: "name",
      render: (_: unknown, p: Type) =>
        isEditing(p.id, "name") ? (
          <Input
            defaultValue={p.name}
            autoFocus
            onBlur={() => setEditing(null)}
            onPressEnter={(e) => {
              const value = e.currentTarget.value.trim();
              if (value !== "" && value !== p.name) {
                mutateName({ id: p.id, data: value });
              }
              setEditing(null);
            }}
          />
        ) : (
          <span
            onDoubleClick={() => {
              setEditing({ id: p.id, field: "name" });
            }}
            className="select-none"
          >
            {p.name}
          </span>
        ),
    },
    {
      title: "التصنيف",
      dataIndex: "category",
      key: "category",
      render: (_: unknown, p: Type) =>
        isEditing(p.id, "category") ? (
          <Select
            defaultValue={p.category}
            defaultOpen
            options={categories?.map((e) => ({
              value: e.id,
              label: e.name_ar,
            }))}
            onBlur={() => setEditing(null)}
            onChange={(e) => {
              if (e && e !== p.categoryId) {
                mutateCategories({ id: p.id, data: e });
              }
              setEditing(null);
            }}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={() => {
              setEditing({ id: p.id, field: "category" });
            }}
            className="select-none"
          >
            {p.category}
          </span>
        ),
    },
    {
      title: "الاضافات",
      dataIndex: "extra",
      key: "extra",
      render: (_: unknown, p: Type) => (
        <span
          onDoubleClick={() => {
            setEditing({ id: p.id, field: "category" });
          }}
          className="select-none"
        >
          {p.extra}
        </span>
      ),
    },
    {
      title: "سعره",
      dataIndex: "price",
      key: "price",
      render: (_: unknown, p: Type) =>
        isEditing(p.id, "price") ? (
          <Input
            defaultValue={p.price}
            autoFocus
            onBlur={() => setEditing(null)}
            onPressEnter={(e) => {
              const value = e.currentTarget.value.trim();
              if (value !== "" && value !== p.name && !isNaN(Number(value))) {
                mutatePrice({ id: p.id, data: value });
              }
              setEditing(null);
            }}
          />
        ) : (
          <span
            onDoubleClick={() => {
              setEditing({ id: p.id, field: "price" });
            }}
            className="select-none"
          >
            {p.price}
          </span>
        ),
    },
  ];

  const data = menu?.map((m) => ({
    id: m.id ?? 0,
    name: m.name_ar ?? "-",
    category: m.categories?.name_ar ?? "-",
    categoryId: m.category_id ?? "",
    price: m.price ?? "-",
    extra: m.extras.map((e) => e.name_ar).join(" و"),
  }));
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={columns}
      loading={isLoading}
      dataSource={data}
      scroll={{ x: "max-content" }}
      tableLayout="fixed"
      size="small"
      classNames={{ root: "w-full" }}
    />
  );
}
