import DashboardLayout from "@/layouts/DashLayout";
import RootLayout from "@/layouts/RootLayout";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
import Extras from "@/pages/Extras";
import Menu from "@/pages/Menu";
import Offers from "@/pages/Offers";
import Products from "@/pages/Products";
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
      { path: "products", Component: Products },
      { path: "categories", Component: Categories },
      { path: "extras", Component: Extras },
      { path: "offers", Component: Offers },
    ],
  },
  {
    path: "*",
    element: "not found 404",
  },
]);
