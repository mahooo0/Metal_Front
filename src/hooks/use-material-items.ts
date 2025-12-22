import { useQuery } from "@tanstack/react-query";

import {
  materialItemsService,
  MaterialItemsQuery,
  MaterialItemsResponse,
} from "@/service/material-items.service";

export function useMaterialItems(
  params: MaterialItemsQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<MaterialItemsResponse>({
    queryKey: ["material-items", params],
    queryFn: () => materialItemsService.getItems(params),
  });

  return {
    data,
    items: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
