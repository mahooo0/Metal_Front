import { useQuery } from "@tanstack/react-query";

import { orderRequestsService } from "@/service/order-requests.service";
import { OrderRequestsResponse, OrderRequestStatus } from "@/features/orders/types/order-request.types";

export function useOrderRequestsByStatus(status: OrderRequestStatus) {
  const { data, isLoading, error } = useQuery<OrderRequestsResponse>({
    queryKey: ["order-requests", "by-status", status],
    queryFn: () => orderRequestsService.getOrdersByStatus(status),
  });

  return {
    orders: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}

