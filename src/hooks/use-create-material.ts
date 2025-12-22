import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  materialsService,
  CreateMaterialDto,
} from "@/service/materials.service";

export function useCreateMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaterialDto) => materialsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
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
