import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  bendingPriceListService,
  CreateBendingPriceDto,
} from "@/service/bending-price-list.service";

export function useCreateBendingPrice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBendingPriceDto) =>
      bendingPriceListService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bending-prices"] });
      toast.success("Ціну гибки успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити ціну гибки");
    },
  });
}
