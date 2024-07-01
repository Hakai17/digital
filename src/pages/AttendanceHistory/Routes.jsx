import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesAttendanceHistory } from "./PagesAttendanceHistory";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="historicoAtendimento" element={<PagesAttendanceHistory />} />
    </Route>
  </SentryRoutes>
);
