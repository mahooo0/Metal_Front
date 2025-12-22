import { useQuery } from "@tanstack/react-query";

import {
  cuttingPriceListService,
  CuttingPriceListQuery,
  CuttingPriceListResponse,
} from "@/service/cutting-price-list.service";

export function useCuttingPrices(
  params: CuttingPriceListQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<CuttingPriceListResponse>({
    queryKey: ["cutting-prices", params],
    queryFn: () => cuttingPriceListService.getAll(params),
  });

  return {
    data,
    cuttingPrices: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
