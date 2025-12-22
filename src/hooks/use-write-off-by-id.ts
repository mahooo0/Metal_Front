import { useQuery } from "@tanstack/react-query";

import { writeOffsService, WriteOff } from "@/service/write-offs.service";

export function useWriteOffById(id: string | null | undefined) {
  const { data, isLoading, error } = useQuery<WriteOff>({
    queryKey: ["write-offs", id],
    queryFn: () => writeOffsService.getById(id!),
    enabled: !!id,
  });

  return {
    writeOff: data,
    isLoading,
    error,
  };
}
