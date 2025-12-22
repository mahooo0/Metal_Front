import { useQuery } from "@tanstack/react-query";

import { orderRequestsService } from "@/service/order-requests.service";
import { OrderRequest } from "@/features/orders/types/order-request.types";

export function useOrderRequestById(id: string | undefined, enabled: boolean = true) {
  const { data, isLoading, error } = useQuery<OrderRequest>({
    queryKey: ["order-request", id],
    queryFn: () => orderRequestsService.getById(id as string),
    enabled: enabled && !!id,
  });

  return {
    orderRequest: data,
    isLoading,
    error,
  };
}

