import styled from "styled-components";
import { THEME } from "../../../theme";

export const StyledIconButton = styled.button`
  all: unset;
  font-weight: ${THEME.FONT_WEIGHT.SEMI_BOLD};
  border-radius: 100%;
  height: 2.188rem;
  width: 2.188rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.5s;
  color: ${({ color }) => (color ? color : THEME.COLORS.PRIMARY)};
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#00000000"};
  &:hover {
    background-color: ${({ backgroundHover }) =>
      backgroundHover ? backgroundHover : "#00000010"};
  }
`;
