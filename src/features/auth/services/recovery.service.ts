import { RecoverySchemaType } from "@/features/auth/schemas";
import { User } from "@/features/auth/types";

import { api } from "@/shared/api";

class RecoveryService {
  public async reset(email: RecoverySchemaType) {
    const response = await api.post<User>("auth/recovery", email);

    return response;
  }
}

export const recoveryService = new RecoveryService();
