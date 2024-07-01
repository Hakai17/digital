import { Box as BoxMUI, Drawer, Typography } from "@mui/material";
import styled from "styled-components";
import { THEME } from "../../../theme";
import { Button } from "../../_UI/Button/Button";

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

export const Actions = styled.div`
  justify-content: flex-end;
  margin: 1rem 1rem 1rem 0.85rem;
`;

export const Content = styled.div`
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

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledButton = styled(Button)`
  width: 94%;
  text-align: center;
  margin: 1rem 0;
`;

export const TypographyTitle = styled(Typography)`
  color: ${THEME.COLORS.BLACK_PRIMARY};
  text-align: center;
  font-weight: ${THEME.FONT_WEIGHT.BOLD} !important;
`;
