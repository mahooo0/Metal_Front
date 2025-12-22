import { useQuery } from "@tanstack/react-query";

import {
  writeOffsService,
  WriteOffsQuery,
  WriteOffsResponse,
} from "@/service/write-offs.service";

export function useWriteOffs(params: WriteOffsQuery = { page: 1, limit: 20 }) {
  const { data, isLoading, error } = useQuery<WriteOffsResponse>({
    queryKey: ["write-offs", params],
    queryFn: () => writeOffsService.getAll(params),
  });

  return {
    data,
    writeOffs: data?.data || [],
    meta: data?.meta,
    isLoading,
    error,
  };
}
