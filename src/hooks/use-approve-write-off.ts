import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { writeOffsService } from "@/service/write-offs.service";

export function useApproveWriteOff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (writeOffId: string) => writeOffsService.approve(writeOffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
      toast.success("Списання успішно затверджено");
    },
    onError: (error: unknown) => {
      const err = error as { message?: string };
      const message = err.message || "Не вдалося затвердити списання";
      toast.error(message);
    },
  });
}
