import { useMutation, useQueryClient } from "@tanstack/react-query";

import { orderRequestsService } from "@/service/order-requests.service";
import { OrderRequestStatus } from "@/features/orders/types/order-request.types";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderRequestStatus }) =>
      orderRequestsService.updateStatus(id, status),
    onSuccess: async () => {
      // Invalidate all order-requests queries
      await queryClient.invalidateQueries({ queryKey: ["order-requests"] });
      // Данные обновятся автоматически через useKanbanOrders
    },
    onError: () => {
      // При ошибке invalidate все равно вызываем для обновления данных
      queryClient.invalidateQueries({ queryKey: ["order-requests"] });
    },
  });
}

