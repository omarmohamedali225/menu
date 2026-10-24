import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

export default function GuestGuards() {
  const { claims, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="p-6 text-center">جاري التحميل...</p>;

  if (claims) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
