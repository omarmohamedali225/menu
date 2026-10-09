import OfflineMode from "@/components/menu/Internet";
import { router } from "@/routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";

const queryCLient = new QueryClient();
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
        <QueryClientProvider client={queryCLient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
