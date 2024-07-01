import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesManifestationSubComp } from "./PagesManifestationSubComp";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route
        path="subComplementoManifestacao"
        element={<PagesManifestationSubComp />}
      />
    </Route>
  </SentryRoutes>
);
