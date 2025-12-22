import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { materialCategoriesService } from "@/service/material-categories.service";

export function useDeleteMaterialCategory() {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: (id: string) => materialCategoriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["material-categories"] });
      toast.success("Категорію успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити категорію");
    },
  });

  return {
    deleteCategory,
    isPending,
  };
}
