import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { bendingPriceListService } from "@/service/bending-price-list.service";

export function useDeleteBendingPrice() {
  const queryClient = useQueryClient();

  const { mutate: deleteBendingPrice, isPending } = useMutation({
    mutationFn: (id: string) => bendingPriceListService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bending-prices"] });
      toast.success("Ціну гибки успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити ціну гибки");
    },
  });

  return {
    deleteBendingPrice,
    isPending,
  };
}
