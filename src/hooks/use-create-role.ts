import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { rolesService } from "@/service/roles.service";

export function useCreateRole() {
  const queryClient = useQueryClient();

  const { mutate: createRole, isPending } = useMutation({
    mutationKey: ["create-role"],
    mutationFn: (data: { name: string; permissions: string[] }) => {
      return rolesService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Роль успішно створена");
    },
    onError: (error: unknown) => {
      const message =
        typeof error === "object" && error && "message" in error
          ? String((error as { message?: string }).message)
          : undefined;
      toast.error(message || "Не вдалося створити роль");
    },
  });

  return { createRole, isPending };
}

