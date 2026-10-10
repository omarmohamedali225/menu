import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMenu, updateCategories, updateName, updatePrice } from "./api";
import { message } from "antd";

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

export function useEditName() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: string }) =>
      updateName(id, data),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تم التغير");
    },
  });
}
export function useEditPrice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: string }) =>
      updatePrice(id, data),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تم التغير");
    },
  });
}
export function useEditCategories() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: string }) =>
      updateCategories(id, data),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تم التغير");
    },
  });
}
