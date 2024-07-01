import { Outlet, Navigate } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
