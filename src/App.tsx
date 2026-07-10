import OfflineMode from "@/components/Internet";
import { router } from "@/routes/router";
import { RouterProvider } from "react-router";

function App() {
  return (
    <div className="bg-main min-h-screen">
      <OfflineMode />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
