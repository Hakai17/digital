import styled from "styled-components";
import { Accordion } from "../../components";
import { THEME } from "../../theme";

export const Flex = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: column;
  padding: 2rem;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 60rem;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 1rem;
  padding: 1rem;
`;

export const StyledAccordion = styled(Accordion)`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const RadioContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
`;

export const Title = styled.h1`
  font-size: ${THEME.FONT_SIZE.LG};
  font-weight: ${THEME.FONT_WEIGHT.BOLD};
`;

export const TableContainer = styled.div`
  height: 20rem;
  width: 100%;
`;
