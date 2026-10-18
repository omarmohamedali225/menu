import {
  useAvailable,
  useCategories,
  useEdit,
  useEditCategories,
  useEditName,
  useEditPrice,
  useExtras,
  useMenu,
} from "@/features/menu/hooks";
import { Dropdown, Form, Input, Modal, Select, Table } from "antd";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

type Type = {
  id: number;
  name: string;
  category: { name: string; id: string };
  categoryId: string;
  price: string;
  countExtra: number;
  extra: { name: string; id: number }[];
  is_available: boolean;
};
export default function TableDashboard() {
  const [editing, setEditing] = useState<{
    id: number;
    field: string;
  } | null>(null);
  const { mutate: mutateName, isPending: loadEditName } = useEditName();
  const { mutate: mutatePrice, isPending: loadEditPrice } = useEditPrice();
  const { mutate: mutateCategories, isPending: loadEditCat } =
    useEditCategories();
  const { mutate: mutateAvailable, isPending: loadAvailble } = useAvailable();
  const { data: menu, isLoading: loadMenu } = useMenu();
  const { data: categories, isLoading: loadCat } = useCategories();
  const { data: extras, isLoading: loadExtra } = useExtras();
  const [search, setSearch] = useState("");
  const [selectEdit, setSelectEdit] = useState<Type | null>(null);
  const { mutate, isPending } = useEdit();

  function tableLoad() {
    return (
      loadEditName ||
      loadCat ||
      loadEditPrice ||
      loadMenu ||
      loadExtra ||
      loadEditCat ||
      loadAvailble
    );
  }

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
      width: 100,
      // filters: categories?.map((e) => ({ text: e.name, value: e.name })),
      // onFilter: (v: unknown, r: unknown) => r?.category.includes(v),
      render: (_: unknown, p: Type) =>
        isEditing(p.id, "category") ? (
          <Select
            defaultValue={p.category}
            defaultOpen
            options={categories?.map((e) => ({
              value: e.id,
              label: e.name,
            }))}
            onBlur={() => setEditing(null)}
            onChange={(e) => {
              if (e && String(e) !== String(p.categoryId)) {
                mutateCategories({ id: p.id, data: String(e) });
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
            {p.category.name}
          </span>
        ),
    },
    {
      title: "الاضافات",
      dataIndex: "extra",
      key: "extra",
      width: 100,
      render: (_: unknown, p: Type) =>
        p.countExtra > 0 && (
          <span className="select-none rounded-full px-1 bg-amber-100 text-[10px] font-bold">
            {p.countExtra} اضافة
          </span>
        ),
    },
    {
      title: "الحالة",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (_: unknown, p: Type) =>
        isEditing(p.id, "status") ? (
          <Select
            size="small"
            classNames={{ content: "w-full!" }}
            defaultValue={p.is_available}
            defaultOpen
            options={[
              { id: 1, label: "متاح", value: true },
              { id: 2, label: "غير متوفر", value: false },
            ]}
            onBlur={() => setEditing(null)}
            onChange={(e) => {
              if (e !== p.is_available) {
                mutateAvailable({ id: p.id, bool: e, table: "products" });
              }
              setEditing(null);
            }}
            autoFocus
          />
        ) : (
          <span
            onDoubleClick={(e) => {
              e.preventDefault();
              setEditing({ id: p.id, field: "status" });
            }}
            className={`${p.is_available ? "bg-green-200" : "bg-red-200"} rounded-full select-none px-2 py-.5 text-[11px]`}
          >
            {p.is_available ? " متاح " : " غير متاح "}
          </span>
        ),
    },
    {
      title: "سعره",
      dataIndex: "price",
      key: "price",
      width: 100,
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
            onDoubleClick={(e) => {
              e.preventDefault();
              setEditing({ id: p.id, field: "price" });
            }}
            className="select-none"
          >
            {p.price} ج.م
          </span>
        ),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: 50,
      render: (_: unknown, p: Type) => (
        <Dropdown
          menu={{
            items: [
              { key: 1, label: "تعديل" },
              { key: 2, label: "حذف", danger: true },
            ],
            onClick: (e) => {
              if (e.key === "1") {
                setSelectEdit(p);
              }
            },
          }}
          trigger={["click"]}
        >
          <Ellipsis className="w-full cursor-pointer" size={17} />
        </Dropdown>
      ),
    },
  ];

  const data = menu
    ?.map((m) => ({
      id: m.id ?? 0,
      name: m.name ?? "-",
      category: {
        id: m?.categories?.id ?? "",
        name: m?.categories?.name ?? "",
      },
      categoryId: m.category_id ?? "-",
      price: m.price ?? "-",
      countExtra: m.extras.length ?? 0,
      extra: m.extras.map((e) => ({ id: e.id, name: e.name })) ?? {
        id: 0,
        name: "----",
      },
      is_available: m.is_available ?? false,
    }))
    .filter((e) => {
      const n = e.name.includes(search);
      return n;
    });

  // useEffect(() => {
  //   const s = data?.filter((e) => {
  //     const n = e.name.includes(search);
  //     const c = e.category.includes(search);
  //     return;
  //   });
  //   console.log({ s });
  // }, [search, data]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (!selectEdit) return;
    form.resetFields();
    form.setFieldsValue({
      // name: selectEdit?.name,
      // category: {
      //   key: selectEdit?.category.id,
      //   label: selectEdit?.category.name,
      //   value: selectEdit?.category.id,
      // },
      // price: selectEdit?.price,
      extras: selectEdit?.extra.map((e) => ({
        key: e.id,
        label: e.name,
        value: e.id,
      })),
    });
  }, [form, selectEdit]);

  return (
    <>
      <Input
        placeholder="بحث باسم الصنف"
        className="w-50!"
        onInput={(e) => setSearch(e.currentTarget.value)}
      />

      <Table
        rowKey={"id"}
        columns={columns}
        pagination={{ pageSize: 8 }}
        loading={tableLoad()}
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

      <Modal
        open={Boolean(selectEdit)}
        okText="حفظ"
        confirmLoading={isPending}
        onOk={() => {
          form.submit();
        }}
        cancelText="الغاء"
        onCancel={() => {
          console.log(selectEdit);
          setSelectEdit(null);
          console.log(selectEdit);
        }}
      >
        <h1 className="text-xl font-medium mb-5">تعديل منتج</h1>
        <Form
          form={form}
          initialValues={{
            // name: selectEdit?.name,
            // category: {
            //   key: selectEdit?.category.id,
            //   label: selectEdit?.category.name,
            //   value: selectEdit?.category.id,
            // },
            // price: selectEdit?.price,
            extras: selectEdit?.extra.map((e) => ({
              key: e.id,
              label: e.name,
              value: e.id,
            })),
          }}
          onFinish={(v) => {
            if (selectEdit && selectEdit.id) {
              mutate(
                {
                  id: selectEdit.id,
                  // categoryId: v.category.value,
                  extras: v.extras.map((e: number) => e),
                  // name: v.name,
                  // price: v.price,
                },
                { onSuccess: () => setSelectEdit(null) },
              );
            }
          }}
          layout="vertical"
        >
          {/* <Form.Item name={"name"} label={"اسم المنتج"}>
            <Input placeholder="برجر او سندوتش اكسترا" />
          </Form.Item>
          <Form.Item name="category" label={"التصنيف"}>
            <Select
              placeholder="تابع لتصنيف ايه"
              showSearch
              options={categories?.map((c) => ({
                key: c.id,
                label: c.name,
                value: c.id,
              }))}
            />
          </Form.Item>
          <Form.Item name="price" label={"تسعيره المنتج"}>
            <Input placeholder="السعر" />
          </Form.Item> */}
          <Form.Item name={"extras"} label={"اضافات"}>
            <Select
              placeholder="سيبها فاضية لو مش عايز اضافات"
              options={extras?.map((e) => ({
                key: e.id,
                label: e.name,
                value: e.id,
              }))}
              mode="multiple"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
