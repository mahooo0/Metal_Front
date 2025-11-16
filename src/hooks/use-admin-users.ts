import { usersService } from "@/service/users.service";
import { AdminUsersQuery, AdminUsersResponse } from "@/types/admin-users.types";
import { useQuery } from "@tanstack/react-query";

export function useAdminUsers(
  params: AdminUsersQuery = { page: 1, limit: 20 }
) {
  const { data, isLoading, error } = useQuery<AdminUsersResponse>({
    queryKey: [
      "admin-users",
      params.page ?? 1,
      params.limit ?? 20,
      params.search ?? null,
    ],
    queryFn: () => usersService.list(params),
  });

  return { data, isLoading, error };
}
