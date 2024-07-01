import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesIndicator2 } from "./PagesIndicator2";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="marca" element={<PagesIndicator2 />} />
    </Route>
  </SentryRoutes>
);
