import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesGroup } from "./PagesGroup";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="grupo" element={<PagesGroup />} />
    </Route>
  </SentryRoutes>
);
