import { Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { THEME } from "../../theme";

export const PageContainer = styled(Grid)`
  margin: 0;
`;

export const Main = styled.main`
  flex: 4.5;
`;

export const Section = styled(Grid)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  padding-left: 2.5rem;
`;

// Sidebar
export const TypographyTitle = styled(Typography)`
  color: ${THEME.COLORS.BLACK_PRIMARY};
  text-align: center;
  font-weight: ${THEME.FONT_WEIGHT.BOLD} !important;
`;
