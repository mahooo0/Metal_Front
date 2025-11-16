export interface AdminUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface AdminRole {
  id: string;
  name: string;
  system: boolean;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserRole {
  userId: string;
  roleId: string;
  assignedAt: string;
  role: AdminRole;
}

export interface AdminUserComment {
  id: string;
  userId: string;
  text: string;
  createdById: string;
  createdAt: string;
  createdBy: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    displayName: string;
  };
}

export interface AdminUserItem {
  id: string;
  email: string;
  phone: string | null;
  password: string;
  firstName: string;
  lastName: string;
  position: string | null;
  displayName: string;
  picture: string | null;
  status: string;
  requirePasswordChange: boolean;
  passwordChangedAt: string | null;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  method: string;
  permissionsOverride: string[];
  lastLoginAt: string | null;
  lastIp: string | null;
  lastUa: string | null;
  extraPhones: string[];
  createdAt: string;
  updatedAt: string;
  roles: AdminUserRole[];
  comments: AdminUserComment[];
}

export interface AdminUsersResponse {
  users: AdminUserItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UserProfile extends Omit<AdminUserItem, "comments"> {
  accounts: any[];
}

export interface UserComment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  createdBy?: {
    id: string;
    displayName?: string;
    email?: string;
  };
}
