import { AUTH_URLS } from "@/features/auth/constants";
import {
  type LoginSchemaType,
  type RegisterSchemaType,
} from "@/features/auth/schemas";
import { User } from "@/features/auth/types";

import { api } from "@/shared/api";

class AuthService {
  public async register(body: RegisterSchemaType, recaptcha: string) {
    const headers = recaptcha ? { recaptcha } : undefined;

    const response = await api.post<User>(AUTH_URLS.register, body, {
      headers,
    });

    return response;
  }

  public async login(body: LoginSchemaType, recaptcha: string) {
    const headers = recaptcha ? { recaptcha } : undefined;

    const response = await api.post<User>(AUTH_URLS.login, body, { headers });

    return response;
  }

  public async oauthByProvider(provider: "google") {
    const response = await api.get<{ url: string }>(
      `${AUTH_URLS.oauth}/${provider}`
    );

    return response;
  }

  public async logout() {
    const response = await api.post(AUTH_URLS.logout);

    return response;
  }
}

export const authService = new AuthService();
