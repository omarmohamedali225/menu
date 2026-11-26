import {
  useAvailable,
  useCategories,
  useEditCategories,
  useEditName,
  useEditPrice,
  useMenu,
  useRemoveProduct,
} from "@/features/dashboard/hooks";
import { Dropdown, Table, type TableColumnsType } from "antd";
import { Ellipsis } from "lucide-react";
import { useCallback, useDeferredValue, useMemo, useState } from "react";
import EditProductModal from "./EditProductModal";
import Spinner from "../Spinner";
import { EditText, EditCategory, EditStatus } from "./EditTable";
import InputSearch from "./InputSearch";
import useDebounce from "@/hooks/useDebounce";

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
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { mutate: mutateName, isPending: loadEditName } = useEditName();
  const { mutate: mutatePrice, isPending: loadEditPrice } = useEditPrice();
  const { mutate: mutateCategories, isPending: loadEditCat } =
    useEditCategories();
  const { mutate: mutateAvailable, isPending: loadAvailble } = useAvailable();
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search, 1000);
  const { data: menu, isLoading: loadMenu } = useMenu(page, pageSize, debounce);
  const { data: categories, isLoading: loadCat } = useCategories();
  const [selectEdit, setSelectEdit] = useState<Type | null>(null);

  const { mutate: removeProduct, isPending: loadRemoveProduct } =
    useRemoveProduct();

  const tableLoad =
    loadEditName ||
    loadCat ||
    loadEditPrice ||
    loadMenu ||
    loadEditCat ||
    loadAvailble ||
    loadRemoveProduct;

  const data = useMemo(() => {
    return menu?.data?.map((m) => ({
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
    }));
  }, [menu]);

  type P = NonNullable<typeof data>[number];

  const categoryFilters = useMemo(
    () =>
      (categories ?? []).map((e) => ({
        text: e.name as string,
        value: e.name as string,
      })),
    [categories],
  );

  const categoryOptions = useMemo(
    () =>
      categories?.map((e) => ({
        value: e.id,
        label: e.name as string,
      })) as [],
    [categories],
  );

  const onSaveName = useCallback(
    (p: number, v: string) => {
      mutateName({ id: p, data: v });
    },
    [mutateName],
  );
  const onSavePrice = useCallback(
    (p: number, v: string) => {
      mutatePrice({ id: p, data: v });
    },
    [mutatePrice],
  );
  const onSaveCategory = useCallback(
    (p: number, v: string) => {
      mutateCategories({ id: p, data: String(v) });
    },
    [mutateCategories],
  );
  const onSaveAvailable = useCallback(
    (p: number, v: boolean) => {
      mutateAvailable({ id: p, bool: v, table: "products" });
    },
    [mutateAvailable],
  );

  const columns: TableColumnsType<P> = useMemo(() => {
    return [
      {
        title: "اسم الصنف",
        dataIndex: "name",
        key: "name",
        render: (_: unknown, p: Type) => (
          <EditText id={p.id} type="text" value={p.name} onSave={onSaveName} />
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
        filters: categoryFilters,
        onFilter: (v, r) => r.category.name.includes(String(v)),
        render: (_, p) => (
          <EditCategory
            categoryId={p.id}
            categoryName={p.category.name}
            option={categoryOptions}
            onSave={onSaveCategory}
          />
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
        render: (_: unknown, p: Type) => (
          <EditStatus
            id={p.id}
            value={p.is_available}
            onSave={onSaveAvailable}
          />
        ),
      },
      {
        title: "السعر",
        dataIndex: "price",
        key: "price",
        width: 100,
        render: (_: unknown, p: Type) => (
          <EditText
            id={p.id}
            type="price"
            value={p.price}
            suffix={"ج.م"}
            onSave={onSavePrice}
          />
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
    categoryFilters,
    categoryOptions,
    onSaveCategory,
    onSaveName,
    onSavePrice,
    onSaveAvailable,
    removeProduct,
  ]);

  const onSearch = useCallback((s: string) => {
    setSearch(s);
    setPage(1);
  }, []);

  const showTable = useDeferredValue(true, false);

  return (
    <>
      <InputSearch onSearch={onSearch} />
      {showTable ? (
        <Table
          rowKey={"id"}
          columns={columns}
          pagination={{
            pageSize,
            current: page,
            total: menu?.count ?? 0,
            onChange(p, s) {
              setPage(p);
              setPageSize(s);
            },
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 30, 40, 50],
            locale: { items_per_page: "/ منتجات" },
            // showTotal: (total, range) => `${range[0]}:${range[1]}من${total}`,
          }}
          loading={tableLoad}
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
