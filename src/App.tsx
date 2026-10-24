// import OfflineMode from "@/components/menu/Internet";
import { router } from "@/routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router";
import AuthProvider from "./contexts/AuthContext";

const queryCLient = new QueryClient();
function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <OfflineMode /> */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#AB081D",
          },
        }}
      >
        <QueryClientProvider client={queryCLient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
