import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  writeOffsService,
  UpdateWriteOffItemDto,
} from "@/service/write-offs.service";

export function useUpdateWriteOffItem(writeOffId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      data,
    }: {
      itemId: string;
      data: UpdateWriteOffItemDto;
    }) => writeOffsService.updateItem(writeOffId, itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs", writeOffId] });
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити товар");
    },
  });
}
