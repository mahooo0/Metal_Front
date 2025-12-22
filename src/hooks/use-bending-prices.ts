import { useQuery } from "@tanstack/react-query";

import {
  bendingPriceListService,
  BendingPriceListQuery,
  BendingPriceListResponse,
} from "@/service/bending-price-list.service";

export function useBendingPrices(
  params: BendingPriceListQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<BendingPriceListResponse>({
    queryKey: ["bending-prices", params],
    queryFn: () => bendingPriceListService.getAll(params),
  });

  return {
    data,
    bendingPrices: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
