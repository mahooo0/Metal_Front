import { useQuery } from "@tanstack/react-query";

import {
  materialCategoriesService,
  MaterialCategory,
} from "@/service/material-categories.service";

export function useMaterialCategoryById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<MaterialCategory>({
    queryKey: ["material-categories", id],
    queryFn: () => materialCategoriesService.getById(id!),
    enabled: !!id,
  });

  return {
    category: data,
    isLoading,
    error,
  };
}
