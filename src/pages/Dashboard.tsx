import CartHeader from "@/components/dashboard/CartHeader";
import { Box, Copy, ListSortAscending, Tag } from "lucide-react";

import {
  useCategories,
  useMenu,
  useOffer,
} from "@/features/menu/hooks";
// import TableDashboard from "@/components/dashboard/TableDashboard";

export default function Dashboard() {
  const { data: menu } = useMenu();
  const { data: categories } = useCategories();
  const { data: offers } = useOffer();
  // const { data: extras } = useExtras();

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

  // const countByCategory = useMemo(() => {
  //   const m = new Map();
  //   menu?.forEach((e) => {
  //     const id = e.categories?.id;
  //     if (id !== null) m.set(id, (m.get(id) ?? 0) + 1);
  //   });
  //   return m;
  // }, [menu]);

  return (
    <div className="p-4 space-y-10">
      <div className="flex items-center justify-between mt-4">
        <div>
          <h1 className="text-xl font-semibold">اهلا بيك , منيو الفلاح</h1>
          <h2 className="text-sm">
            دي نظره سريعه علي نشاط متجرك واداره المنيو الخاص بيك 🤗.
          </h2>
        </div>
        <button className="bg-indigo-600 hidden sm:flex text-white px-2 py-1 rounded-xl hover:bg-indigo-500 transition-colors cursor-pointer">
          + أضافة منتج
        </button>
      </div>
      {/* shorts */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 z-10">
        {dataHeader.map((d) => (
          <CartHeader key={d.id} data={d} />
        ))}
      </div>
      {/* shorts */}
      <div className="flex gap-3 flex-wrap">
        {/* <div className="flex-1 basis-2xs bg-white  p-2 border border-gray-200 rounded-lg">
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
                <AvailableSwitch
                  id={cat.id}
                  value={cat.is_available}
                  table="categories"
                />
              </li>
            </ul>
          ))}
        </div> */}
        {/* العروض */}
        {/* <div className="flex-1 basis-2xs bg-white p-2 border border-gray-200 rounded-lg">
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
                  <AvailableSwitch
                    id={off.id}
                    value={off.is_available}
                    table="offers"
                  />
                </div>
              </li>
            </ul>
          ))}
        </div> */}
        {/* shorts */}
        <div className="flex-1 basis-2xs bg-white p-2 border border-gray-200 rounded-lg">
          <h1 className="text-sm">اختصارات سريعة</h1>
          <hr className="text-gray-200 my-2" />
          <ul className="mt-2 space-y-2">
            <li className="flex gap-2 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors p-2 cursor-pointer">
              <Box />
              <div>
                <h1 className="text-sm">أضافة منتج</h1>
                <p className="text-[11px] text-gray-400">
                  ضيف المنتج وتصنيفه وسعره
                </p>
              </div>
            </li>
            <li className="flex gap-2 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors p-2 cursor-pointer">
              <Box />
              <div>
                <h1 className="text-sm">أضافة منتج</h1>
                <p className="text-[11px] text-gray-400">
                  ضيف المنتج وتصنيفه وسعره
                </p>
              </div>
            </li>
            <li className="flex gap-2 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors p-2 cursor-pointer">
              <Box />
              <div>
                <h1 className="text-sm">أضافة منتج</h1>
                <p className="text-[11px] text-gray-400">
                  ضيف المنتج وتصنيفه وسعره
                </p>
              </div>
            </li>
          </ul>
          <div className="bg-white mt-4">
            <h4 className="text-sm text-gray-400">رابط المنيو</h4>
            <h5 className="bg-gray-100 p-1 text-[14px] mt-2 rounded-lg flex items-center justify-between">
              albaraka.com <Copy size={12} className="cursor-pointer"/>
            </h5>
            <p className="text-sm mt-1 text-gray-400">قم بمشاركته مع العملاء</p>
          </div>
        </div>
      </div>

      <p></p>
      {/* table */}
      {/* <TableDashboard /> */}
      {/* <div className="flex-1 basis-2xs bg-white p-2 border border-gray-200 rounded-lg">
        <header className="flex justify-between items-center">
          <h1 className="text-sm">المنتجات</h1>
          <Button>أضافة منتج</Button>
        </header>
        {menu?.map((e) => (
          <ul key={e.id}>
            <li className="flex my-3 justify-between border border-gray-200 rounded-lg px-2 py-1">
              <div>
                <h2 className="text-sm">{e.name}</h2>
                <h2 className="text-[12px] mt-1 text-gray-400">
                  {e.price} جنية فقط
                </h2>
              </div>
              <AvailableSwitch
                id={e.id}
                value={e.is_available ?? false}
                table="products"
              />
            </li>
          </ul>
        ))}
      </div> */}
    </div>
  );
}
