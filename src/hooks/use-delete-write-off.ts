import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { writeOffsService } from "@/service/write-offs.service";

export function useDeleteWriteOff() {
  const queryClient = useQueryClient();

  const { mutate: deleteWriteOff, isPending } = useMutation({
    mutationFn: (id: string) => writeOffsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      toast.success("Списання успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити списання");
    },
  });

  return {
    deleteWriteOff,
    isPending,
  };
}
