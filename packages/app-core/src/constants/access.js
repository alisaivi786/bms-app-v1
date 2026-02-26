export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  MANAGE_INCOME: "manage_income",
  MANAGE_BUDGET: "manage_budget",
  MANAGE_EMI: "manage_emi",
  VIEW_SYSTEM_CONFIG: "view_system_config",
  VIEW_THEME: "view_theme",
  VIEW_PROFILE: "view_profile",
  VIEW_INCOME_REPORT: "view_income_report",
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
    PERMISSIONS.VIEW_INCOME_REPORT,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.MANAGE_BUDGET,
    PERMISSIONS.MANAGE_EMI,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE
  ],
  viewer: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_PROFILE]
};

export const TIER_PRESETS = {
  free: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_PROFILE],
  basic: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_INCOME_REPORT,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.MANAGE_BUDGET,
    PERMISSIONS.MANAGE_EMI,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE
  ],
  professional: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_INCOME_REPORT,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.MANAGE_BUDGET,
    PERMISSIONS.MANAGE_EMI,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.VIEW_SYSTEM_CONFIG
  ],
  pro: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_INCOME_REPORT,
    PERMISSIONS.MANAGE_INCOME,
    PERMISSIONS.MANAGE_BUDGET,
    PERMISSIONS.MANAGE_EMI,
    PERMISSIONS.VIEW_THEME,
    PERMISSIONS.VIEW_PROFILE,
    PERMISSIONS.VIEW_SYSTEM_CONFIG
  ]
};

export const TIER_OPTIONS = ["free", "basic", "professional", "pro"];

export function defaultPermissionsFor(role, tier = "basic") {
  const base = ROLE_PRESETS[role] || ROLE_PRESETS.user;
  if (role === "admin") {
    return [...new Set(base)];
  }
  const tierBase = TIER_PRESETS[tier] || TIER_PRESETS.basic;
  return [...new Set([...base, ...tierBase])];
}

export function normalizePermissions(role, permissions, tier = "basic") {
  if (role === "admin") {
    if (Array.isArray(permissions) && permissions.length > 0) {
      return [...new Set([...ROLE_PRESETS.admin, ...permissions])];
    }
    return [...new Set(ROLE_PRESETS.admin)];
  }

  // For non-admin users, explicit permissions (including empty array) must be respected
  // so unchecked permissions are truly removed.
  if (Array.isArray(permissions)) {
    return [...new Set(permissions)];
  }

  return defaultPermissionsFor(role, tier);
}
