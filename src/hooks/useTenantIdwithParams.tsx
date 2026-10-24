import { useParams } from "react-router";

export default function useTenantIdwithParams() {
  const params = useParams();
  return params.tenantId;
}
