import { useQuery } from "@tanstack/react-query";

import { planRecordsService } from "@/service/plan-records.service";
import { PlanRecord } from "@/features/plan-register/types/plan-record.types";

export function usePlanRecordById(id: string | undefined, enabled: boolean = true) {
  const { data, isLoading, error } = useQuery<PlanRecord>({
    queryKey: ["plan-record", id],
    queryFn: () => planRecordsService.getById(id as string),
    enabled: enabled && !!id,
  });

  return {
    planRecord: data,
    isLoading,
    error,
  };
}

