import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  materialItemsService,
  CreateMaterialItemDto,
} from "@/service/material-items.service";

export function useCreateMaterialItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaterialItemDto) =>
      materialItemsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-items"] });
      toast.success("Матеріал успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити матеріал");
    },
  });
}
