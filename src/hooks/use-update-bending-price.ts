import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  bendingPriceListService,
  UpdateBendingPriceDto,
} from "@/service/bending-price-list.service";

export function useUpdateBendingPrice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBendingPriceDto }) =>
      bendingPriceListService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bending-prices"] });
      toast.success("Ціну гибки успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити ціну гибки");
    },
  });
}
