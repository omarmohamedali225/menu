import Cart from "@/components/menu/Cart";
import Navbar from "@/components/layouts/Navbar";
import CartContext from "@/contexts/CartContext";
import { Outlet } from "react-router";
import StorageCartContext from "@/hooks/useCartStorage";

export default function RootLayout() {
  return (
    <CartContext>
      <StorageCartContext>
        <Navbar />
        <Cart />
        <div className="max-w-2xl mx-auto py-3 px-4">
          <Outlet />
        </div>
      </StorageCartContext>
    </CartContext>
  );
}
