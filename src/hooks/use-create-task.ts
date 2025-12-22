import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { tasksService, CreateTaskDto } from "@/service/tasks.service";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskDto) => tasksService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Задачу успішно створено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити задачу");
    },
  });
}

