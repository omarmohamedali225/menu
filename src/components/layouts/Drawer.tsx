import { ListItem } from "../dashboard/ListItem";
const pages = [
  { id: 1, url: "/dashboard", slug: "products", title: "المنتجات" },
  { id: 2, url: "/dashboard/categories", slug: "categories", title: "الاصناف" },
];


export function Drawer() {
  return (
    <div className="bg-[#F3F6F9] w-60  h-screen fixed shadow hidden md:block">
      <div className="flex items-center gap-3">
        <img src="logo.webp" alt="Logo" className="w-14 h-14 rounded-full" />
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold leading-6">البركة</h1>
        </div>
      </div>
      <hr className="mt-2" />
      <ul className="mt-4  space-y-2">
        {pages.map((p) => (
          <ListItem key={p.id} url={p.url}>
            {p.title}
          </ListItem>
        ))}
      </ul>
    </div>
  );
}
