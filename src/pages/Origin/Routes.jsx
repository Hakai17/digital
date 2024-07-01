import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesOrigin } from "./PagesOrigin";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="origem" element={<PagesOrigin />} />
    </Route>
  </SentryRoutes>
);
