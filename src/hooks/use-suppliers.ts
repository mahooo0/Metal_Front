import { useQuery } from "@tanstack/react-query";

import {
  suppliersService,
  SuppliersQuery,
  SuppliersResponse,
} from "@/service/suppliers.service";

export function useSuppliers(params: SuppliersQuery = { page: 1, limit: 20 }) {
  const { data, isLoading, error } = useQuery<SuppliersResponse>({
    queryKey: ["suppliers", params],
    queryFn: () => suppliersService.getAll(params),
  });

  return {
    data,
    suppliers: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
