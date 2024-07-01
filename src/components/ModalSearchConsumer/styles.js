import { Collapse, DialogTitle, Grid, Paper } from "@mui/material";
import { styled } from "@mui/system";

export const StyledPaper = styled(Paper)({
  minHeight: "25rem",
});

export const Content = styled(Grid)({
  justifyContent: "space-around",
  marginTop: "0.3rem",
  overflow: "hidden",
});

export const Header = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
});

export const StyledCollapse = styled(Collapse)({
  flexShrink: 0,
});
