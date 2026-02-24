export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  MANAGE_INCOME: "manage_income",
  VIEW_SYSTEM_CONFIG: "view_system_config",
  VIEW_THEME: "view_theme",
  VIEW_PROFILE: "view_profile",
  VIEW_USERS: "view_users",
  MANAGE_USERS: "manage_users",
  MANAGE_ROLES: "manage_roles",
  VIEW_ADMIN_DASHBOARD: "view_admin_dashboard"
};

export const ROLE_PRESETS = {
  admin: [
    PERMISSIONS.VIEW_ADMIN_DASHBOARD,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ROLES,
    PERMISSIONS.VIEW_SYSTEM_CONFIG,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE
  ],
  user: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE
  ],
  viewer: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_PROFILE]
};

export const TIER_PRESETS = {
  free: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_PROFILE],
  basic: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE
  ],
  professional: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.VIEW_SYSTEM_CONFIG
  ],
  pro: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.VIEW_SYSTEM_CONFIG
  ]
};

export const TIER_OPTIONS = ["free", "basic", "professional", "pro"];

export function normalizePermissions(role, permissions, tier = "basic") {
  const base = ROLE_PRESETS[role] || ROLE_PRESETS.user;
  if (role === "admin") {
    if (Array.isArray(permissions) && permissions.length > 0) {
      return [...new Set([...base, ...permissions])];
    }
    return base;
  }
  const tierBase = TIER_PRESETS[tier] || TIER_PRESETS.basic;
  if (Array.isArray(permissions) && permissions.length > 0) {
    return [...new Set([...base, ...tierBase, ...permissions])];
  }
  return [...new Set([...base, ...tierBase])];
}
