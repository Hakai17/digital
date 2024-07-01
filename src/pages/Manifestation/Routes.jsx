import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesManifestation } from "./PagesManifestation";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="manifestacao" element={<PagesManifestation />} />
    </Route>
  </SentryRoutes>
);
