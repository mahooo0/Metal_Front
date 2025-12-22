import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  purchaseItemsService,
  UpdatePurchaseItemDto,
} from "@/service/purchase-items.service";

export function useUpdatePurchaseItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      purchaseId,
      id,
      data,
    }: {
      purchaseId: string;
      id: string;
      data: UpdatePurchaseItemDto;
    }) => purchaseItemsService.update(purchaseId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["purchase-items", variables.purchaseId],
      });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Товар закупки успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити товар закупки");
    },
  });
}
