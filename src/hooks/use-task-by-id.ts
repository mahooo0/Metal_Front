import { useQuery } from "@tanstack/react-query";

import { tasksService } from "@/service/tasks.service";

export function useTaskById(id: string | null) {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => tasksService.getById(id!),
    enabled: !!id,
  });
}

