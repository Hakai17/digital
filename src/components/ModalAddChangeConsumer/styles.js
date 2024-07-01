import { Dialog, DialogActions, DialogContent } from "@mui/material";
import styled from "styled-components";

export const StyledDialog = styled(Dialog)`
  padding: 1;
  margin: 1;
`;

export const StyledDialogContent = styled(DialogContent)`
  min-height: 20rem;
`;

export const StyledDialogActions = styled(DialogActions)`
  display: flex;
  align-items: left;
  justify-content: space-between;
  text-align: start;
`;
