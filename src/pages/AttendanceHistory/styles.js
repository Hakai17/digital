import styled from "styled-components";
import { Accordion } from "../../components";
import { THEME } from "../../theme";
import { Drawer, Typography, Box as BoxMUI } from "@mui/material";

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

export const Container = styled(Drawer)`
  width: 15rem;
  flex: 1;
  & .MuiDrawer-paper {
    width: 18rem;
    box-sizing: border-box;
  }
`;

export const Box = styled(BoxMUI)`
  padding: 1rem;
`;

export const TypographyTitle = styled(Typography)`
  color: ${THEME.COLORS.BLACK_PRIMARY};
`;

export const Actions = styled.div`
  justify-content: flex-end;
  margin: 1rem 1rem 1rem 0.85rem;
`;

export const ContentSideBar = styled.div`
  justify-content: flex;
  width: 100%;
`;

export const ContentItem = styled.div`
  box-sizing: border-box;
  flex-direction: row;
  margin: 0.85rem 1rem 0rem 0.85rem;
`;

export const ContentSearch = styled.div`
  box-sizing: border-box;
  flex-direction: row;
  margin: 0.85rem 1rem 0rem 0.85rem;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#ffffffff"};
  &:hover {
    background-color: ${({ backgroundHover }) =>
      backgroundHover ? backgroundHover : "#ffffff"};
  }
`;
