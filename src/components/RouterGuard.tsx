
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RouterGuardProps {
  children: React.ReactNode;
  allowedRoles?: Array<"student" | "placement" | "alumni" | null>;
  requireAuth?: boolean;
}

export const RouterGuard: React.FC<RouterGuardProps> = ({
  children,
  allowedRoles = [],
  requireAuth = true,
}) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to unauthorized page if user doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  if (isAuthenticated && location.pathname === "/login") {
    // Redirect to dashboard if user is already logged in and trying to access login page
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
