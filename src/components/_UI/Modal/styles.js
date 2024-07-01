import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled from "styled-components";

import { THEME } from "../../../theme";

export const DialogContent = styled(DialogPrimitive.Content)`
  background-color: ${THEME.COLORS.BACKGROUND_100};
  border-radius: 0.375rem;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 28.125rem;
  max-height: 85vh;
  z-index: 1205;
  overflow-y: auto;

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &:focus {
    outline: none;
  }
`;

export const DialogOverlay = styled(DialogPrimitive.Overlay)`
  background-color: ${THEME.COLORS.OVERLAY};
  position: fixed;
  inset: 0;
  z-index: 1203;

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export const DialogTitle = styled(DialogPrimitive.Title)`
  font-weight: ${THEME.FONT_WEIGHT.BOLD};
  color: ${THEME.COLORS.TEXT_WHITE};
  font-size: ${THEME.FONT_SIZE.LG};
`;

export const DialogDescription = styled(DialogPrimitive.Description)`
  margin: 10px 0 20px;
  color: ${THEME.COLORS.CAPTION_500};
  font-size: ${THEME.FONT_SIZE.MD};
  line-height: 1.5;
`;

export const DialogClose = styled(DialogPrimitive.Close)`
  cursor: pointer;
`;

export const StyledNavbarModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2388e5;
  padding: 1rem;
  min-height: 4rem;
`;
