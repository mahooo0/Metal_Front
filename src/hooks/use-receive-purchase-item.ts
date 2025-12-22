import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { purchaseItemsService } from "@/service/purchase-items.service";

export function useReceivePurchaseItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      purchaseId,
      itemId,
      receivedQuantity,
    }: {
      purchaseId: string;
      itemId: string;
      receivedQuantity: number;
    }) => purchaseItemsService.receive(purchaseId, itemId, receivedQuantity),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["purchase-items", variables.purchaseId],
      });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Кількість отриманого товару оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити кількість отриманого товару");
    },
  });
}
