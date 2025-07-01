export enum UserRole {
  Regular = "regular",
  Admin = "admin",
}

export enum AuthMethod {
  Credentials = "credentials",
  Google = "google",
}

export interface Account {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  provider: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  userId: string;
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  displayName: string;
  picture: string;
  role: UserRole;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  method: AuthMethod;
  accounts: Account[];
}
