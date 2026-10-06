import OfflineMode from "@/components/menu/Internet";
import { router } from "@/routes/router";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";

function App() {
  return (
    <div className="bg-main min-h-screen">
      <OfflineMode />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#7b3306",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
