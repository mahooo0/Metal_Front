import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { rolesService } from "@/service/roles.service";

export function useDeleteRole() {
  const queryClient = useQueryClient();

  const { mutate: deleteRole, isPending } = useMutation({
    mutationKey: ["delete-role"],
    mutationFn: (id: string) => {
      return rolesService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Роль успішно видалена");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося видалити роль");
    },
  });

  return { deleteRole, isPending };
}

