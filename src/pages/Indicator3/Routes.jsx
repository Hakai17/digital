import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesIndicator3 } from "./PagesIndicator3";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="categoria" element={<PagesIndicator3 />} />
    </Route>
  </SentryRoutes>
);
