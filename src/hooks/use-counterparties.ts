import { counterpartiesService } from "@/service/counterparties.service";
import { useQuery } from "@tanstack/react-query";

import {
  CounterpartiesQuery,
  CounterpartiesResponse,
} from "@/features/counterparties/types/counterparty.types";

export function useCounterparties(
  params: CounterpartiesQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<CounterpartiesResponse>({
    queryKey: [
      "counterparties",
      params.page ?? 1,
      params.limit ?? 20,
      params.search ?? null,
      params.edrpou ?? null,
      params.ipn ?? null,
      params.sortBy ?? null,
      params.sortOrder ?? null,
    ],
    queryFn: () => counterpartiesService.list(params),
  });

  return {
    counterparties: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
