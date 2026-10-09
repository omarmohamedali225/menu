import { useQuery } from "@tanstack/react-query";
import { fetchMenu } from "./api";

export function useMenu() {
  return useQuery({ queryKey: ["menu"], queryFn: fetchMenu });
}
export function useCategories() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    select: (items) => {
      const map = new Map();
      items.forEach(
        (e) => e.categories && map.set(e.categories.id, e.categories),
      );
      return Array.from(map.values());
    },
  });
}

