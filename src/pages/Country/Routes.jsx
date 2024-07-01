import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesCountry } from "./PagesCountry";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="pais" element={<PagesCountry />} />
    </Route>
  </SentryRoutes>
);
