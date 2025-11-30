import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { rolesService } from "@/service/roles.service";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  const { mutate: updateRole, isPending } = useMutation({
    mutationKey: ["update-role"],
    mutationFn: (data: {
      id: string;
      name: string;
      permissions: string[];
    }) => {
      return rolesService.update(data.id, {
        name: data.name,
        permissions: data.permissions,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Роль успішно оновлена");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося оновити роль");
    },
  });

  return { updateRole, isPending };
}

