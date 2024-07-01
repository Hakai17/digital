import { Box, DialogTitle, Grid, List, Typography } from "@mui/material";
import styled from "styled-components";

export const Header = styled(DialogTitle)`
  background-color: #97adec;
`;

export const Content = styled(Grid)`
  min-height: 28rem;
  align-items: space-between;
`;

export const ContainerListObservations = styled(Grid)`
  height: 25rem;
  align-items: center;
  justify-content: center;
`;

export const StyledList = styled(List)`
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
  border-radius: 5px;
  overflow-x: auto;
`;

export const TextContent = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  height: 25rem;
  padding: 1rem;
`;

export const ListItemTextTypography = styled(Typography)`
  font-size: 0.95rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;
