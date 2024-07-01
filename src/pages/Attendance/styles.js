import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const Main = styled("main")({
  flex: 4.5,
});

export const FormContainer = styled(Grid)({
  margin: 0,
});

export const Section = styled(Grid)({
  paddingTop: "0.5rem",
  paddingRight: "1.6rem",
  paddingLeft: "1.5rem",
  width: "100%",
});

export const Container = styled(Grid)({
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
});
