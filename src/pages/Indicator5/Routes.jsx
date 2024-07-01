import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesIndicator5 } from "./PagesIndicator5";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="indicador5" element={<PagesIndicator5 />} />
    </Route>
  </SentryRoutes>
);
