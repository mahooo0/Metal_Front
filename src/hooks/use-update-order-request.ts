import { useMutation, useQueryClient } from "@tanstack/react-query";

import { orderRequestsService, UpdateOrderRequestDto } from "@/service/order-requests.service";

export function useUpdateOrderRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderRequestDto }) =>
      orderRequestsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order-requests"] });
      queryClient.invalidateQueries({ queryKey: ["order-request", variables.id] });
    },
  });
}

