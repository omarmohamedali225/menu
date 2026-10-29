import type { CartType } from "@/types/Products";
import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";
import useTenantIdwithParams from "./useTenantIdwithParams";
// import { useExistTenant } from "@/features/menu/hooks";

interface Type {
  data: CartType[];
  addItem: (s: CartType) => void;
  deleteItem: (s: CartType) => void;
}

const ContextStorage = createContext<Type | null>(null);

const cartKey = (tenantId: string) => `cart:${tenantId}`;

function loadCart(tenantId: string): CartType[] {
  try {
    const raw = localStorage.getItem(cartKey(tenantId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function StorageCartContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const tenantId = useTenantIdwithParams();
  const [data, setData] = useState<CartType[]>(() => loadCart(tenantId!));
  

  useEffect(() => {
    try {
      localStorage.setItem(cartKey(tenantId!), JSON.stringify(data));
    } catch {
      //
    }
  }, [data, tenantId]);

  function normalize(extras: { extraId: number; qty: number }[] = []) {
    return extras
      .filter((e) => e.qty > 0)
      .map((e) => `${e.extraId}:${e.qty}`)
      .sort()
      .join("|");
  }

  function addItem(item: CartType) {
    setData((prev) => {
      const index = prev.findIndex((p) => {
        return (
          p.id === item.id &&
          p.type === item.type &&
          normalize(p.extra) === normalize(item.extra)
        );
      });

      if (index === -1) {
        return [...prev, item];
      }

      return prev.map((p, i) =>
        i === index ? { ...p, quantity: p.quantity + item.quantity } : p,
      );
    });

    message.success("تم تحديث العربة");
  }

  function deleteItem(item: CartType) {
    setData((prev) => {
      // const index = prev.findIndex((p) => {
      //   if (p.id !== item.id || p.type !== item.type) return false;

      //   if (p.extra && item.extra) {
      //     return (
      //       p.extra.length === item.extra.length &&
      //       item.extra.every((i) => p.extra?.includes(i))
      //     );
      //   }

      //   return true;
      // });
      const index = prev.findIndex((p) => {
        return (
          p.id === item.id &&
          p.type === item.type &&
          normalize(p.extra) === normalize(item.extra)
        );
      });

      if (index === -1) {
        return [...prev];
      }

      return prev
        .map((p, i) =>
          i === index ? { ...p, quantity: p.quantity - item.quantity } : p,
        )
        .filter((e) => e.quantity > 0);
    });
    message.success("تم تحديث العربة");
  }

  // function addOffer(item: OfferType) {
  //   setOffers((prev) => {
  //     const find = offers.findIndex((o) => o.id === item.id);
  //     if (find===-1) {
  //       return [...prev, item];
  //     }
  //     return prev.map(p=>p.id===item.id?{ ...p, quantity: p.quantity + 1 }:p);
  //   });
  //   message.success("تم أضافة العرض");
  // }

  return (
    <ContextStorage.Provider value={{ data, addItem, deleteItem }}>
      {children}
    </ContextStorage.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCartStorage(): Type {
  const ctx = useContext(ContextStorage);
  if (!ctx) {
    throw new Error("useCartStorage must be used within StorageCartContext");
  }
  return ctx;
}
