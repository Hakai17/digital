import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesUrgency } from "./PagesUrgency";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="urgencia" element={<PagesUrgency />} />
    </Route>
  </SentryRoutes>
);
