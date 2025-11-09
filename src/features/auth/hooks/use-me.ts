import { useQuery } from "@tanstack/react-query";

import { authService } from "@/features/auth/services";

export function useMe(enabled: boolean = true) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth-me"],
    queryFn: () => authService.getMe(),
    enabled,
  });

  return { user, isLoading, error };
}
