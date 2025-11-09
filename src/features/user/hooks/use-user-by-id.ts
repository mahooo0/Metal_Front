import { useQuery } from "@tanstack/react-query";

import { userService } from "@/features/user/services";

export function useUserById(
  userId: string | undefined,
  enabled: boolean = true
) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => userService.findById(userId!),
    enabled: enabled && !!userId,
  });

  return { user, isLoading, error };
}
