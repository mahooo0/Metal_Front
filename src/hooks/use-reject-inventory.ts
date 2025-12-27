import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { inventoriesService } from "@/service/inventories.service";

interface RejectInventoryParams {
  id: string;
  reason: string;
}

export function useRejectInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: RejectInventoryParams) =>
      inventoriesService.reject(id, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success("Інвентаризацію відхилено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося відхилити інвентаризацію");
    },
  });
}
