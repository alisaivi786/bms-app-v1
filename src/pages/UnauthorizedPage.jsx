import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function UnauthorizedPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
    } finally {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <h1>Access Denied</h1>
        <p>You do not have permission to access this screen.</p>
        <div className="auth-mode-toggle">
          <Link className="btn" to="/">
            Go Home
          </Link>
          <button className="btn btn-outline" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
