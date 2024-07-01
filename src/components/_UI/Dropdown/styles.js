import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";
import { THEME } from "../../../theme";

export const StyledArrow = styled(DropdownMenuPrimitive.Arrow)`
  fill: ${THEME.COLORS.BACKGROUND_100};
`;

export const StyledContent = styled(DropdownMenuPrimitive.Content)`
  min-width: 220;
  background-color: ${THEME.COLORS.BACKGROUND_100};
  border-radius: 6;
  padding: 5;
`;
