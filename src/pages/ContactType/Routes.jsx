import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesContact } from "./PagesContact";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="contatos" element={<PagesContact />} />
    </Route>
  </SentryRoutes>
);
