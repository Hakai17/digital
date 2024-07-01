import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { SentryRoutes } from "../../routes";

import { PagesLogin } from "./PagesLogin";

export const Routes = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <SentryRoutes>
      <Route exact path="/login" element={<PagesLogin />} />
      {isAuthenticated ? (
        <Route exact path="/" element={<Navigate replace to="/home" />} />
      ) : (
        <Route exact path="/" element={<Navigate replace to="/login" />} />
      )}
    </SentryRoutes>
  );
};
