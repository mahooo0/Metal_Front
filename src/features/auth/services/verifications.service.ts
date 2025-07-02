import { api } from "@/shared/api";

class VerificationsService {
  public async newVerification(token: string | null) {
    const response = await api.post("auth/email-confirmation", { token });

    return response;
  }
}

export const verificationsService = new VerificationsService();
