import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesIndicator4 } from "./PagesIndicator4";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="embalagem" element={<PagesIndicator4 />} />
    </Route>
  </SentryRoutes>
);
