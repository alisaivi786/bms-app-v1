import { Navigate } from "react-router-dom";
import { useAccessStore } from "../state/accessStore";

export default function PermissionRoute({ permission, children }) {
  const permissions = useAccessStore((state) => state.permissions);
  const ready = useAccessStore((state) => state.ready);
  if (!ready) {
    return <div className="page-loader">Loading access...</div>;
  }
  if (!permissions.includes(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
