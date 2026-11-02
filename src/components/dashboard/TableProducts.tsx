import {
  useAvailable,
  useCategories,
  useEditCategories,
  useEditName,
  useEditPrice,
  useMenu,
  useRemoveProduct,
} from "@/features/dashboard/hooks";
import { Dropdown, Input, Select, Table, type TableColumnsType } from "antd";
import { Ellipsis } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import EditProductModal from "./EditProductModal";
import Spinner from "../Spinner";

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
export default function TableProducts() {
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
  const [search, setSearch] = useState("");
  const [selectEdit, setSelectEdit] = useState<Type | null>(null);

  const { mutate: removeProduct, isPending: loadRemoveProduct } =
    useRemoveProduct();

  function tableLoad() {
    return (
      loadEditName ||
      loadCat ||
      loadEditPrice ||
      loadMenu ||
      loadEditCat ||
      loadAvailble ||
      loadRemoveProduct
    );
  }

  const data = useMemo(() => {
    return (
      menu
        ?.map((m) => ({
          id: m.id ?? 0,
          name: m.name ?? "-",
          category: {
            id: m?.categories?.id ?? "",
            name: m?.categories?.name ?? "",
            isAvailable: m?.categories?.is_available ?? false,
          },
          categoryId: m.category_id ?? "-",
          price: m.price ?? "-",
          countExtra: m.extras.length ?? 0,
          extra: m.extras.map((e) => ({ id: e.id, name: e.name })) ?? {
            id: 0,
            name: "-",
          },
          is_available: m.is_available ?? false,
        }))
        .filter((e) => {
          const n = e.name.includes(search);
          return n;
        }) ?? []
    );
  }, [menu, search]);

  type P = NonNullable<typeof data>[number];

  const columns: TableColumnsType<P> = useMemo(() => {
    function isEditing(id: number, field: string) {
      return editing?.id === id && editing.field === field;
    }
    return [
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
              className="select-none block"
            >
              {p.name}
            </span>
          ),
      },
      {
        title: "التصنيف",
        dataIndex: "category",
        key: "category",
        width: 150,
        onCell: (r) => ({
          style: !r.category.isAvailable
            ? { background: "#cb2222", color: "wheat" }
            : undefined,
        }),
        filters: (categories ?? []).map((e) => ({
          text: e.name as string,
          value: e.name as string,
        })),
        onFilter: (v, r) => r.category.name.includes(String(v)),
        render: (_, p) =>
          isEditing(p.id, "category") ? (
            <Select
              classNames={{ content: "w-[150px]!" }}
              defaultValue={p.category}
              value={p.category}
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
        filters: [
          { text: "متاح", value: true },
          { text: "غير متوفر", value: false },
        ],
        onFilter: (v, r) => r.is_available === v,
        render: (_: unknown, p: Type) =>
          isEditing(p.id, "status") ? (
            <Select
              size="small"
              classNames={{ content: "w-[150px]!" }}
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
              type={"number"}
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
                  return;
                }
                if (e.key === "2") {
                  removeProduct(p.id);
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
  }, [
    categories,
    mutateName,
    mutatePrice,
    mutateCategories,
    mutateAvailable,
    removeProduct,
    editing,
  ]);

  // const u = useReady();
  // const [isPending, start] = useTransition();
  const showTable = useDeferredValue(true, false);

  return (
    <>
      <Input
        placeholder="بحث باسم الصنف"
        className="w-50!"
        onInput={(e) => setSearch(e.currentTarget.value)}
      />
      {showTable ? (
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
      ) : (
        <Spinner />
      )}

      <EditProductModal
        product={selectEdit}
        onClose={() => setSelectEdit(null)}
      />
    </>
  );
}
