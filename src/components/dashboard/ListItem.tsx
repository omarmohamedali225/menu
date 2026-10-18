import type React from "react";
import { NavLink } from "react-router";

export function ListItem({
  children,
  url,
  icon,
}: {
  children: React.ReactNode;
  url: string;
  icon?: React.ReactElement;
}) {
  return (
    <li className={`hover:bg-indigo-100 transition-colors rounded`}>
      <NavLink
        to={url}
        end
        className={({ isActive }) =>
          `${isActive ? "bg-indigo-200! text-indigo-700!" : ""} py-2 font-semibold text-[13px] text-gray-600! px-1 text-sm flex items-center rounded-md gap-3`
        }
      >
        {icon}
        {children}
      </NavLink>
    </li>
  );
}
