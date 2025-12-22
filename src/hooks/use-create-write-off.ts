import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  writeOffsService,
  CreateWriteOffDto,
} from "@/service/write-offs.service";

export function useCreateWriteOff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWriteOffDto) => writeOffsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      toast.success("Списання успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити списання");
    },
  });
}
