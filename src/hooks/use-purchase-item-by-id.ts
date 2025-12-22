import { useQuery } from "@tanstack/react-query";

import {
  purchaseItemsService,
  PurchaseItem,
} from "@/service/purchase-items.service";

export function usePurchaseItemById(
  purchaseId: string | null | undefined,
  id: string | null | undefined
) {
  const { data, isLoading, error } = useQuery<PurchaseItem>({
    queryKey: ["purchase-items", purchaseId, id],
    queryFn: () => purchaseItemsService.getById(purchaseId!, id!),
    enabled: !!purchaseId && !!id,
  });

  return {
    purchaseItem: data,
    isLoading,
    error,
  };
}
