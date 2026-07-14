import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, checking } = useAdminAuth();

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <p className="text-secondary-light">Checking session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}