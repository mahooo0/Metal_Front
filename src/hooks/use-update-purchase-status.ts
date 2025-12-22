import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  purchasesService,
  PurchaseStatus,
} from "@/service/purchases.service";

export function useUpdatePurchaseStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: PurchaseStatus }) =>
      purchasesService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Статус закупки успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити статус закупки");
    },
  });
}
