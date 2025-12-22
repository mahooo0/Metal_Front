import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  materialsService,
  UpdateMaterialDto,
} from "@/service/materials.service";

export function useUpdateMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMaterialDto }) =>
      materialsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
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
