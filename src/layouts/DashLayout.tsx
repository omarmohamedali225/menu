import { Drawer } from "@/components/layouts/Drawer";
import DrawerContext, { useDrawer } from "@/contexts/OpenDrawer";
import { Flex } from "antd";
import { Menu } from "lucide-react";
import { Outlet } from "react-router";

export default function DashLayout() {
  return (
    <Flex>
      <DrawerContext>
        <Drawer />
        <div className="w-[calc(100%-240px)] max-md:w-full! mr-auto bg-gray-50">
          <NavDash />
          <div className="mt-17.25"></div>
          <Outlet />
        </div>
      </DrawerContext>
    </Flex>
  );
}
function NavDash() {
  const { handlerOpen } = useDrawer();
  return (
    <div className="fixed top-0 w-[calc(100%-240px)] max-md:w-full! z-10 bg-white p-5 flex items-center justify-between border-b-2 border-b-gray-100">
      <div className="flex gap-2">
        <Menu onClick={handlerOpen} className="md:hidden active:scale-95 cursor-pointer"/>
        <h1 className="text-lg">لوحه التحكم</h1>
      </div>
      <p className="text-gray-400 text-[11px]">حساب تجريبي</p>
    </div>
  );
}
