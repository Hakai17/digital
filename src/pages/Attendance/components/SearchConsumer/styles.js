import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Paper)({
  padding: "1rem",
});

export const Content = styled(Grid)({
  alignItems: "baseline",
  justifyContent: "space-between",
});

export const ContentToAlign = styled(Grid)({
  alignItems: "center",
});
