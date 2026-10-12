import { Box } from "lucide-react";
import { ListItem } from "../dashboard/ListItem";
const pages = [
  { id: 1, url: "/dashboard", slug: "products", title: "المنتجات",icon:<Box /> },
  { id: 2, url: "/dashboard/categories", slug: "categories", title: "الاصناف" },
];


export function Drawer() {
  return (
    <div className="w-60 fixed top-0 bottom-0 p-4 bg-gray-800 text-white hidden md:block">
      <div className="flex items-center gap-3">
        <img src="logo.webp" alt="Logo" className="w-14 h-14 rounded-full" />
        <div className="flex-1 min-w-0">
          <h1>البركة</h1>
          <p className="text-xs">إدارة المنيو والمبيعات</p>
        </div>
      </div>
      <ul className="mt-6 space-y-2">
        {pages.map((p) => (
          <ListItem key={p.id} url={p.url} icon={p.icon}>
            {p.title}
          </ListItem>
        ))}
      </ul>
    </div>
  );
}
