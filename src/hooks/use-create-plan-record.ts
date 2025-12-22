import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { planRecordsService } from "@/service/plan-records.service";

export interface CreatePlanRecordDto {
  registrationDate: string;
  planNumber: string;
  orderNumber: string;
  metalBrandId: string;
  metalThickness: number;
}

export function useCreatePlanRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlanRecordDto) =>
      planRecordsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plan-records"] });
      toast.success("План успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити план");
    },
  });
}

