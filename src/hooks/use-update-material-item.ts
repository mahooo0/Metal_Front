import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  materialItemsService,
  UpdateMaterialItemDto,
} from "@/service/material-items.service";

export function useUpdateMaterialItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMaterialItemDto }) =>
      materialItemsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-items"] });
      toast.success("Матеріал успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити матеріал");
    },
  });
}
