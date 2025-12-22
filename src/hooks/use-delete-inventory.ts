import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { inventoriesService } from "@/service/inventories.service";

export function useDeleteInventory() {
  const queryClient = useQueryClient();

  const { mutate: deleteInventory, isPending } = useMutation({
    mutationFn: (id: string) => inventoriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success("Інвентаризацію успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити інвентаризацію");
    },
  });

  return {
    deleteInventory,
    isPending,
  };
}
