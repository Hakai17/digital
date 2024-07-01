import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesIndicator1 } from "./PagesIndicator1";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="indicador1" element={<PagesIndicator1 />} />
    </Route>
  </SentryRoutes>
);
