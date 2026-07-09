import Button from "@/components/Button";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <div className="border-b border-b-amber-200">
      <div className="max-w-4xl mx-auto py-3 px-4 border-b-amber-800">
        <div className="flex items-center gap-3">
          <img src="logo.webp" alt="Logo" className="w-14 h-14 rounded-full" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-6">El baraka</h1>
            <p className="font-medium truncate text-[11px] text-[#92400e99] uppercase">
              Fresh Egyptian food delivered to your door.
            </p>
          </div>
          <div className="space-x-1 flex">
            <Button text="عربي" />
            <Button>
              <ShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-amber-900 text-amber-100 p-1 rounded-full min-w-5 h-5 text-[10px] flex justify-center items-center border border-amber-50">
                1
              </span>
            </Button>

            {/* <button className="relative bg-amber-100 text-amber-900 rounded-full py-1 px-2 font-bold text-xs hover:bg-amber-200 transition-colors">
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
