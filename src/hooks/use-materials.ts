import { useQuery } from "@tanstack/react-query";

import {
  materialsService,
  MaterialsQuery,
  MaterialsResponse,
} from "@/service/materials.service";

export function useMaterials(params: MaterialsQuery = { page: 1, limit: 20 }) {
  const { data, isLoading, error } = useQuery<MaterialsResponse>({
    queryKey: ["materials", params],
    queryFn: () => materialsService.getAll(params),
  });

  return {
    data,
    materials: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
