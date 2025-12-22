import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { tasksService } from "@/service/tasks.service";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: (id: string) => tasksService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Задачу успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити задачу");
    },
  });

  return {
    deleteTask,
    isPending,
  };
}

