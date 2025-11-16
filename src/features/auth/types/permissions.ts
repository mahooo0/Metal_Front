export enum PermissionModule {
  Users = "users",
  Roles = "roles",
  Orders = "orders",
  Pricing = "pricing",
  Quote = "quote",
  Discount = "discount",
  Tasks = "tasks",
  Inventory = "inventory",
  Products = "products",
  Production = "production",
  Shipments = "shipments",
  Finance = "finance",
  Invoice = "invoice",
  Payment = "payment",
  Reports = "reports",
  Analytics = "analytics",
  Chat = "chat",
  Settings = "settings",
  Audit = "audit",
  Requests = "requests",
  Contractors = "contractors",
  Plans = "plans",
  Pipeline = "pipeline",
}

export enum PermissionAction {
  Read = "read",
  Create = "create",
  Update = "update",
  Delete = "delete",
  // Users
  ForcePasswordReset = "force-password-reset",
  // Roles
  Assign = "assign",
  // Quote / Discount / Requests
  Approve = "approve",
  Request = "request",
  // Tasks
  Start = "start",
  Complete = "complete",
  Pause = "pause",
  // Inventory
  Write = "write",
  Receive = "receive",
  Adjust = "adjust",
  Writeoff = "writeoff",
  Reserve = "reserve",
  // Production / Shipments / Plans / Pipeline
  Plan = "plan",
  Ship = "ship",
  // Pipeline specific
  Move = "move",
  Comment = "comment",
  Attach = "attach",
  // Finance / Invoice / Payment
  Record = "record",
}

export type PermissionString = `${PermissionModule}:${PermissionAction}`;

export type ModulePermissionsMap = Partial<
  Record<PermissionModule, Set<PermissionAction>>
>;

export function parsePermission(p: string): {
  mod: PermissionModule | null;
  action: PermissionAction | null;
} {
  const [m, a] = p.split(":");
  const mod = (Object.values(PermissionModule) as string[]).includes(m)
    ? (m as PermissionModule)
    : null;
  const action = (Object.values(PermissionAction) as string[]).includes(a)
    ? (a as PermissionAction)
    : null;
  return { mod, action };
}

export function groupPermissions(permissions: string[]): ModulePermissionsMap {
  const map: ModulePermissionsMap = {};
  for (const p of permissions) {
    const { mod, action } = parsePermission(p);
    if (!mod || !action) {
      continue;
    }
    if (!map[mod]) {
      map[mod] = new Set<PermissionAction>();
    }
    map[mod]!.add(action);
  }
  return map;
}
