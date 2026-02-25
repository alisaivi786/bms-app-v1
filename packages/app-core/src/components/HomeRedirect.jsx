import { Navigate } from "react-router-dom";
import { PERMISSIONS } from "../constants/access";
import { useAccessStore } from "../state/accessStore";

export default function HomeRedirect() {
  const permissions = useAccessStore((state) => state.permissions);
  const ready = useAccessStore((state) => state.ready);
  if (!ready) {
    return <div className="page-loader">Loading access...</div>;
  }
  if (permissions.includes(PERMISSIONS.VIEW_DASHBOARD)) {
    return <Navigate to="/dashboard-home" replace />;
  }
  if (permissions.includes(PERMISSIONS.VIEW_ADMIN_DASHBOARD)) {
    return <Navigate to="/admin" replace />;
  }
  return <Navigate to="/unauthorized" replace />;
}
