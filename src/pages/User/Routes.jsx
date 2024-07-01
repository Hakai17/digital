import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesUser } from "./PagesUser";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="usuarios" element={<PagesUser />} />
    </Route>
  </SentryRoutes>
);
