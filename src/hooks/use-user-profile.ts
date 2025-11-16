import { useQuery } from "@tanstack/react-query";

import { usersService } from "@/service/users.service";
import { UserProfile } from "@/types/admin-users.types";

export function useUserProfile(userId: string | undefined, enabled: boolean = true) {
  const { data, isLoading, error } = useQuery<UserProfile>({
    queryKey: ["user-profile", userId],
    queryFn: () => usersService.profile(userId as string),
    enabled: enabled && !!userId,
  });

  return { user: data, isLoading, error };
}


