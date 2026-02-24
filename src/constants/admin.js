export const ADMIN_EMAIL = "admin@bms.com";

export function isAdminEmail(email) {
  return String(email || "").toLowerCase() === ADMIN_EMAIL.toLowerCase();
}
