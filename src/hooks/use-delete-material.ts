import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { materialsService } from "@/service/materials.service";

export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  const { mutate: deleteMaterial, isPending } = useMutation({
    mutationFn: (id: string) => materialsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
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
    deleteMaterial,
    isPending,
  };
}
