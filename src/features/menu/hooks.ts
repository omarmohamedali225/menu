import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchExtras,
  fetchMenu,
  fetchOffers,
  updateAvailable,
  updateCategories,
  updateName,
  updatePrice,
} from "./api";
import { message } from "antd";
import type { TypeCategory } from "@/types/Products";

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: 5 * 60 * 1000,
  });
}
export function useCategories() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: 5 * 60 * 1000,

    select: (items): TypeCategory[] => {
      const map = new Map();
      items.forEach(
        (e) => e.categories && map.set(e.categories.id, e.categories),
      );
      return Array.from(map.values());
    },
  });
}

export function useOffer() {
  return useQuery({ queryKey: ["offers"], queryFn: fetchOffers });
}

export function useExtras() {
  return useQuery({ queryKey: ["extras"], queryFn: fetchExtras });
}

type Table = "products" | "offers" | "categories" | "extras";

export function useAvailable() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      bool,
      table,
    }: {
      id: string | number;
      bool: boolean;
      table: Table;
    }) => updateAvailable({ id, bool, table }),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      message.success("تم التغير");
    },
    onSettled: (_d, _e, { table }) => {
      qc.invalidateQueries({ queryKey: [table] });
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
