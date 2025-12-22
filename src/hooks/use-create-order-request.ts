import { useMutation, useQueryClient } from "@tanstack/react-query";

import { orderRequestsService, CreateOrderRequestDto } from "@/service/order-requests.service";

export function useCreateOrderRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderRequestDto) => orderRequestsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-requests"] });
    },
  });
}

