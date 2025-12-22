import { useQuery } from "@tanstack/react-query";

import { materialsService, Material } from "@/service/materials.service";

export function useMaterialById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<Material>({
    queryKey: ["materials", id],
    queryFn: () => materialsService.getById(id!),
    enabled: !!id,
  });

  return {
    material: data,
    isLoading,
    error,
  };
}
