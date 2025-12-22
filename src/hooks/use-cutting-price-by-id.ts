import { useQuery } from "@tanstack/react-query";

import {
  cuttingPriceListService,
  CuttingPriceListItem,
} from "@/service/cutting-price-list.service";

export function useCuttingPriceById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<CuttingPriceListItem>({
    queryKey: ["cutting-prices", id],
    queryFn: () => cuttingPriceListService.getById(id!),
    enabled: !!id,
  });

  return {
    cuttingPrice: data,
    isLoading,
    error,
  };
}
