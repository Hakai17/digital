import { Box as BoxMUI, Drawer } from "@mui/material";
import styled from "styled-components";
import { Button } from "../../../../components";

export const Box = styled(BoxMUI)`
  padding: 1rem;
`;

export const Content = styled.div`
  justify-content: flex;
  width: 100%;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SidebarActionsContainer = styled(Drawer)`
  width: 15rem;
  flex: 1;
  & .MuiDrawer-paper {
    width: 18rem;
    box-sizing: border-box;
  }
`;

export const StyledButton = styled(Button)`
  width: 94%;
  text-align: center;
  margin: 1rem 0;
`;
