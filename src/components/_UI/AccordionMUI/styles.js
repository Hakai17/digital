import { Accordion, AccordionDetails } from "@mui/material";
import { styled } from "@mui/system";

export const StyledAccordionMUI = styled(Accordion)({
  "&not(:last-child)": {
    borderBottom: 0,
  },
});

export const Details = styled(AccordionDetails)({
  backgroundColor: "#FFFFFF",
});
