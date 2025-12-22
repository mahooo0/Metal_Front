import {
  OrderRequestsQuery,
  orderRequestsService,
} from "@/service/order-requests.service";
import { useQuery } from "@tanstack/react-query";

import { OrderRequestsResponse } from "@/features/orders/types/order-request.types";

export function useOrderRequests(
  params: OrderRequestsQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<OrderRequestsResponse>({
    queryKey: ["order-requests", params.page ?? 1, params.limit ?? 20],
    queryFn: () => orderRequestsService.getOrders(params),
  });

  return {
    data,
    isLoading,
    error,
  };
}
