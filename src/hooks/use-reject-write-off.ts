import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { writeOffsService } from "@/service/write-offs.service";

interface RejectWriteOffParams {
  writeOffId: string;
  reason: string;
}

export function useRejectWriteOff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ writeOffId, reason }: RejectWriteOffParams) =>
      writeOffsService.reject(writeOffId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
      toast.success("Списання відхилено");
    },
    onError: (error: unknown) => {
      const err = error as { message?: string };
      const message = err.message || "Не вдалося відхилити списання";
      toast.error(message);
    },
  });
}
