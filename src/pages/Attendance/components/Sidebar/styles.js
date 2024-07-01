import { Box as BoxMUI, Drawer } from "@mui/material";
import styled from "styled-components";

export const Container = styled(Drawer)`
  width: 15rem;
  flex: 1;
  & .MuiDrawer-paper {
    width: 15rem;
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
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#ffffffff"};
  &:hover {
    background-color: ${({ backgroundHover }) =>
      backgroundHover ? backgroundHover : "#ffffff"};
  }
`;
