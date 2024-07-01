import { Grid } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Grid)({
  alignItems: "center",
  marginTop: "2rem",
  backgroundColor: "#D0DCEE",
  borderRadius: "10px",
  padding: "1rem",
});

export const Section = styled(Grid)({
  width: "100%",
  marginTop: "1rem",
});

export const IndicatorsContainer = styled(Grid)({
  justifyContent: "space-between",
});
