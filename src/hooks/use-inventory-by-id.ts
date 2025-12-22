import { useQuery } from "@tanstack/react-query";

import { inventoriesService, Inventory } from "@/service/inventories.service";

export function useInventoryById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<Inventory>({
    queryKey: ["inventories", id],
    queryFn: () => inventoriesService.getById(id!),
    enabled: !!id,
  });

  return {
    inventory: data,
    isLoading,
    error,
  };
}
