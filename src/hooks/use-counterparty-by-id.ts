import { useQuery } from "@tanstack/react-query";

import { counterpartiesService } from "@/service/counterparties.service";

export function useCounterpartyById(id: string | undefined, enabled: boolean = true) {
  const { data: counterparty, isLoading, error } = useQuery({
    queryKey: ["counterparty", id],
    queryFn: () => counterpartiesService.getById(id!),
    enabled: enabled && !!id,
  });

  return { counterparty, isLoading, error };
}

