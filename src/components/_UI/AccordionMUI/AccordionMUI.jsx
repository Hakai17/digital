import { AccordionSummary, Typography } from "@mui/material";
import { CaretDown } from "@phosphor-icons/react";
import PropTypes from "prop-types";

import { Details, StyledAccordionMUI } from "./styles";

export const AccordionMUI = ({ title, children, ...props }) => {
  return (
    <StyledAccordionMUI
      disableGutters
      TransitionProps={{ unmountOnExit: true }}
      {...props}
    >
      <AccordionSummary expandIcon={<CaretDown />}>
        <Typography>{title}</Typography>
      </AccordionSummary>

      <Details>{children}</Details>
    </StyledAccordionMUI>
  );
};

AccordionMUI.propTypes = {
  title: PropTypes.string.isRequired,
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
};
