import { Drawer } from "@/components/layouts/Drawer";
import { Flex } from "antd";
import { Outlet } from "react-router";

export default function DashLayout() {
  return (
    <Flex>
      <Drawer />
      <div className="w-[calc(100%-240px)] max-md:w-full! mr-auto bg-white">
        <Outlet />
      </div>
    </Flex>
  );
}
