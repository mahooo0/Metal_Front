import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  inventoriesService,
  UpdateInventoryDto,
} from "@/service/inventories.service";

export function useUpdateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInventoryDto }) =>
      inventoriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success("Інвентаризацію успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити інвентаризацію");
    },
  });
}
