import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { purchasesService } from "@/service/purchases.service";

export function useDeletePurchase() {
  const queryClient = useQueryClient();

  const { mutate: deletePurchase, isPending } = useMutation({
    mutationFn: (id: string) => purchasesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Закупку успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити закупку");
    },
  });

  return {
    deletePurchase,
    isPending,
  };
}
