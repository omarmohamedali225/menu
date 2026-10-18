import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  edit,
  fetchExtras,
  fetchMenu,
  fetchOffers,
  updateAvailable,
  updateCategories,
  updateName,
  updatePrice,
  type ProductWithCategories,
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
const selectCategories = (items: ProductWithCategories[]): TypeCategory[] => {
  const map = new Map();
  items.forEach((e) => e.categories && map.set(e.categories.id, e.categories));
  return Array.from(map.values());
};
export function useCategories() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: 5 * 60 * 1000,

    select: selectCategories,
  });
}

export function useOffer() {
  return useQuery({ queryKey: ["offers"], queryFn: fetchOffers });
}

export function useExtras() {
  return useQuery({ queryKey: ["extras"], queryFn: fetchExtras });
}

type keys = "offers" | "extras" | "products" | "categories";

const tables: Record<keys, string> = {
  extras: "extras",
  offers: "offers",
  products: "menu",
  categories: "menu",
};

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
      table: keys;
    }) => updateAvailable({ id, bool, table }),
    onMutate: async ({ id, bool, table }) => {
      await qc.cancelQueries({ queryKey: [tables[table]] });
      const prev = qc.getQueriesData({ queryKey: [tables[table]] });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      qc.setQueriesData({ queryKey: [tables[table]] }, (old: any[]) =>
        Array.isArray(old)
          ? old.map((item) =>
              String(item.id) === String(id)
                ? { ...item, is_available: bool }
                : item,
            )
          : old,
      );
      return { prev };
    },
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      message.success("تم التغير");
    },
    onSettled: (_d, _e, { table }) => {
      qc.invalidateQueries({ queryKey: [tables[table]] });
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
export function useEditAvailable() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, bool }: { id: number; bool: string }) =>
      updateCategories(id, bool),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تم التغير");
    },
  });
}

type TypeEdit = {
  id: number;
  // name: string;
  // categoryId: string;
  // price: string;
  extras: string[];
};
export function useEdit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TypeEdit) => edit({ data: data }),
    onError: () => message.error("حصل خطا"),
    onSuccess: async() => {
      await qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تمت بنجاح");
    },
  });
}
