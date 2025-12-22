import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  purchaseItemsService,
  CreatePurchaseItemDto,
} from "@/service/purchase-items.service";

export function useCreatePurchaseItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      purchaseId,
      data,
    }: {
      purchaseId: string;
      data: CreatePurchaseItemDto;
    }) => purchaseItemsService.create(purchaseId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["purchase-items", variables.purchaseId],
      });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Товар закупки успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити товар закупки");
    },
  });
}
