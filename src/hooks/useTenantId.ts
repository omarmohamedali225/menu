import useAuth from "./useAuth";

export default function useTenantId() {
  const { claims } = useAuth();
  return claims?.user_metadata?.sub;
}
