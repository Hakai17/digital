import styled from "styled-components";
import { THEME } from "../../theme";
import { IconButton } from "../_UI/IconButton/IconButton";
import { Button } from "../_UI/Button/Button";
import { DialogContent, Paper } from "@mui/material";

export const StyledPaper = styled(Paper)({
  position: "absolute !important",
  top: "58px !important",
  right: "64px !important",
  width: "600px",
  height: "31rem",
  margin: "0px !important",
});

export const ContainerModalContent = styled(DialogContent)`
  max-width: none;
  background-color: ${THEME.COLORS.BLUE_100};
  width: 100%;
  height: 100%;
  padding: 0px !important;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;

export const StyledArrow = styled.div`
  background-color: ${THEME.COLORS.BLUE_100};
`;

export const TriggerButton = styled(IconButton)`
  padding: 0.4rem;
`;

export const StyledButton = styled(Button)`
  width: 100px;
`;

export const Message = styled.span`
  font-size: ${THEME.FONT_SIZE.MD};
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  color: ${THEME.COLORS.CAPTION_500};
  margin: 25px;
  text-align: center;
`;
