import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { planRecordsService } from "@/service/plan-records.service";

export interface UpdatePlanRecordDto {
  registrationDate: string;
  planNumber: string;
  orderNumber: string;
  metalBrandId: string;
  metalThickness: number;
}

export function useUpdatePlanRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanRecordDto }) =>
      planRecordsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["plan-records"] });
      queryClient.invalidateQueries({ queryKey: ["plan-record", variables.id] });
      toast.success("План успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити план");
    },
  });
}

