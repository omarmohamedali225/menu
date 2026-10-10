import { Link } from "react-router";

export function ListItem({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) {
  const isSelect = (e: string) => {
    return location.pathname === e;
  };
  return (
    <li
      className={`${isSelect(url) && "bg-[#eae4e9]"} hover:bg-[#CCCDE0] transition-colors rounded`}
    >
      <Link to={url} className="p-2 block text-amber-700!">
        {children}
      </Link>
    </li>
  );
}
