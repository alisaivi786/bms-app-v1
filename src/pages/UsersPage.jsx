import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const usersQuery = query(collection(db, "users"), orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(
      usersQuery,
      (snapshot) => {
        setUsers(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
        setError("");
      },
      (err) => {
        setError(err?.message || "Could not load users list.");
      }
    );
    return unsubscribe;
  }, []);

  return (
    <section>
      <h1>Users</h1>
      <p className="muted">All user profiles available in Firestore.</p>

      {error ? <p className="error">{error}</p> : null}

      <div className="table-card">
        <h3>User Details</h3>
        {users.length === 0 ? (
          <p className="muted">No user records found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>UID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Currency</th>
                <th>Initial Balance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.uid || user.id}</td>
                  <td>{user.displayName || "-"}</td>
                  <td>{user.email || "-"}</td>
                  <td>{user.currency || "USD"}</td>
                  <td>{user.initialBalance ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
