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
  fetchProfile,
  removeCategory,
  removeExtra,
  removeOffer,
  removeProduct,
  updateAvailable,
  updateCategories,
  updateName,
  updatePrice,
  updateProfile,
} from "./api";
import { message } from "antd";
import type {
  TypeInsertCategory,
  TypeInsertExtra,
  TypeInsertOffer,
  TypeInsertProduct,
} from "@/types/Products";
import useTenantId from "@/hooks/useTenantId";
import { sendTelegram } from "@/helpers/telegram";

export function useMenu() {
  const tenantId = useTenantId();
  return useQuery({
    queryKey: ["products", tenantId],
    queryFn: () => fetchMenu(tenantId),
    staleTime: 60 * 60 * 1000, //cache 1 hour
    enabled: !!tenantId,
  });
}

export function useCategories() {
  const tenantId = useTenantId();
  return useQuery({
    queryKey: ["categories", tenantId],
    queryFn: () => fetchCategories(tenantId),
    // staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}

export function useOffer() {
  const tenantId = useTenantId();

  return useQuery({
    queryKey: ["offers", tenantId],
    queryFn: () => fetchOffers(tenantId),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}

export function useExtras() {
  const tenantId = useTenantId();
  return useQuery({
    queryKey: ["extras", tenantId],
    queryFn: () => fetchExtras(tenantId),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}
export function useProfile() {
  const tenantId = useTenantId();
  return useQuery({
    queryKey: ["profile", tenantId],
    queryFn: () => fetchProfile(tenantId),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}
export function useUpdateProfile() {
  const tenantId = useTenantId();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ name, phone }: { name: string; phone: string }) =>
      updateProfile(tenantId, name, phone),
    onError: () => message.error("حصل خطا جرب تاني"),
    onSuccess: (_, { name,phone }) => {
      qc.invalidateQueries({ queryKey: ["profile", tenantId] });
      message.success("المنيو جاهز الان");

      const time = new Date().toLocaleString("ar-EG", {
        timeZone: "Africa/Cairo",
        dateStyle: "short",
        timeStyle: "short",
      });

      sendTelegram(
        `🍽 <b>سيستم اتفعل</b>\n` +
          `الاسم: ${name}\n` +
          `رقم الهاتف: ${phone}\n` +
          `وقت التفعيل: ${time}`,
      );
    },
  });
}

type keys = "offers" | "extras" | "products" | "categories";

const tables: Record<keys, string> = {
  extras: "extras",
  offers: "offers",
  products: "products",
  categories: "categories",
};

type AvailableItem = { id: string | number; is_available: boolean };

export function useAvailable(tableRefresh?: keys) {
  const qc = useQueryClient();
  const tenantId = useTenantId();

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
      await qc.cancelQueries({ queryKey: [tables[table], tenantId] });
      const prev = qc.getQueriesData({ queryKey: [tables[table], tenantId] });
      qc.setQueriesData<AvailableItem[]>(
        { queryKey: [tables[table], tenantId] },
        (old) =>
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
      qc.invalidateQueries({ queryKey: [tables[table], tenantId] });
      if (tableRefresh) {
        qc.invalidateQueries({ queryKey: [tableRefresh, tenantId] });
      }
    },
  });
}

export function useEditName() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: string }) =>
      updateName(id, data),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", tenantId] });
      message.success("تم التغير");
    },
  });
}
export function useEditPrice() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: string }) =>
      updatePrice(id, data),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", tenantId] });
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
  //     qc.invalidateQueries({ queryKey: ["menu",tenantId] });
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
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (data: TypeEdit) => edit({ data: data }),
    onError: () => message.error("حصل خطا"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products", tenantId] });
      message.success("تمت بنجاح");
    },
  });
}
export function useAddProduct() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (data: TypeInsertProduct) => addProduct(data),
    onError: () => message.error("حصل خطا في الاضافة اعد المحاولة"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products", tenantId] });
      message.success("تمت الاضافة");
    },
  });
}
export function useRemoveProduct() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (id: number) => removeProduct(id),
    onError: () => message.error("حصل خطا في الحذف اعد المحاولة"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products", tenantId] });
      message.success("تم حذف المنتج بنجاح");
    },
  });
}

export function useAddOffer() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (data: TypeInsertOffer) => addOffer(data),
    onError: () => message.error("العرض مشتغلش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["offers", tenantId] });
      message.success("تمت اضافة العرض بنجاح");
    },
  });
}
export function useRemoveOffer() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (id: number) => removeOffer(id),
    onError: () => message.error("العرض متمسحش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["offers", tenantId] });
      message.success("تمت مسح العرض بنجاح");
    },
  });
}
export function useAddExtra() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (data: TypeInsertExtra) => addExtra(data),
    onError: () => message.error("حصل خطا في الاضافة اعد المحاولة"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["extras", tenantId] });
      message.success("تمت الاضافة");
    },
  });
}
export function useRemoveExtra() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (id: number) => removeExtra(id),
    onError: () => message.error("العرض متمسحش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["extras", tenantId] });
      message.success("تمت مسح العرض بنجاح");
    },
  });
}

// start categories

export function useEditCategories() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: string }) =>
      updateCategories(id, data),
    onError: () => message.error("حصل خطأ في التحديث"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products", tenantId] });
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
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (data: TypeInsertCategory) => addCategory(data),
    onError: () => message.error("التصنيف مشتغلش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["categories", tenantId] });
      message.success("تمت اضافة التصنيف بنجاح");
    },
  });
}
export function useRemoveCategory() {
  const qc = useQueryClient();
  const tenantId = useTenantId();

  return useMutation({
    mutationFn: (id: string) => removeCategory(id),
    onError: () => message.error("التصنيف متمسحش"),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["categories", tenantId] });
      message.success("تمت مسح التصنيف بنجاح");
    },
  });
}
// End categories
