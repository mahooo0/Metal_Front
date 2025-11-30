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

  public create(data: { name: string; permissions: string[] }) {
    return api.post<RoleDto>("roles", data);
  }

  public update(id: string, data: { name: string; permissions: string[] }) {
    return api.patch<RoleDto>(`roles/${id}`, data);
  }

  public delete(id: string) {
    return api.delete<void>(`roles/${id}`);
  }

  public assign(userId: string, roleIds: string[]): Promise<void> {
    return api.post(`roles/assign/${userId}`, { roleIds });
  }
}

export const rolesService = new RolesService();
