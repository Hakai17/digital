import { forwardRef } from "react";
import {
  StyledAccordion,
  StyledAccordionItem,
  StyledChevron,
  StyledContent,
  StyledHeader,
  StyledTrigger,
} from "./styles";

const Trigger = forwardRef(({ children, ...props }, forwardRef) => (
  <StyledTrigger {...props} ref={forwardRef}>
    {children}
    <StyledChevron />
  </StyledTrigger>
));

Trigger.displayName = "Trigger";

export const Accordion = StyledAccordion;
export const AccordionItem = StyledAccordionItem;
export const AccordionHeader = StyledHeader;
export const AccordionTrigger = Trigger;
export const AccordionContent = StyledContent;
