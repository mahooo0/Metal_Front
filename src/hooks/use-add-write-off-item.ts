import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  writeOffsService,
  AddWriteOffItemDto,
} from "@/service/write-offs.service";

export function useAddWriteOffItem(writeOffId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddWriteOffItemDto) =>
      writeOffsService.addItem(writeOffId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs", writeOffId] });
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося додати товар до списання");
    },
  });
}
