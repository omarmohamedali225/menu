import AuthGuards from "@/guards/AuthGuards";
import GuestGuards from "@/guards/GuestGuards";
import DashboardLayout from "@/components/dashboard/layouts/DashLayout";
import RootLayout from "@/components/menu/layouts/RootLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
import Extras from "@/pages/Extras";
import Menu from "@/pages/Menu";
import Offers from "@/pages/Offers";
import Products from "@/pages/Products";
import { createBrowserRouter } from "react-router";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    path: "/:tenantId",
    children: [{ index: true, Component: Menu }],
  },
  {
    Component: AuthGuards,
    children: [
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
    ],
  },
  {
    Component: GuestGuards,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
