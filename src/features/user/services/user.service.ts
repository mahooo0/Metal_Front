import { User } from "@/features/auth/types";
import {
  SettingsSchemaType,
  UpdatePasswordSchemaType,
} from "@/features/user/schemas";

import { api } from "@/shared/api";

class UserService {
  public async findProfile() {
    const response = await api.get<User>("users/profile");

    return response;
  }

  public async findById(id: string) {
    const response = await api.get<User>(`users/${id}`);

    return response;
  }

  public async updateProfile(data: SettingsSchemaType) {
    const response = await api.put("users/profile", data);

    return response;
  }

  public async updatePassword(
    data: Pick<UpdatePasswordSchemaType, "currentPassword" | "newPassword">
  ) {
    const response = await api.put("users/password", data);

    return response;
  }
}

export const userService = new UserService();
