import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { UpdateTaskDto } from "@/features/tasks/types/task-api.types";
import { tasksService } from "@/service/tasks.service";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskDto }) =>
      tasksService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", variables.id] });
      toast.success("Задачу успішно оновлено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити задачу");
    },
  });
}

