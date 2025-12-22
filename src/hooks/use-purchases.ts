import { useQuery } from "@tanstack/react-query";

import {
  purchasesService,
  PurchasesQuery,
  PurchasesResponse,
} from "@/service/purchases.service";

export function usePurchases(params: PurchasesQuery = { page: 1, limit: 20 }) {
  const { data, isLoading, error } = useQuery<PurchasesResponse>({
    queryKey: ["purchases", params],
    queryFn: () => purchasesService.getAll(params),
  });

  return {
    data,
    purchases: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
