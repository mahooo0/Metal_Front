import { api } from "@/shared/api";

export interface RoleDto {
  id: string;
  name: string;
  system: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

class RolesService {
  public list() {
    return api.get<RoleDto[]>("roles");
  }

  public assign(userId: string, roleIds: string[]): Promise<void> {
    return api.post(`roles/assign/${userId}`, { roleIds });
  }
}

export const rolesService = new RolesService();
