import { useQuery } from "@tanstack/react-query";

import { tasksService } from "@/service/tasks.service";
import {
  TasksQuery,
  TasksResponse,
} from "@/features/tasks/types/task-api.types";

export function useTasks(params: TasksQuery = { page: 1, limit: 20 }) {
  const { data, isLoading, error } = useQuery<TasksResponse>({
    queryKey: ["tasks", params],
    queryFn: () => tasksService.getTasks(params),
  });

  return {
    data,
    isLoading,
    error,
  };
}

