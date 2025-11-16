import { usersService } from "@/service/users.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddUserPhone(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { mutate: addPhone, isPending } = useMutation({
    mutationKey: ["user-add-phone", userId],
    mutationFn: async (phone: string) => {
      if (!userId) throw new Error("User id is required");
      return usersService.addPhone(userId, phone);
    },
    onSuccess: () => {
      // invalidate profile and lists
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  return { addPhone, isPending };
}

export function useDeleteUserPhone(userId: string | undefined) {
  const queryClient = useQueryClient();

  const { mutate: deletePhone, isPending } = useMutation({
    mutationKey: ["user-delete-phone", userId],
    mutationFn: async (phone: string) => {
      if (!userId) throw new Error("User id is required");
      return usersService.deletePhone(userId, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  return { deletePhone, isPending };
}
