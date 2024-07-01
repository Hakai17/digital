import { Box, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";

import { AccordionMUI } from "../../../../../components";

export const Container = styled(Grid)({
  alignItems: "center",
});

export const ManifestationSection = styled(Grid)({
  justifyContent: "space-between",
});

export const ExtraDetailsSection = styled(Box)({
  marginTop: "1rem",
  width: "100%",
});

export const StyledAccordionMUI = styled(AccordionMUI)({
  backgroundColor: "#97ADEC",

  "&:first-child": {
    borderRadius: "10px 10px 0 0 !important",
    "&.Mui-expanded:first-of-type": { borderRadius: "10px" },
  },

  "&:last-child": {
    borderRadius: "0 0 10px 10px !important",
  },
});

export const Timer = styled(Grid)({
  alignItems: "center",
  flex: 2,
});

export const TimerText = styled(Typography)({
  border: `1px solid ${grey[400]}`,
  borderRadius: 4,
  padding: 4,
  whiteSpace: "nowrap",
});

export const ContentToAlign = styled(Grid)({
  alignItems: "baseline",
});
