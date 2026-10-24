import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchExtras,
  fetchMenu,
  fetchOffers,
  fetchProfile,
  fetchTenantExists,
} from "./api";
import useTenantIdwithParams from "@/hooks/useTenantIdwithParams";

export function useMenu() {
  const tenantId = useTenantIdwithParams();

  return useQuery({
    queryKey: ["menu", tenantId],
    queryFn: () => fetchMenu(tenantId!),
    staleTime: 60 * 60 * 1000, //cache 1 hour
    enabled: !!tenantId,
  });
}

export function useCategories() {
  const tenantId = useTenantIdwithParams();
  return useQuery({
    queryKey: ["categories", tenantId],
    queryFn: () => fetchCategories(tenantId!),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}

export function useOffer() {
  const tenantId = useTenantIdwithParams();

  return useQuery({
    queryKey: ["offers", tenantId],
    queryFn: () => fetchOffers(tenantId!),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}

export function useExtras() {
  const tenantId = useTenantIdwithParams();
  return useQuery({
    queryKey: ["extras", tenantId],
    queryFn: () => fetchExtras(tenantId!),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}

export function useExistTenant() {
  const tenantId = useTenantIdwithParams();
  return useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: () => fetchTenantExists(tenantId!),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
    retry: false,
  });
}

export function useProfile() {
  const tenantId = useTenantIdwithParams();
  return useQuery({
    queryKey: ["profile", tenantId],
    queryFn: () => fetchProfile(tenantId!),
    staleTime: 60 * 60 * 1000,
    enabled: !!tenantId,
  });
}
