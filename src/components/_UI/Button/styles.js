import styled from "styled-components";
import { THEME } from "../../../theme";

export const StyledButton = styled.button`
  all: unset;
  cursor: ${({ disabled }) => (disabled ? "no-drop" : "pointer")};
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  padding: 0.234rem 0.5rem;
  border-radius: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s;
  color: ${({ textColor }) =>
    textColor ? textColor : THEME.COLORS.TEXT_WHITE};
  background-color: ${({ backgroundColor, disabled }) =>
    backgroundColor
      ? disabled
        ? THEME.COLORS.CAPTION_500
        : backgroundColor
      : THEME.COLORS.PRIMARY};
  background-color: ${({ backgroundColor, disabled }) => {
    if (backgroundColor && !disabled) return backgroundColor;
    else if (disabled) return THEME.COLORS.CAPTION_500;
    else return THEME.COLORS.PRIMARY;
  }};
  &:hover {
    background-color: ${({ backgroundHover, backgroundColor, disabled }) => {
      if (!backgroundColor && !disabled) {
        return THEME.COLORS.LIGHT_PRIMARY;
      } else if (backgroundHover) {
        return backgroundHover;
      }

      return "";
    }};
  }
`;
