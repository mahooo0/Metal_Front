import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { planRecordsService } from "@/service/plan-records.service";

export function useDeletePlanRecord() {
  const queryClient = useQueryClient();

  const { mutate: deletePlanRecord, isPending } = useMutation({
    mutationFn: (id: string) => planRecordsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plan-records"] });
      toast.success("План успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити план");
    },
  });

  return {
    deletePlanRecord,
    isPending,
  };
}

