import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { writeOffsService } from "@/service/write-offs.service";

interface SubmitError {
  message?: string;
  details?: string[];
}

export function useSubmitWriteOff() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (writeOffId: string) => writeOffsService.submit(writeOffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["write-offs"] });
      toast.success("Списання успішно відправлено на розгляд");
    },
    onError: (error: unknown) => {
      const err = error as SubmitError;
      if (err.details && err.details.length > 0) {
        toast.error(
          `Недостатня кількість матеріалів: ${err.details.join(", ")}`
        );
      } else {
        const message = err.message || "Не вдалося відправити списання";
        toast.error(message);
      }
    },
  });
}
