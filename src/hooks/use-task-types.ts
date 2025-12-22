import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { taskTypesService } from "@/service/task-types.service";
import {
  TaskType,
  CreateTaskTypeDto,
  UpdateTaskTypeDto,
} from "@/features/tasks/types/task-type.types";

export function useTaskTypes() {
  const { data, isLoading, error } = useQuery<TaskType[]>({
    queryKey: ["task-types"],
    queryFn: () => taskTypesService.list(),
  });

  return {
    taskTypes: data || [],
    isLoading,
    error,
  };
}

export function useCreateTaskType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskTypeDto) => taskTypesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-types"] });
    },
  });
}

export function useUpdateTaskType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskTypeDto }) =>
      taskTypesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-types"] });
    },
  });
}

export function useDeleteTaskType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => taskTypesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task-types"] });
    },
  });
}

