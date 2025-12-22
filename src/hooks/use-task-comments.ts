import { tasksService } from "@/service/tasks.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddTaskComment(taskId: string | null | undefined) {
  const queryClient = useQueryClient();
  const { mutate: addComment, isPending } = useMutation({
    mutationKey: ["task-add-comment", taskId],
    mutationFn: async (text: string) => {
      if (!taskId) throw new Error("Task id is required");
      return tasksService.addComment(taskId, text);
    },
    onSuccess: () => {
      // Invalidate task query to refetch task with updated comments
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });
  return { addComment, isPending };
}
