import { useQuery } from "@tanstack/react-query";

import { planRecordsService, PlanRecordsQuery } from "@/service/plan-records.service";
import { PlanRecordsResponse } from "@/features/plan-register/types/plan-record.types";

export function usePlanRecords(
  params: PlanRecordsQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<PlanRecordsResponse>({
    queryKey: ["plan-records", params],
    queryFn: () => planRecordsService.getPlanRecords(params),
  });

  return {
    data,
    isLoading,
    error,
  };
}

