import { useMutation, useQueryClient } from "@tanstack/react-query";

import { rolesService } from "@/service/roles.service";

export function useAssignRoles(userId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleIds: string[]) => {
      if (!userId) {
        throw new Error("UserId is required");
      }
      return rolesService.assign(userId, roleIds);
    },
    onSuccess: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
        queryClient.invalidateQueries({ queryKey: ["admin-users"] });
        queryClient.invalidateQueries({ queryKey: ["auth-me"] });
      }
    },
  });
}
