import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { usersService } from "@/service/users.service";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (userId: string) => {
      return usersService.delete(userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Користувача успішно видалено");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити користувача");
    },
  });

  return { deleteUser, isPending };
}

