import { Box } from "@mui/material";
import { IconButton } from "../../../../components/_UI/IconButton/IconButton";
import styled from "styled-components";
import { THEME } from "../../../../theme";

export const LabelTabContainer = styled(Box)`
  align-items: baseline;
  display: flex;
  padding: 0;
  justify-content: space-between;
`;

export const CloseTabContainer = styled(Box)`
  padding: 0;
`;

export const CloseTabButton = styled(IconButton)`
  bottom: 0;
  margin-left: 1rem;
  color: ${THEME.COLORS.TEXT};
`;

export const OpenTabButton = styled(IconButton)`
  margin-top: 0.45rem;
  margin-left: 1rem;
`;
