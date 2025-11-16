import { useQuery } from "@tanstack/react-query";

import { rolesService, type RoleDto } from "@/service/roles.service";

export function useRoles() {
  const { data, isLoading, error } = useQuery<RoleDto[]>({
    queryKey: ["roles"],
    queryFn: () => rolesService.list(),
  });

  return { roles: data || [], isLoading, error };
}


