import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesManifestationComp } from "./PagesManifestationComp";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route
        path="complementoManifestacao"
        element={<PagesManifestationComp />}
      />
    </Route>
  </SentryRoutes>
);
