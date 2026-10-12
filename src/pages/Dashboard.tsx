import CartHeader from "@/components/dashboard/CartHeader";
import { Box, ListSortAscending, Tag } from "lucide-react";
import React, { Suspense, useMemo } from "react";

import {
  useAvailable,
  useCategories,
  useExtras,
  useMenu,
  useOffer,
} from "@/features/menu/hooks";
import { Button, Switch } from "antd";
const T = React.lazy(() => import("@/components/dashboard/TableDashboard"));

export default function Dashboard() {
  const { data: menu } = useMenu();
  const { data: categories } = useCategories();
  const { data: offers } = useOffer();
  const { data: extras } = useExtras();
  const { mutate, isPending, variables } = useAvailable();

  const dataHeader = [
    {
      id: 1,
      title: "أجمالي المنتجات",
      count: menu?.length ?? 0,
      url: "products",
      icon: (
        <div className="bg-green-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
          <Box size={18} className="text-green-900" />
        </div>
      ),
    },
    {
      id: 2,
      title: "أجمالي الاقسام",
      count: categories?.length ?? 0,
      url: "categories",
      icon: (
        <div className="bg-yellow-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
          <ListSortAscending size={18} className="text-yellow-900" />
        </div>
      ),
    },
    {
      id: 3,
      title: "العروض النشطة",
      count: offers?.length ?? 0,
      url: "offers",
      icon: (
        <div className="bg-fuchsia-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
          <Tag size={18} className="text-fuchsia-900 rotate-90" />
        </div>
      ),
    },
  ];

  const countByCategory = useMemo(() => {
    const m = new Map();
    menu?.forEach((e) => {
      const id = e.categories?.id;
      if (id !== null) m.set(id, (m.get(id) ?? 0) + 1);
    });
    return m;
  }, [menu]);

  return (
    <div className="p-4 space-y-3">
      <h1>اهلا بيك يا عمر</h1>
      <h2 className="text-sm font-light">اداره اسهل لنظام يفهمك</h2>
      {/* shorts */}
      <div className="grid grid-cols-2 bg-gray-100 lg:grid-cols-3 gap-2 z-10">
        {dataHeader.map((d) => (
          <CartHeader key={d.id} data={d} />
        ))}
      </div>
      {/* shorts */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 basis-2xs bg-white  p-2 border border-gray-200 rounded-lg">
          <header className="flex justify-between items-center">
            <h2 className="text-sm">الاقسام</h2>
            <Button>+</Button>
          </header>
          {categories?.map((cat, i) => (
            <ul key={i}>
              <li className="flex my-3 justify-between border border-gray-200 rounded-lg px-2 py-1">
                <div>
                  <h2 className="text-sm">{cat.name}</h2>
                  <h3 className="text-[12px] mt-1 text-gray-400">
                    {countByCategory.get(cat.id) ?? 0} منتجات
                  </h3>
                </div>
                <Switch
                  // defaultChecked={cat.is_available}
                  checkedChildren={"نشط"}
                  unCheckedChildren={"معطل"}
                  classNames={{ root: "mt-auto!" }}
                  loading={
                    isPending &&
                    variables.id === cat.id &&
                    variables.table === "categories"
                  }
                  checked={cat.is_available ?? false}
                  onChange={(c) => {
                    mutate({
                      id: cat.id,
                      bool: c,
                      table: "categories",
                    });
                  }}
                />
              </li>
            </ul>
          ))}
        </div>
        {/* العروض */}
        <div className="flex-1 basis-2xs bg-white p-2 border border-gray-200 rounded-lg">
          <header className="flex justify-between items-center">
            <h1 className="text-sm">العروض</h1>
            <Button>+</Button>
          </header>
          {offers?.map((off, i) => (
            <ul key={i}>
              <li className="flex my-3 justify-between border border-gray-200 rounded-lg px-2 py-1">
                <div>
                  <h2 className="text-sm">{off.title}</h2>
                  <h3 className="text-[12px] mt-1 text-gray-400">
                    {off.description}
                  </h3>
                </div>
                <div>
                  <p className="mt-auto">
                    {off.price} <small>جنية</small>
                  </p>
                  <Switch
                    defaultChecked={off.is_available}
                    checkedChildren={"نشط"}
                    unCheckedChildren={"معطل"}
                    classNames={{ root: "mt-auto!" }}
                    loading={
                      isPending &&
                      variables.id === off.id &&
                      variables.table === "offers"
                    }
                    checked={off.is_available}
                    onChange={(c) => {
                      mutate({ id: off.id, bool: c, table: "offers" });
                    }}
                  />
                </div>
              </li>
            </ul>
          ))}
        </div>
        {/* extra */}
        <div className="flex-1 basis-2xs bg-white p-2 border border-gray-200 rounded-lg">
          <header className="flex justify-between items-center">
            <h1 className="text-sm">الاضافات</h1>
            <Button>+</Button>
          </header>
          {extras?.map((e) => (
            <ul key={e.id}>
              <li className="flex my-3 justify-between border border-gray-200 rounded-lg px-2 py-1">
                <div>
                  <h2 className="text-sm">{e.name}</h2>
                  <h2 className="text-[12px] mt-1 text-gray-400">
                    {e.price} جنية فقط
                  </h2>
                </div>
                <Switch
                  checkedChildren={"نشط"}
                  unCheckedChildren={"معطل"}
                  classNames={{ root: "mt-auto!" }}
                  loading={
                    isPending &&
                    variables.id === e.id &&
                    variables.table === "extras"
                  }
                  checked={e.is_available ?? false}
                  onChange={(c) => {
                    mutate({
                      id: e.id,
                      bool: c,
                      table: "extras",
                    });
                  }}
                />
              </li>
            </ul>
          ))}
        </div>
      </div>

      {/* table */}
      <Suspense fallback={<h1>loading...</h1>}>
        <T />
      </Suspense>
    </div>
  );
}
