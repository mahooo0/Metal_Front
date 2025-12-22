import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  purchasesService,
  CreatePurchaseDto,
} from "@/service/purchases.service";

export function useCreatePurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePurchaseDto) => purchasesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success("Закупку успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити закупку");
    },
  });
}
