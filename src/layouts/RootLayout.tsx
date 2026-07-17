import Cart from "@/components/Cart";
import Navbar from "@/components/layouts/Navbar";
import CartContext from "@/contexts/CartContext";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <CartContext>
      <Navbar />
      <Cart/>
      <div className="max-w-2xl mx-auto py-3 px-4">
        <Outlet />
      </div>
    </CartContext>
  );
}
