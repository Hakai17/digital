import styled from "styled-components";
import { THEME } from "../../../theme";

export const Input = styled.input`
  width: ${({ fullWidth }) => fullWidth && "100%"};
  min-width: 20rem;
  height: 2.5rem;
  border-radius: 1rem;
  padding: 0 1rem;
  border: 1px solid #5e5e5e;

  &:focus-visible {
    border: 1px solid ${THEME.COLORS.PRIMARY};
    outline: 1px solid ${THEME.COLORS.PRIMARY};
  }
`;
