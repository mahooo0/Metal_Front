import { useQuery } from "@tanstack/react-query";

import {
  materialCategoriesService,
  MaterialCategoriesQuery,
  MaterialCategoriesResponse,
} from "@/service/material-categories.service";

export function useMaterialCategories(
  params: MaterialCategoriesQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<MaterialCategoriesResponse>({
    queryKey: ["material-categories", params],
    queryFn: () => materialCategoriesService.getCategories(params),
  });

  return {
    data,
    categories: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
