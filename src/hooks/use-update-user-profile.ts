import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usersService } from "@/service/users.service";

type UpdatePayload = {
  displayName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  position?: string | null;
  isTwoFactorEnabled?: boolean;
};

export function useUpdateUserProfile(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["user-update-profile", userId],
    mutationFn: async (payload: UpdatePayload) => {
      if (!userId) throw new Error("User id is required");
      return usersService.updateUserProfile(userId, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["auth-me"] });
    },
  });

  return { updateProfile, isPending };
}


