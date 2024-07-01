import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesReport } from "./PagesReport";
import { ContactWithoutAction } from "./ContactWithoutAction/ContactWithoutAction";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="relatorios" element={<PagesReport />} />
      <Route
        path="/relatorios/contatoSemAcao"
        element={<ContactWithoutAction />}
      />
    </Route>
  </SentryRoutes>
);
