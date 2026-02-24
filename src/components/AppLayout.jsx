import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  collection,
  doc,
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

export default function AppLayout() {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logoVisible, setLogoVisible] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const setInitialBalanceForUser = useFinanceStore((state) => state.setInitialBalanceForUser);
  const setIncomesForUser = useFinanceStore((state) => state.setIncomesForUser);
  const currency = usePreferencesStore((state) => state.currency);
  const setCurrency = usePreferencesStore((state) => state.setCurrency);
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);

  useEffect(() => {
    const userRef = doc(db, "users", user.uid);
    const incomesRef = query(
      collection(db, "users", user.uid, "incomes"),
      orderBy("createdAt", "desc")
    );

    // Ensure core profile fields exist for admin/user listing screens.
    setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email || "",
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        updatedAt: serverTimestamp()
      },
      { merge: true }
    ).catch((err) => {
      console.error("Could not sync user profile", err);
    });

    const unsubUser = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      setInitialBalanceForUser(user.uid, Number(data.initialBalance || 0));
      if (data.currency) {
        setCurrency(data.currency);
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
  }, [setCurrency, setIncomesForUser, setInitialBalanceForUser, user.uid]);

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
          <NavLink to="/" end className="menu-link">
            Dashboard
          </NavLink>
          <NavLink to="/income" className="menu-link">
            Add Income
          </NavLink>
          <NavLink to="/system-config" className="menu-link">
            System Config
          </NavLink>
          <NavLink to="/users" className="menu-link">
            Users
          </NavLink>
        </nav>
        <div className="profile-wrap">
          <div className="profile">
            <img src={user.photoURL || ""} alt={user.displayName || "User"} />
            <div>
              <p>{user.displayName}</p>
              <small>{user.email}</small>
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
                onClick={() => {
                  setProfileMenuOpen(false);
                  signOut();
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
            <button className="icon-btn" aria-label="Toggle dark mode" onClick={toggleMode}>
              {mode === "dark" ? "☀️" : "🌙"}
            </button>
            <select
              className="header-currency-select"
              value={currency}
              onChange={(event) => handleCurrencyChange(event.target.value)}
            >
              {CURRENCY_OPTIONS.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code}
                </option>
              ))}
            </select>
            <button className="icon-btn" aria-label="Notifications">
              🔔
            </button>
          </div>
        </header>
        <Outlet />
        <footer className="app-footer">
          © {new Date().getFullYear()} BMS. All rights reserved. Developer: ALI
        </footer>
      </main>
    </div>
  );
}
