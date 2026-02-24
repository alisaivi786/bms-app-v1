import { create } from "zustand";

export const useAccessStore = create((set) => ({
  role: "user",
  tier: "basic",
  permissions: [],
  ready: false,
  setAccess: ({ role, tier, permissions }) =>
    set({
      role: role || "user",
      tier: tier || "basic",
      permissions: Array.isArray(permissions) ? permissions : [],
      ready: true
    }),
  resetAccess: () =>
    set({
      role: "user",
      tier: "basic",
      permissions: [],
      ready: false
    })
}));
