import { useEffect, useState } from "react";

export default function OfflineMode() {
  const [offline, setOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = () => setOffline(true);
    const handleOnline = () => setOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <h2 className="text-xl font-bold">
          No Internet Connection
        </h2>

        <p className="text-gray-500 mt-2">
          Please check your connection and try again.
        </p>
      </div>
    </div>
  );
}