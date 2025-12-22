import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { purchaseItemsService } from "@/service/purchase-items.service";

export function useDeletePurchaseItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ purchaseId, id }: { purchaseId: string; id: string }) =>
      purchaseItemsService.delete(purchaseId, id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["purchase-items", variables.purchaseId],
      });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Товар закупки успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити товар закупки");
    },
  });

  return {
    deletePurchaseItem: mutation.mutate,
    isPending: mutation.isPending,
  };
}
