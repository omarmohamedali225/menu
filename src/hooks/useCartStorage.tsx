import type { CartType } from "@/types/Products";
import { message } from "antd";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Type {
  data: CartType[];
  addItem: (s: CartType) => void;
  deleteItem: (s: CartType) => void;
}

const ContextStorage = createContext<Type | null>(null);

function loadCart(): CartType[] {
  try {
    const raw = localStorage.getItem("products");
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
  const [data, setData] = useState<CartType[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(data));
    } catch {
      //
    }
  }, [data]);

  function addItem(item: CartType) {
    setData((prev) => {
      const index = prev.findIndex(
        (p) =>
          p.id === item.id &&
          p.extra.length === item.extra.length &&
          item.extra.every((i) => p.extra.some((r) => i === r)),
      );

      if (index === -1) {
        return [...prev, item];
      }

      return prev.map((p, i) =>
        i === index ? { ...p, quantity: p.quantity + 1 } : p,
      );
    });
    localStorage.setItem("products", JSON.stringify(data));
    message.success("تم تحديث العربة");
  }
  function deleteItem(item: CartType) {
    setData((prev) => {
      const index = prev.findIndex(
        (p) =>
          p.id === item.id &&
          p.extra.length === item.extra.length &&
          item.extra.every((i) => p.extra.some((r) => i === r)),
      );

      if (index === -1) {
        return [...prev, item];
      }

      return prev
        .map((p, i) => (i === index ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((e) => e.quantity > 0);
    });
    localStorage.setItem("products", JSON.stringify(data));
    message.success("تم تحديث العربة");
    message.info("بتمسح ليه يفقير");
  }

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
