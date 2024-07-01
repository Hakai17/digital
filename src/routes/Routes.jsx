import { BrowserRouter } from "react-router-dom";

import { Navbar } from "../components";
import {
  RoutesAttendance,
  RoutesAttendanceHistory,
  RoutesConsumer,
  RoutesHome,
  RoutesLogin,
  RoutesManifestation,
  RoutesManifestationComp,
  RoutesManifestationSubComp,
  RoutesProduct,
  RoutesReport,
  RoutesActions,
  RoutesContactType,
  RoutesOrigin,
  RoutesUrgency,
  RoutesIndicator1,
  RoutesIndicator2,
  RoutesIndicator3,
  RoutesIndicator4,
  RoutesIndicator5,
  RoutesGroup,
  RoutesUser,
  RoutesCountry,
} from "../pages";

export const Routes = () => {
  return (
    <BrowserRouter>
      <RoutesLogin />
      <Navbar />
      <RoutesAttendance />
      <RoutesHome />
      <RoutesReport />
      <RoutesConsumer />
      <RoutesAttendanceHistory />
      <RoutesProduct />
      <RoutesManifestation />
      <RoutesManifestationComp />
      <RoutesManifestationSubComp />
      <RoutesActions />
      <RoutesContactType />
      <RoutesOrigin />
      <RoutesUrgency />
      <RoutesIndicator1 />
      <RoutesIndicator2 />
      <RoutesIndicator3 />
      <RoutesIndicator4 />
      <RoutesIndicator5 />
      <RoutesGroup />
      <RoutesUser />
      <RoutesCountry />
    </BrowserRouter>
  );
};
