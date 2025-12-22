import { useQuery } from "@tanstack/react-query";

import {
  bendingPriceListService,
  BendingPriceListItem,
} from "@/service/bending-price-list.service";

export function useBendingPriceById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<BendingPriceListItem>({
    queryKey: ["bending-prices", id],
    queryFn: () => bendingPriceListService.getById(id!),
    enabled: !!id,
  });

  return {
    bendingPrice: data,
    isLoading,
    error,
  };
}
