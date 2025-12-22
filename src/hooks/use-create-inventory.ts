import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  inventoriesService,
  CreateInventoryDto,
} from "@/service/inventories.service";

export function useCreateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInventoryDto) => inventoriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      toast.success("Інвентаризацію успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити інвентаризацію");
    },
  });
}
