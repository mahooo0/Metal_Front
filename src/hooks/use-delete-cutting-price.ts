import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cuttingPriceListService } from "@/service/cutting-price-list.service";

export function useDeleteCuttingPrice() {
  const queryClient = useQueryClient();

  const { mutate: deleteCuttingPrice, isPending } = useMutation({
    mutationFn: (id: string) => cuttingPriceListService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cutting-prices"] });
      toast.success("Ціну різки успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити ціну різки");
    },
  });

  return {
    deleteCuttingPrice,
    isPending,
  };
}
