import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";
import { CURRENCY_OPTIONS, usePreferencesStore } from "../state/preferencesStore";
import { useThemeStore } from "../state/themeStore";
import { buildDefaultLookupItems } from "../constants/lookupTypes";
import CustomSelect from "./CustomSelect";
import { isAdminEmail } from "../constants/admin";
import { normalizePermissions, PERMISSIONS } from "../constants/access";
import { useAccessStore } from "../state/accessStore";

export default function AppLayout() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoVisible, setLogoVisible] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(isAdminEmail(user?.email));
  const setInitialBalanceForUser = useFinanceStore((state) => state.setInitialBalanceForUser);
  const setIncomesForUser = useFinanceStore((state) => state.setIncomesForUser);
  const currency = usePreferencesStore((state) => state.currency);
  const setCurrency = usePreferencesStore((state) => state.setCurrency);
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const permissions = useAccessStore((state) => state.permissions);
  const tier = useAccessStore((state) => state.tier);
  const setAccess = useAccessStore((state) => state.setAccess);
  const resetAccess = useAccessStore((state) => state.resetAccess);
  const can = (permission) => permissions.includes(permission);
  const profileName =
    user.displayName ||
    (user.email ? user.email.split("@")[0] : "User");
  const profileEmail = user.email || "No email";
  const profileAvatar = user.photoURL || "/default-avatar.svg";
  const dataActive = location.pathname.startsWith("/income");
  const userMgmtActive = location.pathname.startsWith("/roles") || location.pathname.startsWith("/users");
  const settingActive = location.pathname.startsWith("/system-config");

  useEffect(() => {
    if (dataActive) {
      setDataOpen(true);
      setUserMgmtOpen(false);
      setSettingOpen(false);
    } else if (userMgmtActive) {
      setDataOpen(false);
      setUserMgmtOpen(true);
      setSettingOpen(false);
    } else if (settingActive) {
      setDataOpen(false);
      setSettingOpen(true);
      setUserMgmtOpen(false);
    } else {
      setDataOpen(false);
      setUserMgmtOpen(false);
      setSettingOpen(false);
    }
  }, [dataActive, settingActive, userMgmtActive]);

  useEffect(() => {
    const userRef = doc(db, "users", user.uid);
    const incomesRef = query(
      collection(db, "users", user.uid, "incomes"),
      orderBy("createdAt", "desc")
    );

    const bootstrapUserProfile = async () => {
      try {
        const snap = await getDoc(userRef);
        const data = snap.exists() ? snap.data() : {};
        const adminUser = isAdminEmail(user.email);
        const hasLookupItems = Array.isArray(data.lookupItems) && data.lookupItems.length > 0;
        const hasLegacyLookups =
          Array.isArray(data.incomeSourceLookups) && data.incomeSourceLookups.length > 0;

        await setDoc(
          userRef,
          {
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            role: data.role || (isAdminEmail(user.email) ? "admin" : "user"),
            tier: data.tier || (isAdminEmail(user.email) ? "pro" : "basic"),
            isAdmin: data.isAdmin ?? isAdminEmail(user.email),
            currency: adminUser ? null : data.currency || null,
            initialBalance: adminUser ? null : data.initialBalance ?? null,
            permissions: normalizePermissions(
              data.role || (isAdminEmail(user.email) ? "admin" : "user"),
              data.permissions,
              data.tier || (isAdminEmail(user.email) ? "pro" : "basic")
            ),
            authProviders: (user.providerData || [])
              .map((provider) => provider.providerId)
              .filter(Boolean),
            lookupItems: adminUser
              ? data.lookupItems || []
              : hasLookupItems || hasLegacyLookups
              ? data.lookupItems || []
              : buildDefaultLookupItems(),
            updatedAt: serverTimestamp()
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Could not bootstrap user profile", err);
      }
    };

    bootstrapUserProfile();

    const unsubUser = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      setIsAdmin(Boolean(data.isAdmin) || isAdminEmail(user.email));
      setAccess({
        role: data.role || (isAdminEmail(user.email) ? "admin" : "user"),
        tier: data.tier || (isAdminEmail(user.email) ? "pro" : "basic"),
        permissions: normalizePermissions(
          data.role || (isAdminEmail(user.email) ? "admin" : "user"),
          data.permissions,
          data.tier || (isAdminEmail(user.email) ? "pro" : "basic")
        )
      });
      setInitialBalanceForUser(user.uid, Number(data.initialBalance || 0));
      if (data.currency) {
        setCurrency(data.currency);
      }
      if (data.themeMode) {
        setMode(data.themeMode);
      } else {
        setMode("light");
      }
      if (data.themeColors && typeof data.themeColors === "object") {
        setTheme(data.themeColors);
      }
    });

    const unsubIncomes = onSnapshot(incomesRef, (snapshot) => {
      setIncomesForUser(
        user.uid,
        snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
      );
    });

    return () => {
      unsubUser();
      unsubIncomes();
    };
  }, [setAccess, setCurrency, setIncomesForUser, setInitialBalanceForUser, setMode, setTheme, user.email, user.uid]);

  const handleCurrencyChange = async (nextCurrency) => {
    setCurrency(nextCurrency);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          currency: nextCurrency,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Could not save currency preference", err);
    }
  };

  const handleThemeModeToggle = async () => {
    const nextMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          themeMode: nextMode,
          themeColors: theme,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );
    } catch (err) {
      console.error("Could not save theme mode", err);
    }
  };

  return (
    <div className={`layout ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
      <aside className={`sidebar ${sidebarOpen ? "show" : "hide"}`}>
        <Link className="brand brand-wrap" to="/">
          {logoVisible ? (
            <img
              className="brand-logo"
              src="/logo.png"
              alt="BMS"
              onError={() => setLogoVisible(false)}
            />
          ) : null}
          <span className="brand-text">BMS</span>
        </Link>
        <nav className="menu">
          {can(PERMISSIONS.VIEW_DASHBOARD) ? (
            <NavLink to="/dashboard-home" className="menu-link">
              Dashboard
            </NavLink>
          ) : null}
          {can(PERMISSIONS.VIEW_ADMIN_DASHBOARD) ? (
            <NavLink to="/admin" className="menu-link">
              Admin Dashboard
            </NavLink>
          ) : null}
          {can(PERMISSIONS.MANAGE_INCOME) ? (
            <div className="menu-group">
              <button
                className={`menu-group-toggle ${dataActive ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setDataOpen((v) => !v);
                  setUserMgmtOpen(false);
                  setSettingOpen(false);
                }}
              >
                <span>Data</span>
                <span>{dataOpen ? "▾" : "▸"}</span>
              </button>
              {dataOpen ? (
                <NavLink to="/income" className="menu-sublink">
                  Income
                </NavLink>
              ) : null}
            </div>
          ) : null}
          {(can(PERMISSIONS.MANAGE_ROLES) || (isAdmin && can(PERMISSIONS.VIEW_USERS))) ? (
            <div className="menu-group">
              <button
                className={`menu-group-toggle ${userMgmtActive ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setUserMgmtOpen((v) => !v);
                  setSettingOpen(false);
                }}
              >
                <span>User Management</span>
                <span>{userMgmtOpen ? "▾" : "▸"}</span>
              </button>
              {userMgmtOpen ? (
                <>
                  {can(PERMISSIONS.MANAGE_ROLES) ? (
                    <NavLink to="/roles" className="menu-sublink">
                      Role
                    </NavLink>
                  ) : null}
                  {isAdmin && can(PERMISSIONS.VIEW_USERS) ? (
                    <NavLink to="/users" className="menu-sublink">
                      User
                    </NavLink>
                  ) : null}
                </>
              ) : null}
            </div>
          ) : null}
          {can(PERMISSIONS.VIEW_SYSTEM_CONFIG) ? (
            <div className="menu-group">
              <button
                className={`menu-group-toggle ${settingActive ? "active" : ""}`}
                type="button"
                onClick={() => {
                  setSettingOpen((v) => !v);
                  setUserMgmtOpen(false);
                }}
              >
                <span>Setting</span>
                <span>{settingOpen ? "▾" : "▸"}</span>
              </button>
              {settingOpen ? (
                <NavLink to="/system-config" className="menu-sublink">
                  System Configuration
                </NavLink>
              ) : null}
            </div>
          ) : null}
        </nav>
        <div className="profile-wrap">
          <div className="profile">
            <img
              src={profileAvatar}
              alt={profileName}
              onError={(event) => {
                event.currentTarget.src = "/default-avatar.svg";
              }}
            />
            <div>
              <p>{profileName}</p>
              <small>{profileEmail}</small>
            </div>
            <button
              className="profile-menu-btn"
              aria-label="Profile actions"
              onClick={() => setProfileMenuOpen((v) => !v)}
            >
              ⋮
            </button>
          </div>
          {profileMenuOpen ? (
            <div className="profile-menu">
              <NavLink
                to="/theme"
                className="profile-menu-link"
                onClick={() => setProfileMenuOpen(false)}
              >
                Theme Settings
              </NavLink>
              <NavLink
                to="/profile"
                className="profile-menu-link"
                onClick={() => setProfileMenuOpen(false)}
              >
                Profile Settings
              </NavLink>
              <button
                className="profile-menu-link profile-menu-btn-danger"
                onClick={async () => {
                  setProfileMenuOpen(false);
                  resetAccess();
                  await signOut();
                }}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </aside>
      <main className="content">
        <header className="top-header">
          <button
            className="icon-btn"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            ☰
          </button>
          <div className="header-actions">
            <span className="tier-pill">{(isAdmin ? "admin" : tier).toUpperCase()}</span>
            <button className="icon-btn" aria-label="Toggle dark mode" onClick={handleThemeModeToggle}>
              {mode === "dark" ? "☀️" : "🌙"}
            </button>
            {!isAdmin ? (
              <CustomSelect
                className="header-currency-select"
                value={currency}
                onChange={handleCurrencyChange}
                options={CURRENCY_OPTIONS.map((item) => ({
                  value: item.code,
                  label: item.code
                }))}
              />
            ) : null}
          </div>
        </header>
        <div className="content-body">
          <Outlet />
        </div>
        <footer className="app-footer">
          © {new Date().getFullYear()} BMS. All rights reserved. Developer: ALI
        </footer>
      </main>
    </div>
  );
}
