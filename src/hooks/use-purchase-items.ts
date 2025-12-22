import { useQuery } from "@tanstack/react-query";

import {
  purchaseItemsService,
  PurchaseItemsQuery,
  PurchaseItemsResponse,
} from "@/service/purchase-items.service";

export function usePurchaseItems(
  purchaseId: string,
  params: PurchaseItemsQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error, refetch } = useQuery<PurchaseItemsResponse>({
    queryKey: ["purchase-items", purchaseId, params],
    queryFn: () => purchaseItemsService.getAll(purchaseId, params),
    enabled: !!purchaseId,
  });

  return {
    data,
    purchaseItems: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
    refetch,
  };
}
