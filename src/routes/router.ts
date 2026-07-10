import RootLayout from "@/layouts/RootLayout";
import Menu from "@/pages/Menu";
import Product from "@/pages/Product";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Menu },
      { path: "/product", Component: Product },
    ],
  },
]);
