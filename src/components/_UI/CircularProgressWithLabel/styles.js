import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Box)({
  position: "relative",
  display: "inline-flex",
});

export const TextPercentage = styled(Box)({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
