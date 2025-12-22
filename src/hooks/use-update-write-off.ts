import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  writeOffsService,
  UpdateWriteOffDto,
} from "@/service/write-offs.service";

export function useUpdateWriteOff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWriteOffDto }) =>
      writeOffsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      toast.success("Списання успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити списання");
    },
  });
}
