import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesProduct } from "./PagesProduct";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="produtos" element={<PagesProduct />} />
    </Route>
  </SentryRoutes>
);
