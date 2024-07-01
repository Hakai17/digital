import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesActions } from "./PagesActions";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="acoes" element={<PagesActions />} />
    </Route>
  </SentryRoutes>
);
