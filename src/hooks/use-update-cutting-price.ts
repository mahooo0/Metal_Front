import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  cuttingPriceListService,
  UpdateCuttingPriceDto,
} from "@/service/cutting-price-list.service";

export function useUpdateCuttingPrice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCuttingPriceDto }) =>
      cuttingPriceListService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cutting-prices"] });
      toast.success("Ціну різки успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити ціну різки");
    },
  });
}
