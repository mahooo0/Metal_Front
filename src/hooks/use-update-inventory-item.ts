import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Inventory, inventoriesService, UpdateInventoryItemDto } from "@/service/inventories.service";

interface UpdateInventoryItemParams {
  inventoryId: string;
  itemId: string;
  data: UpdateInventoryItemDto;
}

export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ inventoryId, itemId, data }: UpdateInventoryItemParams) =>
      inventoriesService.updateItem(inventoryId, itemId, data),
    onSuccess: (updatedInventory: Inventory, variables) => {
      // Update cache with the returned sorted inventory
      queryClient.setQueryData(["inventories", variables.inventoryId], updatedInventory);
      toast.success("Дані оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити дані");
    },
  });
}
