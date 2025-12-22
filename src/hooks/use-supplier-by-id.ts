import { useQuery } from "@tanstack/react-query";

import { suppliersService, Supplier } from "@/service/suppliers.service";

export function useSupplierById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<Supplier>({
    queryKey: ["suppliers", id],
    queryFn: () => suppliersService.getById(id!),
    enabled: !!id,
  });

  return {
    supplier: data,
    isLoading,
    error,
  };
}
