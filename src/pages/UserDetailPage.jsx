import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import AlertMessage from "../components/AlertMessage";

export default function UserDetailPage() {
  const { userId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "users", userId));
        if (!snap.exists()) {
          setError("User not found.");
          return;
        }
        setData({ id: snap.id, ...snap.data() });
      } catch (err) {
        setError("Could not load user details.");
      }
    };
    load();
  }, [userId]);

  if (error) {
    return (
      <section>
        <h1>User Details</h1>
        <AlertMessage type="error" message={error} />
      </section>
    );
  }

  if (!data) {
    return (
      <section>
        <h1>User Details</h1>
        <p className="muted">Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1>User Details</h1>
      <div className="table-card">
        <table>
          <tbody>
            <tr><th>UID</th><td>{data.uid || data.id}</td></tr>
            <tr><th>Name</th><td>{data.displayName || "-"}</td></tr>
            <tr><th>Email</th><td>{data.email || "-"}</td></tr>
            <tr><th>Role</th><td>{data.role || (data.isAdmin ? "admin" : "user")}</td></tr>
            <tr><th>Currency</th><td>{data.currency || "USD"}</td></tr>
            <tr><th>Initial Balance</th><td>{data.initialBalance ?? 0}</td></tr>
            <tr><th>Providers</th><td>{(data.authProviders || []).join(", ") || "-"}</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
