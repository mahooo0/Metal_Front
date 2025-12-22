import { useQuery } from "@tanstack/react-query";

import {
  inventoriesService,
  InventoriesQuery,
  InventoriesResponse,
} from "@/service/inventories.service";

export function useInventories(
  params: InventoriesQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<InventoriesResponse>({
    queryKey: ["inventories", params],
    queryFn: () => inventoriesService.getAll(params),
  });

  return {
    data,
    inventories: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
