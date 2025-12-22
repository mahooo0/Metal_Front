import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  purchaseItemsService,
  PurchaseItemStatus,
} from "@/service/purchase-items.service";

export function useUpdatePurchaseItemStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      purchaseId,
      itemId,
      status,
    }: {
      purchaseId: string;
      itemId: string;
      status: PurchaseItemStatus;
    }) => purchaseItemsService.updateStatus(purchaseId, itemId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["purchase-items", variables.purchaseId],
      });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Статус товару успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити статус товару");
    },
  });
}
