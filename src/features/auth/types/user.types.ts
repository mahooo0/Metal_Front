export enum UserRole {
  Regular = "regular",
  Admin = "admin",
}

export enum UserStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Suspended = "SUSPENDED",
}

export enum AuthMethod {
  Credentials = "CREDENTIALS",
  Google = "GOOGLE",
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions?: string[];
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
  email: string;
  phone: string | null;
  password: string;
  firstName: string;
  lastName: string;
  position: string | null;
  displayName: string;
  picture: string | null;
  status: UserStatus;
  requirePasswordChange: boolean;
  passwordChangedAt: string | null;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  method: AuthMethod;
  permissionsOverride: string[];
  lastLoginAt: string | null;
  lastIp: string | null;
  lastUa: string | null;
  createdAt: string;
  updatedAt: string;
  accounts: Account[];
  roles: Role[];
}
