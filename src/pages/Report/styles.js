import styled from "styled-components";
import { THEME } from "../../theme";

export const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Fields = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: ${THEME.FONT_SIZE.LG};
  font-weight: ${THEME.FONT_WEIGHT.BOLD};
`;
