import { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../state/AuthContext";
import { useFinanceStore } from "../state/financeStore";

export default function AppLayout() {
  const { user, signOut } = useAuth();
  const setInitialBalanceForUser = useFinanceStore((state) => state.setInitialBalanceForUser);
  const setIncomesForUser = useFinanceStore((state) => state.setIncomesForUser);

  useEffect(() => {
    const userRef = doc(db, "users", user.uid);
    const incomesRef = query(
      collection(db, "users", user.uid, "incomes"),
      orderBy("createdAt", "desc")
    );

    const unsubUser = onSnapshot(userRef, (snapshot) => {
      const data = snapshot.exists() ? snapshot.data() : {};
      setInitialBalanceForUser(user.uid, Number(data.initialBalance || 0));
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
  }, [setIncomesForUser, setInitialBalanceForUser, user.uid]);

  return (
    <div className="layout">
      <aside className="sidebar">
        <Link className="brand" to="/">
          BMS
        </Link>
        <nav className="menu">
          <NavLink to="/" end className="menu-link">
            Dashboard
          </NavLink>
          <NavLink to="/income" className="menu-link">
            Add Income
          </NavLink>
        </nav>
        <div className="profile">
          <img src={user.photoURL || ""} alt={user.displayName || "User"} />
          <div>
            <p>{user.displayName}</p>
            <small>{user.email}</small>
          </div>
        </div>
        <button className="btn btn-outline" onClick={signOut}>
          Logout
        </button>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
