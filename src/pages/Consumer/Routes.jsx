import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesConsumer } from "./PagesConsumer";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="consumidor" element={<PagesConsumer />} />
    </Route>
  </SentryRoutes>
);
