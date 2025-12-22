import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { orderRequestsService } from "@/service/order-requests.service";

export function useDeleteOrderRequest() {
  const queryClient = useQueryClient();

  const { mutate: deleteOrderRequest, isPending } = useMutation({
    mutationFn: (id: string) => orderRequestsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-requests"] });
      toast.success("Замовлення успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити замовлення");
    },
  });

  return {
    deleteOrderRequest,
    isPending,
  };
}

