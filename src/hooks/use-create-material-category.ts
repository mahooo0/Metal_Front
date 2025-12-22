import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  materialCategoriesService,
  CreateMaterialCategoryDto,
} from "@/service/material-categories.service";

export function useCreateMaterialCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaterialCategoryDto) =>
      materialCategoriesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-categories"] });
      toast.success("Категорію успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити категорію");
    },
  });
}
