import { createContext, useContext, useState } from "react";

type Context = {
  open: boolean;
  handlerOpen: () => void;
  handlerClose: () => void;
};

const ContextOpenDrawer = createContext<Context | undefined>(undefined);

export default function DrawerContext({
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
    <ContextOpenDrawer.Provider value={{ open, handlerOpen, handlerClose }}>
      {children}
    </ContextOpenDrawer.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDrawer(): Context {
  const context = useContext(ContextOpenDrawer);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
