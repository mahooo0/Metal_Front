import { useQuery } from "@tanstack/react-query";

import {
  materialItemsService,
  MaterialItem,
} from "@/service/material-items.service";

export function useMaterialItemById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<MaterialItem>({
    queryKey: ["material-items", id],
    queryFn: () => materialItemsService.getById(id!),
    enabled: !!id,
  });

  return {
    item: data,
    isLoading,
    error,
  };
}
