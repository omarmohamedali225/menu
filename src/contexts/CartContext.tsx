import { createContext, useContext, useState } from "react";

type Context = {
  open: boolean;
  handlerOpen: () => void;
  handlerClose: () => void;
};

const ContextC = createContext<Context | undefined>(undefined);

export default function CartContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const handlerOpen = () => {
    setOpen(true);
  };
  const handlerClose = () => {
    setOpen(false);
  };

  return (
    <ContextC.Provider value={{ open, handlerOpen, handlerClose }}>
      {children}
    </ContextC.Provider>
  );
}

export function useCart(): Context {
  const context = useContext(ContextC);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
