import { Route } from "react-router-dom";

import { PrivateRoute, SentryRoutes } from "../../routes";
import { PagesAttendance } from "./PagesAttendance";

export const Routes = () => (
  <SentryRoutes>
    <Route element={<PrivateRoute />}>
      <Route path="atendimento" element={<PagesAttendance />}>
        <Route path=":contactId" element={<PagesAttendance />} />
      </Route>
    </Route>
  </SentryRoutes>
);
