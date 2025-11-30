import {
  AdminUsersQuery,
  AdminUsersResponse,
  UserProfile,
} from "@/types/admin-users.types";

import { api } from "@/shared/api";

class UsersService {
  public list(params: AdminUsersQuery = { page: 1, limit: 20 }) {
    return api.get<AdminUsersResponse>("admin/users", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        ...(params.search ? { search: params.search } : {}),
      },
    });
  }

  public profile(userId: string) {
    return api.get<UserProfile>(`users/profile/${userId}`);
  }

  public addPhone(userId: string, phone: string) {
    return api.post<{ success: boolean }>(`admin/users/${userId}/phones`, {
      phone,
    });
  }

  public deletePhone(userId: string, phone: string) {
    const encoded = encodeURIComponent(phone);
    return api.delete<{ success: boolean }>(
      `admin/users/${userId}/phones/${encoded}`
    );
  }

  public getComments(userId: string) {
    return api.get<import("@/types/admin-users.types").UserComment[]>(
      `admin/users/${userId}/comments`
    );
  }

  public addComment(userId: string, text: string) {
    return api.post<{ success: boolean }>(`admin/users/${userId}/comments`, {
      text,
    });
  }

  public updateUserProfile(
    userId: string,
    payload: {
      displayName?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      position?: string | null;
      isTwoFactorEnabled?: boolean;
    }
  ) {
    return api.put<{ success: boolean }>(`users/profile/${userId}`, payload);
  }

  public delete(userId: string) {
    return api.delete<void>(`admin/users/${userId}`);
  }
}

export const usersService = new UsersService();
