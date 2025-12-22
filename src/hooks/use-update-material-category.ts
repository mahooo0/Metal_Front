import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  materialCategoriesService,
  UpdateMaterialCategoryDto,
} from "@/service/material-categories.service";

export function useUpdateMaterialCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMaterialCategoryDto }) =>
      materialCategoriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-categories"] });
      toast.success("Категорію успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити категорію");
    },
  });
}
