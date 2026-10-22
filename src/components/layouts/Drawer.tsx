import { BadgePercent, Home, Layers, Package, PlusCircle } from "lucide-react";
import { ListItem } from "../dashboard/ListItem";
import { useDrawer } from "@/contexts/OpenDrawer";
import { motion } from "motion/react";
import { Grid } from "antd";
const pages = [
  {
    id: 1,
    url: "/dashboard",
    slug: "products",
    title: "الرئيسية",
    icon: <Home />,
  },
  {
    id: 2,
    url: "/dashboard/products",
    slug: "products",
    title: "المنتجات",
    icon: <Package />,
  },
  {
    id: 3,
    url: "/dashboard/categories",
    slug: "categories",
    title: "الاصناف",
    icon: <Layers />,
  },
  {
    id: 4,
    url: "/dashboard/extras",
    slug: "extras",
    title: "الأضافات",
    icon: <PlusCircle />,
  },
  {
    id: 5,
    url: "/dashboard/offers",
    slug: "offers",
    title: "العروض",
    icon: <BadgePercent />,
  },
];

export function Drawer() {
  const { open, handlerClose } = useDrawer();
  const screens = Grid.useBreakpoint();

  // useEffect(() => {
  //   if (screens.md) {
  //     handlerOpen();
  //   } else {
  //     handlerClose();
  //   }
  // }, [handlerOpen, handlerClose, screens]);

  return (
    <>
      {open && (
        <div
          onClick={handlerClose}
          className={"bg-black/50 fixed inset-0 md:hidden z-30"}
        ></div>
      )}
      <motion.div
        initial={false}
        animate={{ x: !screens.md ? (open ? 0 : 240) : 0 }}
        transition={{ stiffness: 0 }}
        className="w-60 fixed top-0 bottom-0 p-4 z-40 bg-white md:block border-l border-l-gray-100"
      >
        <div className="flex items-center gap-3 justify-center">
          <img src="logo.webp" alt="Logo" className="w-14 h-14 rounded-full" />
          {/* <SlashSquare /> */}
          {/* <span className="bg-indigo-500 w-14 h-14 rounded-2xl content-center text-center text-white font-bold">
            بركة
          </span> */}
          <div className="min-w-0">
            <h1>البركة</h1>
            <p className="text-xs">إدارة المنيو الخاص بك</p>
          </div>
        </div>
        <hr className="my-6 text-gray-300" />
        <ul className="mt-6 space-y-2">
          {pages.map((p) => (
            <ListItem key={p.id} url={p.url} icon={p.icon}>
              {p.title}
            </ListItem>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
