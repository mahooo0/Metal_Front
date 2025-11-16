import { usersService } from "@/service/users.service";
import { UserComment } from "@/types/admin-users.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUserComments(
  userId: string | undefined,
  enabled: boolean = true
) {
  const { data, isLoading, error } = useQuery<UserComment[]>({
    queryKey: ["user-comments", userId],
    queryFn: () => usersService.getComments(userId as string),
    enabled: enabled && !!userId,
  });
  return { comments: data || [], isLoading, error };
}

export function useAddUserComment(userId: string | undefined) {
  const queryClient = useQueryClient();
  const { mutate: addComment, isPending } = useMutation({
    mutationKey: ["user-add-comment", userId],
    mutationFn: async (text: string) => {
      if (!userId) throw new Error("User id is required");
      return usersService.addComment(userId, text);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-comments", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-profile", userId] });
    },
  });
  return { addComment, isPending };
}
