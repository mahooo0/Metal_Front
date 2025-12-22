import { useQuery } from "@tanstack/react-query";

import { purchasesService, Purchase } from "@/service/purchases.service";

export function usePurchaseById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<Purchase>({
    queryKey: ["purchases", id],
    queryFn: () => purchasesService.getById(id!),
    enabled: !!id,
  });

  return {
    purchase: data,
    isLoading,
    error,
  };
}
