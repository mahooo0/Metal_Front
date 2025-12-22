import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  purchasesService,
  UpdatePurchaseDto,
} from "@/service/purchases.service";

export function useUpdatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePurchaseDto }) =>
      purchasesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Закупку успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити закупку");
    },
  });
}
