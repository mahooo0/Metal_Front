import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { materialItemsService } from "@/service/material-items.service";

export function useDeleteMaterialItem() {
  const queryClient = useQueryClient();

  const { mutate: deleteItem, isPending } = useMutation({
    mutationFn: (id: string) => materialItemsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-items"] });
      toast.success("Матеріал успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити матеріал");
    },
  });

  return {
    deleteItem,
    isPending,
  };
}
