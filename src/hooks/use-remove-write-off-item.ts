import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { writeOffsService } from "@/service/write-offs.service";

export function useRemoveWriteOffItem(writeOffId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) =>
      writeOffsService.removeItem(writeOffId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs", writeOffId] });
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити товар зі списання");
    },
  });
}
