import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { inventoriesService } from "@/service/inventories.service";

export function useApproveInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inventoriesService.approve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success("Інвентаризацію успішно затверджено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося затвердити інвентаризацію");
    },
  });
}
