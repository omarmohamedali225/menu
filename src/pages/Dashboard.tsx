import CartHeader from "@/components/dashboard/CartHeader";
import { BadgePercent, Layers, Package, PlusCircle } from "lucide-react";

import {
  useCategories,
  useExtras,
  useMenu,
  useOffer,
} from "@/features/menu/hooks";
import { useMemo } from "react";

export default function Dashboard() {
  const { data: menu } = useMenu();
  const { data: categories } = useCategories();
  const { data: offers } = useOffer();
  const { data: extras } = useExtras();

  const dataHeader = useMemo(() => {
    return [
      {
        id: 1,
        title: "أجمالي المنتجات",
        count: menu?.length ?? 0,
        url: "products",
        icon: (
          <div className="bg-green-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Package size={18} className="text-green-900" />
          </div>
        ),
      },
      {
        id: 2,
        title: "المنتجات النشطة",
        count: menu?.filter((m) => m.is_available).length ?? 0,
        url: "products",
        icon: (
          <div className="bg-green-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Package size={18} className="text-green-900" />
          </div>
        ),
      },
      {
        id: 3,
        title: "أجمالي التصنيفات",
        count: categories?.length ?? 0,
        url: "categories",
        icon: (
          <div className="bg-yellow-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Layers size={18} className="text-yellow-900" />
          </div>
        ),
      },
      {
        id: 4,
        title: "التصنيفات النشطة",
        count: categories?.filter((c) => c.is_available).length ?? 0,
        url: "categories",
        icon: (
          <div className="bg-yellow-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <Layers size={18} className="text-yellow-900" />
          </div>
        ),
      },
      {
        id: 5,
        title: "العروض",
        count: offers?.length ?? 0,
        url: "offers",
        icon: (
          <div className="bg-fuchsia-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <BadgePercent size={18} className="text-fuchsia-900 rotate-90" />
          </div>
        ),
      },
      {
        id: 6,
        title: "العروض النشطة",
        count: offers?.filter((o) => o.is_available).length ?? 0,
        url: "offers",
        icon: (
          <div className="bg-fuchsia-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <BadgePercent size={18} className="text-fuchsia-900 rotate-90" />
          </div>
        ),
      },
      {
        id: 7,
        title: "الاضافات",
        count: extras?.length ?? 0,
        url: "extras",
        icon: (
          <div className="bg-blue-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <PlusCircle size={18} className="text-blue-900 rotate-90" />
          </div>
        ),
      },
      {
        id: 8,
        title: "الاضافات النشطة",
        count: extras?.filter((e) => e.is_available).length ?? 0,
        url: "extras",
        icon: (
          <div className="bg-blue-500/40 w-8 h-8 mr-auto flex items-center justify-center rounded-full">
            <PlusCircle size={18} className="text-blue-900 rotate-90" />
          </div>
        ),
      },
    ];
  }, [menu, categories, offers, extras]);

  return (
    <div className="p-4 space-y-10">
      <div className="flex items-center justify-between mt-4">
        <div>
          <h1 className="text-xl font-semibold text-primary">
            اهلا بيك , منيو البركة
          </h1>
          <h2 className="text-xs mt-1 text-mute">
            دي نظره سريعه علي نشاط متجرك واداره المنيو الخاص بيك 🤗.
          </h2>
        </div>
        {/* <button className="bg-indigo-600 hidden sm:flex text-white px-2 py-1 rounded-xl hover:bg-indigo-500 transition-colors cursor-pointer">
          + أضافة منتج
        </button> */}
      </div>
      {/* shorts */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 z-10">
        {dataHeader.map((d) => (
          <CartHeader key={d.id} data={d} />
        ))}
      </div>
      {/* shorts */}
      {/* <div className="flex gap-3 flex-wrap">
        <div className="flex-1 basis-2xs bg-white p-2 border border-gray-200 rounded-lg">
          <h1 className="text-sm text-mute">اختصارات سريعة</h1>
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
          </ul>
        </div>
      </div> */}
    </div>
  );
}
