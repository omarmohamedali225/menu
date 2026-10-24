import Cart from "@/components/menu/Cart";
import Navbar from "@/components/menu/layouts/Navbar";
import CartContext from "@/contexts/CartContext";
import { Outlet } from "react-router";
import StorageCartContext from "@/hooks/useCartStorage";
import { useExistTenant } from "@/features/menu/hooks";

export default function RootLayout() {
  const { data, isError, isLoading } = useExistTenant();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center gap-1 justify-center px-4">
        <span className="w-6 h-6 border-2 border-l-transparent block rounded-full animate-spin"></span>
        جاري تحميل المنيو
      </div>
    );
  }

  if (isError || data === false) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-center text-lg">المنيو غير متوفر</p>
      </div>
    );
  }



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
