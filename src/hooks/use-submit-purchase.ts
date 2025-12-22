import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { purchasesService } from "@/service/purchases.service";

export function useSubmitPurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => purchasesService.submit(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["purchases", id] });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      queryClient.invalidateQueries({ queryKey: ["purchase-items", id] });
      toast.success("Закупку успішно підтверджено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(
        message || "Не вдалося підтвердити закупку. Переконайтеся, що всі товари готові."
      );
    },
  });
}
