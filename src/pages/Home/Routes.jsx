import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { Home } from "./Home";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="home" element={<Home />} />
    </Route>
  </SentryRoutes>
);
