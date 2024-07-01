import { Box as BoxMUI, Drawer, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { THEME } from "../../../../theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const ContentContainer = styled(Drawer)`
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
  text-align: center;
  font-weight: ${THEME.FONT_WEIGHT.BOLD} !important;
`;

export const ContentSideBar = styled.div`
  justify-content: flex;
  width: 100%;
`;

export const Main = styled.main`
  flex: 4.5;
`;

export const FormContainer = styled(Grid)`
  margin: 0;
`;

export const Section = styled(Grid)`
  padding-top: 1rem;
  padding-right: 1.6rem;
  padding-left: 1.5rem;
  width: 100%;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
