import { CaretDown } from "@phosphor-icons/react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import styled from "styled-components";
import { THEME } from "../../../theme";

export const StyledAccordion = styled(AccordionPrimitive.Root)`
  width: 300;
`;

export const StyledAccordionItem = styled(AccordionPrimitive.Item)`
  overflow: hidden;
  margin-top: 1;

  &:first-child {
    margin-top: 0;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  &:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  &:focus-within {
    position: relative;
    z-index: 1;
  }
`;

export const StyledHeader = styled(AccordionPrimitive.Header)`
  all: unset;
  display: flex;
  cursor: pointer;
`;

export const StyledTrigger = styled(AccordionPrimitive.Trigger)`
  all: unset;
  font-family: inherit;
  background-color: transparent;
  padding: 0 20px;
  height: 3rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${THEME.FONT_SIZE.MD};
  line-height: 1;
  &[data-state="closed"] {
    background-color: ${THEME.COLORS.PRIMARY};
    transition:
      width,
      height,
      900ms ease;
  }
  &[data-state="open"] {
    background-color: ${THEME.COLORS.PRIMARY};
    transition:
      width,
      height,
      300ms ease;
  }
  &[data-disabled] {
    background-color: ${THEME.COLORS.CAPTION_400};
    &:hover {
      background-color: ${THEME.COLORS.CAPTION_400};
    }
  }
  &:hover {
    background-color: ${THEME.COLORS.LIGHT_PRIMARY};
  }
  color: white;
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
`;

export const StyledContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 15;
  background-color: ${THEME.COLORS.BACKGROUND_200};
  padding: 1rem;

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    transition:
      width,
      height,
      300ms ease;
    &[data-state="open"] {
      animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
    &[data-state="closed"] {
      animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
    }
  }
`;

export const StyledChevron = styled(CaretDown)`
  @media (prefers-reduced-motion: no-preference) {
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
    [data-state="open"] & {
      transform: rotate(-180deg);
    }
  }
`;
