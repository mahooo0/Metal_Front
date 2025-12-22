import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  cuttingPriceListService,
  CreateCuttingPriceDto,
} from "@/service/cutting-price-list.service";

export function useCreateCuttingPrice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCuttingPriceDto) =>
      cuttingPriceListService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cutting-prices"] });
      toast.success("Ціну різки успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити ціну різки");
    },
  });
}
