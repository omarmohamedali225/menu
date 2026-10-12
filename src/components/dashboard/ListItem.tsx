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
    <li className={`hover:bg-gray-600 transition-colors rounded`}>
      <NavLink
        to={url}
        end
        className={({ isActive }) =>
          `${isActive ? "bg-gray-700!" : ""} py-2 text-[13px] px-1 text-sm text-white! flex items-center gap-1`
        }
      >
        {icon}
        {children}
      </NavLink>
    </li>
  );
}
