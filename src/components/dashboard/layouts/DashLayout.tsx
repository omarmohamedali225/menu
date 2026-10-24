import { Drawer } from "@/components/menu/layouts/Drawer";
import DrawerContext, { useDrawer } from "@/contexts/OpenDrawer";
import { useProfile } from "@/features/dashboard/hooks";
import { Avatar, Dropdown, Flex } from "antd";
import { Menu } from "lucide-react";
import { Outlet } from "react-router";

export default function DashLayout() {
  return (
    <Flex>
      <DrawerContext>
        <Drawer />
        <div className="w-[calc(100%-240px)] max-md:w-full! mr-auto">
          <NavDash />
          <div className="mt-17.25"></div>
          <Outlet />
        </div>
      </DrawerContext>
    </Flex>
  );
}

// function subscribe(cb: () => void) {
//   window.addEventListener("online", cb);
//   window.addEventListener("offline", cb);
//   return () => {
//     window.removeEventListener("online", cb);
//     window.removeEventListener("offline", cb);
//   };
// }
// function getSnapshot() {
//   return navigator.onLine;
// }

function NavDash() {
  const { handlerOpen } = useDrawer();
  // const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  const { data } = useProfile();
  return (
    <div className="fixed top-0 w-[calc(100%-240px)] max-md:w-full! z-10 bg-white p-5 flex items-center justify-between border-b-2 border-b-gray-100">
      <div className="flex gap-2">
        <Menu
          onClick={handlerOpen}
          className="md:hidden active:scale-95 cursor-pointer"
        />
        <h1 className="text-lg text-primary">لوحه التحكم</h1>
      </div>
      <Dropdown
        menu={{
          items: [
            {
              key: "info_name",
              label: (
                <span className="text-gray-500 text-xs">
                  اسم المنيو : {data?.name}
                </span>
              ),
              style: { cursor: "default", background: "transperant" },
              disabled: true,
            },
            {
              key: "info_id",
              label: (
                <span className="text-gray-500 text-xs">
                  المعرف : {data?.id}
                </span>
              ),
              style: { cursor: "default", background: "transperant" },
              disabled: true,
            },
            { type: "divider" },
            {
              key: 1,
              label: "خروج",
            },
          ],
        }}
      >
        <Avatar className="cursor-pointer">🤯</Avatar>
      </Dropdown>
    </div>
  );
}
