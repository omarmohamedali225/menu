import DashboardLayout from "@/layouts/DashLayout";
import RootLayout from "@/layouts/RootLayout";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
// import Dashboard from "@/pages/Dashboard";
import Menu from "@/pages/Menu";
// import Product from "@/pages/Product";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
  {
    Component: RootLayout,
    path: "/",
    children: [{ index: true, Component: Menu }],
  },
  {
    Component: DashboardLayout,
    path: "/dashboard",
    children: [
      { index: true, Component: Dashboard },
      { path: "products", element: "products" },
      { path: "categories", Component: Categories },
      { path: "extras", element: "extras" },
      { path: "offers", element: "offers" },
    ],
  },
  {
    path: "*",
    element: "not found 404",
  },
]);
