import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory,
  addExtra,
  addOffer,
  addProduct,
  edit,
  fetchCategories,
  fetchExtras,
  fetchMenu,
  fetchOffers,
  removeCategory,
  removeExtra,
  removeOffer,
  removeProduct,
  updateAvailable,
  updateCategories,
  updateName,
  updatePrice,
} from "./api";
import { message } from "antd";
import type {
  TypeInsertCategory,
  TypeInsertExtra,
  TypeInsertOffer,
  TypeInsertProduct,
} from "@/types/Products";

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
    staleTime: 60 * 60 * 1000, //cache 1 hour
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
  categories: "categories",
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

export function useEditAvailable() {
  // const qc = useQueryClient();
  // return useMutation({
  //   mutationFn: ({ id, bool }: { id: number; bool: string }) =>
  //     updateCategories(id, bool),
  //   onError: () => message.error("حصل خطأ في التحديث"),
  //   onSuccess: () => {
  //     qc.invalidateQueries({ queryKey: ["menu"] });
  //     message.success("تم التغير");
  //   },
  // });
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
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تمت بنجاح");
    },
  });
}
export function useAddProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: TypeInsertProduct) => addProduct(data),
    onError: () => message.error("حصل خطا في الاضافة اعد المحاولة"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تمت الاضافة");
    },
  });
}
export function useRemoveProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeProduct(id),
    onError: () => message.error("حصل خطا في الحذف اعد المحاولة"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تم حذف المنتج بنجاح");
    },
  });
}

export function useAddOffer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: TypeInsertOffer) => addOffer(data),
    onError: () => message.error("العرض مشتغلش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["offers"] });
      message.success("تمت اضافة العرض بنجاح");
    },
  });
}
export function useRemoveOffer() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeOffer(id),
    onError: () => message.error("العرض متمسحش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["offers"] });
      message.success("تمت مسح العرض بنجاح");
    },
  });
}
export function useAddExtra() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: TypeInsertExtra) => addExtra(data),
    onError: () => message.error("حصل خطا في الاضافة اعد المحاولة"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["extras"] });
      message.success("تمت الاضافة");
    },
  });
}
export function useRemoveExtra() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => removeExtra(id),
    onError: () => message.error("العرض متمسحش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["extras"] });
      message.success("تمت مسح العرض بنجاح");
    },
  });
}

// start categories
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 60 * 60 * 1000,

    // select: selectCategories,
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
// const selectCategories = (items: ProductWithCategories[]): TypeCategory[] => {
//   const map = new Map();
//   items.forEach((e) => e.categories && map.set(e.categories.id, e.categories));
//   return Array.from(map.values());
// };
export function useAddCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: TypeInsertCategory) => addCategory(data),
    onError: () => message.error("التصنيف مشتغلش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تمت اضافة التصنيف بنجاح");
    },
  });
}
export function useRemoveCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeCategory(id),
    onError: () => message.error("التصنيف متمسحش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["menu"] });
      message.success("تمت مسح التصنيف بنجاح");
    },
  });
}
// End categories
